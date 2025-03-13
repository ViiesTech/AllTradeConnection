import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import svgIcons from '../../../assets/icons';
import { images } from '../../../assets/images';
import Header2 from '../../../components/Header2';
import { responsiveHeight, responsiveWidth, ROUTES } from '../../../utils';
import SVGXml from '../../../components/SVGXml';
import { colors } from '../../../assets/colors';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';

const cardData = [
    {id: 1, icon: svgIcons.plus, isImage: false},
    {id: 2, icon: images.cardHolder, isImage: true},
]

const PaymentCard = () => {
    const nav = useNavigation();
  return (
    <MainContainer>
      <Header2 headerText3='' hideCancel text={'Payment Card'} subHeading={''} />

    <View style={{padding: responsiveHeight(2.5), paddingTop: 0,}}>
    <FlatList 
            data={cardData}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
                return (
                    <View>
                        {
                            item.isImage ? (
                                    <Image source={item.icon} style={{width: responsiveWidth(70), height: responsiveHeight(20)}} resizeMode='contain' />
                            ) : (
                                <TouchableOpacity style={{backgroundColor: colors.primary, padding: responsiveHeight(8), paddingHorizontal: responsiveWidth(5), borderRadius: 10}}>
                                    <SVGXml width={'30'} height={'30'} icon={item.icon} />
                                </TouchableOpacity>
                            )
                        }
                    </View>
                )
            }}
            />
    </View>

    <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: responsiveHeight(2)}}>
        <Button style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(90) }} onPress={() => nav.navigate(ROUTES.CONGRATULATION, {deleteCard: 'delete_card'})} buttonText='Delete Card' />}
    </View>
    </MainContainer>
  )
}

export default PaymentCard;