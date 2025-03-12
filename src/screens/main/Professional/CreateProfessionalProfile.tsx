/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import { images } from '../../../assets/images';
import { responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES } from '../../../utils';
import SVGXml from '../../../components/SVGXml';
import { colors } from '../../../assets/colors';
import svgIcons from '../../../assets/icons';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';

const certificates = [
    {id: 1, certicateImg: images.certi1},
    {id: 2, certicateImg: images.certi2},
    {id: 3, certicateImg: images.certi3},
    {id: 4, certicateImg: images.certi4},
];

const days = [
    {id: 1, day: 'Mon', num: 1, isChecked: false},
    {id: 2, day: 'Tue', num: 2, isChecked: false},
    {id: 3, day: 'Wed', num: 3, isChecked: true},
    {id: 4, day: 'Thu', num: 4, isChecked: false},
    {id: 5, day: 'Fri', num: 5, isChecked: false},
    {id: 6, day: 'Sat', num: 6, isChecked: false},
    {id: 7, day: 'Sun', num: 7, isChecked: false},
]

const times = [
    {id: 1, time: '09:00', time2: 'AM'},
    {id: 2, time: '09:00', time2: 'PM'},
]

const CreateProfessionalProfile = () => {
    const nav = useNavigation();

  return (
    <MainContainer>
      <Header2 headerText3='' hideCancel text={'Create Profile'} subHeading={'Enter your details to register yourself'} />

        <View style={{padding: responsiveHeight(2.5), paddingTop: 0}}>
        <TouchableOpacity style={{
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.gray,
            paddingVertical: responsiveHeight(4.5),
            alignItems: 'center',
            borderRadius: 10,
            justifyContent: 'center',
          }}>
              <SVGXml width={'35'} height={'35'} icon={svgIcons.upload2} />
              <Text style={{
                  color: colors.gray,
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2),
                  marginTop: responsiveHeight(0.2)
                }}>Upload Certificates</Text>
        </TouchableOpacity>

        <FlatList
          data={certificates}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{gap: 20, marginTop: responsiveHeight(2)}}
          renderItem={({item}) => {
            return (
              <View>
                <Image source={item.certicateImg} style={{width: responsiveWidth(20), height: responsiveHeight(8)}} />
              </View>
            )
          }}
          />

        <Text style={{
            color: colors.textColor2,
            marginTop: responsiveHeight(3),
            fontWeight: 'bold',
            fontSize: responsiveFontSize(2.5)
        }}>Operating Days & Hour</Text>

        <Text style={{
            color: colors.black,
            marginTop: responsiveHeight(2),
            fontSize: responsiveFontSize(2.3)
        }}>Including These Days</Text>

        <FlatList
        data={days}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 10, paddingVertical: responsiveWidth(2.5),paddingHorizontal: responsiveWidth(2), borderRadius: 10, borderWidth: 1, borderColor: colors.line_color, marginTop: responsiveHeight(2)}}
        renderItem={({item}) => {
            return (
                <TouchableOpacity style={{alignItems: 'center', borderRadius: 10, paddingHorizontal: responsiveWidth(2.5),paddingVertical: responsiveWidth(2.5), backgroundColor: item.isChecked ? colors.primary : colors.secondary}}>
                    <Text style={{fontSize: responsiveFontSize(2), color: item.isChecked ? colors.secondary : colors.gray}}>{item.day}</Text>
                    <Text style={{fontSize: responsiveFontSize(2), color: item.isChecked ? colors.secondary : colors.black}}>{item.num}</Text>
                </TouchableOpacity>
            )
        }}
        />

        <Text style={{
            color: colors.black,
            marginTop: responsiveHeight(2),
            fontSize: responsiveFontSize(2.3)
        }}>Time Range</Text>
          

        <Button  style={{marginTop: responsiveHeight(2), width: responsiveWidth(90)}} buttonText={'Next'} onPress={() => nav.navigate(ROUTES.MY_LOCATION)} />
        </View>
    </MainContainer>
  )
}

export default CreateProfessionalProfile