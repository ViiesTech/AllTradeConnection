/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../../components/Header';
import MainContainer from '../../../components/MainContainer';
import {responsiveFontSize, responsiveHeight, ROUTES} from '../../../utils';
import {colors} from '../../../assets/colors';
import TaskCard from '../../../components/TaskCard';
import SVGXml from '../../../components/SVGXml';
import svgIcons from '../../../assets/icons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getUserAllProjects} from '../../../GlobalFunctions/userMain';
import Toast from 'react-native-toast-message';

const Home = () => {
  const nav = useNavigation();
  const userData = useSelector((state: RootState) => state.user.userData);
  const userDetail = useSelector((state: RootState) => state.user);
  const [allProjects, setAllProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const renderItem = ({item}) => {
    if (allProjects.length !== 0) {
      return (
        <TaskCard
          onPress={() =>
            nav.navigate('SecondaryStack', {
              screen: ROUTES.TASK_DETAIL,
              params: {
                projectId: item?._id,
              },
            })
          }
          price={item.price}
          image={item.image}
          title={item.fullName}
          desc={item.additionalNote}
          item={item}
        />
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            height: responsiveHeight(50),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Projects Not Found</Text>
        </View>
      );
    }
  };

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <Header showMyLocation={userData?.type !== 'User'} />
      <View style={styles.textView}>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.nameText}>
          {userData?.firstName} {userData?.lastName}
        </Text>
      </View>
    </View>
  );

  const getAllProject = async token => {
    setIsLoading(true);
    const res = await getUserAllProjects({token: token});
    if (res?.success) {
      setAllProjects(res.data);
      setIsLoading(false);
    } else {
      setAllProjects([]);
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch projects',
        text2: res?.message,
      });
      setIsLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getAllProject(userDetail?.token);
    setRefreshing(false);
  };

  useEffect(() => {
    getAllProject(userDetail?.token);
  }, [userDetail]);

  return (
    <View style={{flex: 1}}>
      <MainContainer style={{flex: 1}}>
        {isLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} color={colors.primary} />
          </View>
        ) : (
          <FlatList
            data={allProjects}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListHeaderComponent={ListHeader}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
        {!isLoading && (
          <TouchableOpacity
            onPress={() =>
              nav.navigate('SecondaryStack', {screen: ROUTES.POST_JOB})
            }
            style={styles.plusView}>
            <SVGXml icon={svgIcons.plus} />
          </TouchableOpacity>
        )}
      </MainContainer>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: responsiveHeight(1),
  },
  textView: {
    paddingHorizontal: responsiveHeight(2),
  },
  welcomeText: {
    fontSize: responsiveFontSize(2),
    color: colors.textColor2,
  },
  nameText: {
    fontSize: responsiveFontSize(3),
    color: colors.textColor2,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: responsiveHeight(10),
    paddingTop: responsiveHeight(2),
  },
  plusView: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: responsiveHeight(14),
    right: 20,
    height: responsiveHeight(7.5),
    width: responsiveHeight(8),
    borderRadius: 8,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
});
