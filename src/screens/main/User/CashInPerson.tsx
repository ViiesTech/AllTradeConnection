import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import { responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES } from '../../../utils';
import { colors } from '../../../assets/colors';
import Button from '../../../components/Button';
import { images } from '../../../assets/images';
import { useNavigation } from '@react-navigation/native';

const CashInPerson = () => {
        const nav = useNavigation()
    
    const data = [
        {id: 1, profImg: images.profile, title: 'Dianna Russel', textStyle: {fontWeight: 'bold', fontSize: responsiveFontSize(3), color: colors.dark_purple} },
        {id: 2, title: '123154897410', textStyle: {fontSize: responsiveFontSize(2), marginTop: responsiveHeight(1), color: colors.gray}},
        {id: 3, title: 'Cash in-person', textStyle: {fontWeight: 'bold', marginTop: responsiveHeight(4), fontSize: responsiveFontSize(3), color: colors.dark_purple}},
        {id: 4, title: 'Pay this amount to the professional', textStyle: {width: responsiveWidth(50), textAlign: 'center', fontSize: responsiveFontSize(2), marginTop: responsiveHeight(1), color: colors.gray}},
        {id: 5, title: '$230.000', textStyle: {fontWeight: 'bold', fontSize: responsiveFontSize(4), color: colors.black}},
    ]
  return (
    <MainContainer>
    <Header2 headerText3='' hideCancel text={''} subHeading={''} />

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <FlatList
                data={data}
                contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                renderItem={({item}) => {
                    return (
                        <View style={item.id === 5 && {width: responsiveWidth(90), marginTop: responsiveHeight(5), padding: responsiveHeight(2), borderRadius: 10, borderWidth: 1, borderColor: colors.line_color, justifyContent: 'center', alignItems: 'center'}}>
                           {item.profImg && <Image source={item.profImg} style={{width: 75, height: 75, borderRadius: 100, marginBottom: 10, alignSelf: 'center'}} />}
                            <Text style={item.textStyle}>{item.title}</Text>
                        </View>
                    )
                }}
            />

 <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: responsiveHeight(2)}}>
    <Button style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(90) }} onPress={() => nav.navigate(ROUTES.MY_JOBS)} buttonText='Done' />}
    </View>
        </View>
    </MainContainer>
  );
};

export default CashInPerson;