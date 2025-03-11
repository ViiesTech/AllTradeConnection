import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import Button from '../../../components/Button';
import { responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES } from '../../../utils';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../../assets/images';
import { colors } from '../../../assets/colors';
import svgIcons from '../../../assets/icons';
import SVGXml from '../../../components/SVGXml';

const PaymentMethods = () => {
    const nav = useNavigation()

    const data = [
        {id: 1, img: svgIcons.cash_delivery, title: 'Cash On Delivery', isChecked: true},
        {id: 2, img: svgIcons.wallet, title: 'Wallet', isChecked: false},
    ]

  return (
    <MainContainer>
    <Header2 headerText3='' hideCancel text={'Payment Methods'} subHeading={''} />
      
      <View style={{padding: responsiveHeight(3), paddingTop: 0}}>
        <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={{height: responsiveHeight(3)}} />}
        renderItem={({item}) => {
            return (
                <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, borderColor: colors.line_color, padding: responsiveWidth(4)}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
                        <View style={{borderWidth: 1, borderColor: colors.line_color, borderRadius: 10, padding: 10}}>
                            <SVGXml width={'25'} height={'25'} icon={item.img} />
                        </View>
                        <Text style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>{item.title}</Text>
                        </View>
                        <SVGXml width={'25'} height={'25'} icon={item.isChecked ? svgIcons.rounded_border_with_bg : svgIcons.rounded_border} />
                    </View>
                </TouchableOpacity>
            )
        }}
        />
      </View>

    <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: responsiveHeight(2)}}>
    <Button style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(90) }} onPress={() => nav.navigate(ROUTES.PAYMENT_METHOD_PAY)} buttonText='Continue' />}
    </View>
    </MainContainer>
  );
};

export default PaymentMethods;