import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../../utils';
import { colors } from '../../../assets/colors';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';

const skillData = [
    {id: 1, title: 'Plumber', isChecked: true},
    {id: 2, title: 'Electrician', isChecked: false},
    {id: 3, title: 'Wall Repairs', isChecked: false},
    {id: 4, title: 'Appliance', isChecked: false},
    {id: 5, title: 'Cleaning', isChecked: true},
    {id: 6, title: 'Locksmith', isChecked: false},
    {id: 7, title: 'Appliance', isChecked: false},
    {id: 8, title: 'Cleaning', isChecked: false},
    {id: 9, title: 'Locksmith', isChecked: false},
    {id: 10, title: 'Plumber', isChecked: true},
    {id: 11, title: 'Electrician', isChecked: false},
    {id: 12, title: 'Wall Repairs', isChecked: false},
]

const languagesData = [
    {id: 1, title: 'Spanish', isChecked: true},
    {id: 2, title: 'English', isChecked: false},
    {id: 3, title: 'Arabic', isChecked: false},
    {id: 4, title: 'German', isChecked: false},
    {id: 6, title: 'Javanese', isChecked: false},
    {id: 7, title: 'Korean', isChecked: false},
    {id: 8, title: 'Italian', isChecked: false},
    {id: 9, title: 'Turkish', isChecked: false},
    {id: 10, title: 'French', isChecked: false},
]

const Skills = ({route}) => {
    const nav = useNavigation();
    const screen = route?.params?.screen;

  return (
    <MainContainer>
      <Header2 headerText3='' hideCancel text={screen === 'skills' ? 'Skill' : 'Language'} subHeading={''} />

      <View style={{marginHorizontal: responsiveWidth(5)}}>
        <FlatList 
        data={screen === 'skills' ? skillData : languagesData}
        contentContainerStyle={{flexDirection: 'row', gap: 10,  flexWrap: 'wrap'}}
        renderItem={({item}) => {
            return (
                <TouchableOpacity style={{padding: screen === 'skills' ? responsiveWidth(4.1) : responsiveWidth(3.8), paddingHorizontal: screen === 'skills' ? responsiveWidth(4.1) : responsiveWidth(6.1), borderRadius: 12, backgroundColor: item.isChecked ? colors.primary : colors.secondary, borderWidth: item.isChecked ? 0 : 1, borderColor: colors.gray }}>
                    <Text style={{color: item.isChecked ? colors.secondary : colors.gray, fontSize: responsiveFontSize(2)}}>{item.title}</Text>
                </TouchableOpacity>
            )
        }}
        />
      </View>

      <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: responsiveHeight(2)}}>
        <Button style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(90) }} onPress={() => nav.navigate(ROUTES.MY_JOBS)} buttonText='Apply' />}
    </View>
    </MainContainer>
  )
}

export default Skills