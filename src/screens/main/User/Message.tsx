import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header from '../../../components/Header';
import CustomInputForm from '../../../components/InputField';
import {
  chatThreads,
  responsiveHeight,
  responsiveWidth,
  searchField,
} from '../../../utils';
import * as Yup from 'yup';
import Threads from '../../../components/Threads';
import {colors} from '../../../assets/colors';
// import firestore from '@react-native-firebase/firestore';

const searchValidationSchema = Yup.object().shape({
  search: Yup.string()
    .trim()
    .min(1, 'Please enter at least 1 character to search.')
    .max(200, 'cannot be longer than 200 characters.'),
});
const Message = () => {
  const onSaveLocation = async (values: string) => {};

  // useEffect(() => {
  //   const unsubscribe = firestore()
  //     .collection('chats')
  //     .where('participants', 'array-contains', '889498323923424')
  //     .orderBy('updatedAt', 'desc')
  //     .onSnapshot(snapshot => {
  //       if (snapshot.empty) {
  //         console.log('No chats found.');
  //         return;
  //       }
  //       const chats = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  //       console.log('Chats:', chats);
  //     });

  //   return () => unsubscribe();
  // }, []);

  const renderThreads = () => {
    const renderItem = ({item}) => {
      return (
        <>
          <Threads
            icon={item.icon}
            image={item.image}
            name={item.name}
            message={item.message}
          />
          <View style={styles.horizontalLine} />
        </>
      );
    };

    return (
      <FlatList
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: responsiveHeight(10)}}
        data={chatThreads}
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
          onSubmit={values => onSaveLocation(values)}
          fields={searchField}
          validationSchema={searchValidationSchema}
          initialValues={{search: 'Search'}}
        />
        {renderThreads()}
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
