import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import Button from '../../../components/Button';
import { responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES } from '../../../utils';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../../assets/images';
import { colors } from '../../../assets/colors';
import SVGXml from '../../../components/SVGXml';
import svgIcons from '../../../assets/icons';

const data = [
    {id: 1, logoIcon: images.bankLogo1, title: 'Citi Bank', isDeleteIcon: false},
    {id: 2, logoIcon: images.bankLogo2, title: 'PNC Bank', isDeleteIcon: true},
    {id: 3, logoIcon: images.bankLogo1, title: 'Citi Bank', isDeleteIcon: false},
]

const MyBankAccount = () => {
    const nav = useNavigation();
  return (
    <MainContainer>
      <Header2 headerText3='' hideCancel text={'My Bank Account'} subHeading={''} />

    <View style={{padding: responsiveHeight(2.5), paddingTop: 0,}}>
      <FlatList 
      data={data}
      contentContainerStyle={{gap: 20,}}
      renderItem={({item}) => {
        return (
            <TouchableOpacity>
                <View style={{flexDirection: 'row', borderRadius: 10, paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(1.5), borderWidth: 1, borderColor: colors.line_color, alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
                <Image source={item.logoIcon} style={{width: 40, height: 40, borderRadius: 100}} />
                <Text style={{fontSize: responsiveFontSize(2), color: colors.gray}}>{item.title}</Text>
                </View>
               {item.isDeleteIcon &&
                <TouchableOpacity>
                    <SVGXml width={'25'} height={'25'} icon={svgIcons.delete_red} />
                </TouchableOpacity>
                }
                </View>
            </TouchableOpacity>
        )
      }}
      />
    </View>
      <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: responsiveHeight(2)}}>
        <Button style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(90) }} onPress={() => nav.navigate(ROUTES.CONGRATULATION, {addNow: 'add_now'})} buttonText='Add Bank' />}
    </View>
    </MainContainer>
  )
}

export default MyBankAccount;