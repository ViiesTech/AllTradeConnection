import { FlatList, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import MainContainer from '../../../components/MainContainer';
import JobsCategory from '../../../components/JobsCategory';
import { categoryData, multipleTasks, responsiveHeight, ROUTES } from '../../../utils';
import { colors } from '../../../assets/colors';
import Header from '../../../components/Header';
import { useNavigation } from '@react-navigation/native';
import TaskCard from '../../../components/TaskCard';

const MyJobs = () => {
  const [chooseCategory,setChooseCategory] = useState<string>('In Discussion');


  const renderCategory = () => {
    const renderItem = ({item,index}) => {
      return (
        <JobsCategory textColor={item.text == chooseCategory ? colors.secondary : colors.primary} backgroundColor={item.text == chooseCategory ? colors.primary : 'rgb(211, 229, 242)'} text={item.text} onPress={() => setChooseCategory(item.text)} />
      )
    }
    return (
        <FlatList 
          data={categoryData}
          horizontal
          style={{marginHorizontal: responsiveHeight(-3)}}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexDirection: 'row',gap: 10,paddingHorizontal: responsiveHeight(3)}}
          renderItem={renderItem}
        />
    )
  }

  const renderTasks = () => {
    const navigation = useNavigation();
  
    const renderItem = ({ item }) => {
      return (
        <TaskCard onPress={() => navigation.navigate(ROUTES.TASK_DETAIL, {type: chooseCategory})} price={item.price} image={item.image} title={item.title} desc={item.desc} />
      )
    }
  
    return (
      <FlatList
        data={multipleTasks}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: responsiveHeight(2) }}
        renderItem={renderItem}
      />
    )
  };
  

  return (
    <MainContainer>
      <Header  hideNotification={true} />
              <View style={styles.subContainer}>
                  {renderCategory()}
                  {renderTasks()}
              </View>
    </MainContainer>
  )
}

export default MyJobs;

const styles = StyleSheet.create({
  subContainer: {
    padding: responsiveHeight(2),
    paddingTop: 0,
  },
});