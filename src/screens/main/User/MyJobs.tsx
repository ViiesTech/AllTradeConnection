/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainContainer from '../../../components/MainContainer';
import JobsCategory from '../../../components/JobsCategory';
import {
  categoryData,
  multipleTasks,
  responsiveHeight,
  ROUTES,
} from '../../../utils';
import {colors} from '../../../assets/colors';
import Header from '../../../components/Header';
import {useNavigation} from '@react-navigation/native';
import TaskCard from '../../../components/TaskCard';
import {useSelector} from 'react-redux';
import {getUserAllProjects} from '../../../GlobalFunctions/userMain';
import Toast from 'react-native-toast-message';

const MyJobs = () => {
  const [chooseCategory, setChooseCategory] = useState<string>('Open');
  const userDetail = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [allProjects, setAllProjects] = useState([]);

  const getAllProject = async token => {
    setIsLoading(true);
    const res = await getUserAllProjects({token: token});
    if (res?.success) {
      const data = res?.data?.filter(item => item.status === chooseCategory);
      const inDiscussionData = res?.data?.filter(
        item => item.status === 'Open' && item?.inDiscussionPro?.length >= 1,
      );
      setAllProjects(
        chooseCategory === 'In Discussion' ? inDiscussionData : data,
      );
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

  const onRefresh = async () => {
    setRefreshing(true);
    await getAllProject(userDetail?.token);
    setRefreshing(false);
  };

  useEffect(() => {
    getAllProject(userDetail?.token);
  }, [userDetail, chooseCategory]);

  const renderCategory = () => {
    const renderItem = ({item, index}) => {
      return (
        <JobsCategory
          textColor={
            item.text == chooseCategory ? colors.secondary : colors.primary
          }
          backgroundColor={
            item.text == chooseCategory ? colors.primary : 'rgb(211, 229, 242)'
          }
          text={item.text}
          onPress={() => setChooseCategory(item.text)}
        />
      );
    };
    return (
      <FlatList
        data={categoryData}
        horizontal
        style={{marginHorizontal: responsiveHeight(-3)}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          gap: 10,
          paddingHorizontal: responsiveHeight(3),
        }}
        renderItem={renderItem}
      />
    );
  };

  const renderTasks = () => {
    const navigation = useNavigation();
    // const data = allProjects.filter((item) => item.status === chooseCategory)
    const renderItem = ({item}) => {
      return (
        <TaskCard
          onPress={() =>
            navigation.navigate('SecondaryStack', {
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
    };

    return (
      <FlatList
        data={allProjects}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: responsiveHeight(2), flexGrow: 1}}
        style={{flex: 1}}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    );
  };

  return (
    <MainContainer>
      <Header hideNotification={true} />
      <View style={styles.subContainer}>
        {renderCategory()}
        {!!allProjects.length ? (
          isLoading ? (
            <View
              style={{
                flex: 1,
                height: responsiveHeight(90),
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'large'} color={colors.primary} />
            </View>
          ) : (
            renderTasks()
          )
        ) : (
          <View
            style={{
              flex: 1,
              height: responsiveHeight(80),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Projects Not Found</Text>
          </View>
        )}
      </View>
    </MainContainer>
  );
};

export default MyJobs;

const styles = StyleSheet.create({
  subContainer: {
    padding: responsiveHeight(2),
    paddingTop: 0,
  },
});
