/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header from '../../../components/Header';
import CustomInputForm from '../../../components/InputField';
import {
  chatThreads,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  searchField,
} from '../../../utils';
import * as Yup from 'yup';
import Threads from '../../../components/Threads';
import {colors} from '../../../assets/colors';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const searchValidationSchema = Yup.object().shape({
  search: Yup.string()
    .trim()
    .min(1, 'Please enter at least 1 character to search.')
    .max(200, 'cannot be longer than 200 characters.'),
});
const Message = () => {
  const userData = useSelector((state: RootState) => state.user.userData);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const getChatLists = () => {
    setLoading(true);
    const unsubscribe = firestore()
      .collection('userChats')
      .doc(userData?._id)
      .onSnapshot(doc => {
        if (!doc.exists) {
          setChats([]);
          setLoading(false);
          return;
        }
        const chatsMap = doc.data();

        if (typeof chatsMap !== 'object' || chatsMap === null) {
          setChats([]);
          setLoading(false);
          return;
        }

        const chatsArray = Object.entries(chatsMap).map(([id, chat]) => ({
          id,
          ...chat,
        }));
        // Sort by timestamp descending
        chatsArray.sort(
          (a, b) =>
            b.timestamp?.toDate()?.getTime() - a.timestamp?.toDate()?.getTime(),
        );

        const result = chatsArray.filter(chat =>
          chat.userName?.toLowerCase().includes(searchValue.toLowerCase()),
        );

        setChats(result);
        setLoading(false);
      });

    return unsubscribe;
  };

  useEffect(() => {
    if (!userData?._id) return;
    const unsubscribe = getChatLists();
    return () => unsubscribe();
  }, [userData?._id, searchValue]);

  const renderThreads = () => {
    const renderItem = ({item}) => {
      return (
        <>
          <Threads
            icon={item.icon}
            image={item.userImage}
            name={item.userName}
            message={item.lastMessage}
            userId={item.userId}
          />
          <View style={styles.horizontalLine} />
        </>
      );
    };

    return (
      <FlatList
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: responsiveHeight(10)}}
        data={chats}
      />
    );
  };

  return (
    <MainContainer>
      <Header hideNotification />
      <View style={styles.subContainer}>
        <CustomInputForm
          hideButton
          inputContainer={{width: responsiveWidth(92)}}
          inputContainerStyle={{padding: 0}}
          childrenStyle={{marginBottom: responsiveHeight(3)}}
          fields={searchField}
          validationSchema={searchValidationSchema}
          initialValues={{search: ''}}
          onChangeSearchText={text => setSearchValue(text)}
        />
        {loading ? (
          <ActivityIndicator size={'large'} color={colors.primary} />
        ) : !!chats.length ? (
          renderThreads()
        ) : (
          <View
            style={{
              flex: 1,
              height: responsiveHeight(40),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.black,
                fontWeight: '500',
                fontSize: responsiveFontSize(2.5),
              }}>
              No chat history found.
            </Text>
          </View>
        )}
      </View>
    </MainContainer>
  );
};

export default Message;

const styles = StyleSheet.create({
  subContainer: {
    padding: responsiveHeight(2),
  },
  horizontalLine: {
    borderBottomColor: colors.black,
    marginBottom: responsiveHeight(2),
    borderBottomWidth: 0.3,
  },
});
