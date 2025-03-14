import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import MainContainer from '../../../components/MainContainer';
import Header from '../../../components/Header';
import { multipleTasks, responsiveFontSize, responsiveHeight, ROUTES } from '../../../utils';
import { colors } from '../../../assets/colors';
import TaskCard from '../../../components/TaskCard';
import SVGXml from '../../../components/SVGXml';
import svgIcons from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {
  const nav = useNavigation();
   const type = AsyncStorage.getItem('type');
 
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

  useEffect(() => {
    getType()
  }, [])

  const getType = async () => {
    try {
      const type = await AsyncStorage.getItem('type');
      console.log('Type:', type);
      return type;
    } catch (error) {
      console.error('Error retrieving type:', error);
    }
  };

  return (
    <View>
      <MainContainer style={{ paddingBottom: responsiveHeight(6) }}>
        <Header showMyLocation={type !== 'user'} />
        <View style={styles.subContainer}>
          <View style={styles.textView}>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.nameText}>John Smith</Text>
          </View>
          {renderTasks()}
        </View>
      </MainContainer>
      <TouchableOpacity onPress={() => nav.navigate('SecondaryStack',{screen: ROUTES.POST_JOB})} style={styles.plusView}>
        <SVGXml icon={svgIcons.plus} />
      </TouchableOpacity>
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