/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../../components/Header';
import MainContainer from '../../../components/MainContainer';
import { multipleTasks, responsiveFontSize, responsiveHeight, ROUTES } from '../../../utils';
import { colors } from '../../../assets/colors';
import TaskCard from '../../../components/TaskCard';
import SVGXml from '../../../components/SVGXml';
import svgIcons from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const nav = useNavigation();
  const [type, setType] = useState('');

  useEffect(() => {
    const getType = async () => {
      try {
        const res = await AsyncStorage.getItem('type');
        if (res) setType(res);
      } catch (err) {
        console.log(err);
      }
    };
    getType();
  }, []);

  const renderItem = ({ item }) => (
    <TaskCard
      onPress={() => nav.navigate('SecondaryStack', { screen: ROUTES.TASK_DETAIL })}
      price={item.price}
      image={item.image}
      title={item.title}
      desc={item.desc}
    />
  );

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <Header showMyLocation={type === 'Pro'} />
      <View style={styles.textView}>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.nameText}>John Smith</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <MainContainer style={{ flex: 1 }}>
        <FlatList
          data={multipleTasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListHeaderComponent={ListHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity
          onPress={() => nav.navigate('SecondaryStack', { screen: ROUTES.POST_JOB })}
          style={styles.plusView}
        >
          <SVGXml icon={svgIcons.plus} />
        </TouchableOpacity>
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
