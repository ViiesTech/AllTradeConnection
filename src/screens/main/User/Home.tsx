import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import MainContainer from '../../../components/MainContainer';
import Header from '../../../components/Header';
import { categoryData, multipleTasks, responsiveFontSize, responsiveHeight, ROUTES } from '../../../utils';
import { colors } from '../../../assets/colors';
import TaskCard from '../../../components/TaskCard';
import SVGXml from '../../../components/SVGXml';
import svgIcons from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import JobsCategory from '../../../components/JobsCategory';


const Home = () => {
  const [chooseCategory,setChooseCategory] = useState<number>(0);

  const screenType = 'MyJobs';

  const renderTasks = () => {
    const navigation = useNavigation();
  
    const renderItem = ({ item }) => {
      return (
        <TaskCard onPress={() => navigation.navigate('SecondaryStack',{screen:  ROUTES.TASK_DETAIL})} price={item.price} image={item.image} title={item.title} desc={item.desc} />
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

  const renderCategory = () => {
    const renderItem = ({item,index}) => {
      return (
        <JobsCategory textColor={index == chooseCategory ? colors.secondary : colors.primary} backgroundColor={index == chooseCategory ? colors.primary : 'rgb(211, 229, 242)'} text={item.text} onPress={() => setChooseCategory(index)} />
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
  

  return (
    <View>
      <MainContainer style={{ paddingBottom: responsiveHeight(6) }}>
        <Header hideNotification={screenType === 'MyJobs' ? true : false} />
        <View style={styles.subContainer}>
         {screenType != 'MyJobs' && 
          <View style={styles.textView}>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.nameText}>John Smith</Text>
          </View>
              }
            {screenType === 'MyJobs' && renderCategory()}
          {renderTasks()}
        </View>
      </MainContainer>
      {screenType != 'MyJobs' &&
      <TouchableOpacity style={styles.plusView}>
        <SVGXml icon={svgIcons.plus} />
      </TouchableOpacity>
      }
    </View>
  )
};

export default Home;

const styles = StyleSheet.create({
  subContainer: {
    padding: responsiveHeight(2),
    paddingTop: 0,
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
  }
})