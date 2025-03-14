import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import { editProfessionalProfileFields, editProfileFields, myLocationFields, responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES } from '../../../utils';
import CustomInputForm from '../../../components/InputField';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from '../../../assets/images';
import svgIcons from '../../../assets/icons';
import SVGXml from '../../../components/SVGXml';
import { colors } from '../../../assets/colors';
import Button from '../../../components/Button';

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

const EditProfile = () => {
    const nav = useNavigation();
    const type = AsyncStorage.getItem('type');

  return (
    <MainContainer>
        <Header2 headerText3='' hideCancel text={'Edit Profile'} subHeading={'Enter Your Details'} />

        <View style={{padding: responsiveHeight(2), paddingTop: 0}}>
        {type === 'user' && <CustomInputForm inputContainer={{width: responsiveWidth(90)}} buttonStyle={{width: responsiveWidth(90)}} inputStyle={{color: 'black'}} inputContainerStyle={{marginTop: responsiveHeight(0)}} onSubmit={(values) => nav.navigate(ROUTES.PROFILE)} initialValues={{fullname: 'Now York',phonenumber: 'Apartment/Suite#', bio: 'Now York',}} validationSchema={{}} buttonText='Save' fields={editProfileFields} />}
        
        <View >
          <View style={styles.imageWrapper}>
          <View>
              <Image source={images.profile} style={styles.imageStyle} /> 
              <TouchableOpacity style={styles.uploadView}>
                  <SVGXml icon={svgIcons.upload} width={'11'} />
              </TouchableOpacity>
              </View>

              <View style={{marginTop: responsiveHeight(2)}}>
              <CustomInputForm hideButton={true} inputContainer={{width: responsiveWidth(90)}} buttonStyle={{width: responsiveWidth(90)}} inputStyle={{color: 'black'}} inputContainerStyle={{marginTop: responsiveHeight(0)}} onSubmit={(values) => nav.navigate(ROUTES.PROFILE)} initialValues={{}} validationSchema={{}} buttonText='Save' fields={editProfessionalProfileFields} />
              </View>
          </View>

              <View style={{padding: responsiveHeight(0.7), paddingTop: 0}}>
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

        <FlatList
        data={times}
        contentContainerStyle={{marginTop: responsiveHeight(2), flex: 1, justifyContent: 'space-between'}}
        horizontal
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', padding: 10, gap: 40, borderRadius: 10, borderWidth: 1, borderColor: colors.line_color}}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <SVGXml width={'17'} height={'17'} icon={svgIcons.time_reverse} />
              <Text>{item.time}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
              <Text>{item.time2}</Text>
              <SVGXml width={'14'} height={'14'} icon={svgIcons.fill_arrow_down} />
              </View>
            </TouchableOpacity>
          )
        }}
        />
        <Button  style={{marginTop: responsiveHeight(2), width: responsiveWidth(90)}} buttonText={'Update'} onPress={() => nav.navigate(ROUTES.PROFILE)} />
        </View>
        </View>
        </View>
    </MainContainer>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  imageWrapper:{
    alignItems: 'center',
  },
  imageStyle:{
    height: responsiveHeight(15),
    width: responsiveWidth(30),
    borderRadius: 10,
  },
  uploadView:{
    borderWidth: 1,
    height: responsiveHeight(4),
    width: responsiveHeight(4),
    position: 'absolute',
    backgroundColor: colors.secondary,
    bottom: responsiveHeight(-1),
    right: 0,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.dark_purple
  }
})