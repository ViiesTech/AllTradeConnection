import React from 'react'
import { View, Text, FlatList, ImageBackground, StyleSheet, Dimensions } from 'react-native'
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import { images } from '../../../assets/images';
import { responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES } from '../../../utils';
import Carousel from 'react-native-reanimated-carousel';
import { colors } from '../../../assets/colors';
import SVGXml from '../../../components/SVGXml';
import svgIcons from '../../../assets/icons';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';

const data = [
    {id: 1, title: 'Gold', numOfUsd: '$1600', month: '/Month', 
    desc: 'Free for ever when you host with Debbi. free for freelancers with Client Billing', 
    packages: [{id: 1, isCheck: true, title: '2 Projects'},
    {id: 2, isCheck: true, title: 'Client Billing'}, {id: 3, isCheck: true, title: 'Free Staging'},
    {id: 4, isCheck: true, title: 'Code Export'}, {id: 5, isCheck: false, title: 'White labeling'},
    {id: 5, isCheck: false, title: 'Site password protection'}]},
    {id: 2, title: 'Gold', numOfUsd: '$1600', month: '/Month', 
        desc: 'Free for ever when you host with Debbi. free for freelancers with Client Billing', 
        packages: [{id: 1, isCheck: true, title: '2 Projects'},
        {id: 2, isCheck: true, title: 'Client Billing'}, {id: 3, isCheck: true, title: 'Free Staging'},
        {id: 4, isCheck: true, title: 'Code Export'}, {id: 5, isCheck: false, title: 'White labeling'},
        {id: 5, isCheck: false, title: 'Site password protection'}]},
        {id: 3, title: 'Gold', numOfUsd: '$1600', month: '/Month', 
            desc: 'Free for ever when you host with Debbi. free for freelancers with Client Billing', 
            packages: [{id: 1, isCheck: true, title: '2 Projects'},
            {id: 2, isCheck: true, title: 'Client Billing'}, {id: 3, isCheck: true, title: 'Free Staging'},
            {id: 4, isCheck: true, title: 'Code Export'}, {id: 5, isCheck: false, title: 'White labeling'},
            {id: 5, isCheck: false, title: 'Site password protection'}]},
]

const width = Dimensions.get('screen').width;

const SubscriptionPackages = () => {
    const nav = useNavigation();
  return (
    <MainContainer>
      <Header2 headerText3='' hideCancel text={'Subscription Packages'} subHeading={''} />

        <View style={{marginTop: responsiveHeight(-5)}}>
            <Carousel
                loop={false}
                width={width}
                height={responsiveHeight(70)}
                mode='parallax'
                data={data}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item, index }) => {
                return (
                                <ImageBackground imageStyle={{borderRadius: 25}} source={images.cardBg} style={{padding: responsiveHeight(2), width: responsiveWidth(100),}}>
                                <View style={{marginHorizontal: responsiveHeight(2), marginTop: responsiveHeight(2)}}>
                                <Text style={{fontSize: responsiveFontSize(3), color: colors.secondary}}>{item.title}</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontSize: responsiveFontSize(7),  fontWeight: 'bold', color: colors.secondary}}>{item.numOfUsd}</Text>
                                <Text style={{fontSize: responsiveFontSize(2), marginTop: responsiveHeight(3), fontWeight: 'bold', color: colors.secondary}}>{item.month}</Text>
                                </View>
                                </View>

                            <View style={{marginHorizontal: responsiveHeight(1.5)}}>
                                <Text style={{color: colors.secondary, fontSize: responsiveFontSize(2.5), width: responsiveWidth(80), marginTop: responsiveHeight(1)}}>{item.desc}</Text>
                            </View>

                            <View style={{marginHorizontal: responsiveWidth(8), gap: 10, marginTop: responsiveHeight(3)}}>
                                {item.packages?.map((list) => {
                                    return (
                                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
                                           {list.isCheck && <SVGXml width={'17'} height={'17'} icon={svgIcons.check} />}
                                           {!list.isCheck && <View style={{width: 17, height: 17}} />}
                                            <Text style={{fontSize: responsiveFontSize(2.4), color: colors.secondary, fontWeight: 'bold'}}>{list.title}</Text>
                                        </View>
                                    )
                                })}

                    <Button style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(80), marginBottom: responsiveHeight(2)}} isWhiteBtnBG textStyle={{color: colors.dark_purple}} onPress={() => nav.navigate(ROUTES.GET_GOLD)} buttonText='Upgrade Plan' />}
                            </View>
                                </ImageBackground>
                )
        }}
      />
        </View>

        <Button style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(80)}} onPress={() => nav.navigate(ROUTES.PROFESSIONALS_PAYMENTMETHOD)} buttonText='Start With Free Trial' />}
    </MainContainer>
  )
}

export default SubscriptionPackages;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#232320',
      flex: 1,
    },
    imageStyle: {
      height: responsiveHeight(65),
      width: responsiveWidth(95),
      resizeMode: 'cover',
      borderRadius: 20,
    },
    heading: {
      color: colors.secondary,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: responsiveHeight(2),
      fontSize: responsiveFontSize(2.5)
    },
    textStyle: {
      color: colors.gray,
      fontSize: responsiveFontSize(1.8),
      textAlign: 'center',
      marginBottom: responsiveHeight(3),
    },
    numberStyle: {
      color: colors.secondary,
      fontSize: responsiveFontSize(1.8),
      marginTop: responsiveHeight(3)
    },
    buttonStyle: {
      borderRadius: 100,
    },
    wrapper: {
      padding: responsiveHeight(2)
    },
    iconWrapper: {
      position: 'absolute',
      top: responsiveHeight(7),
      left: responsiveWidth(6),
      zIndex: 1,
    },
    optionsWrapper: {
      flexDirection: 'row',
    },
    text: {
      fontWeight: 'bold',
      fontSize: responsiveFontSize(1.8),
      marginTop: responsiveHeight(3),
      marginLeft: responsiveHeight(6)
    },
    textWrapper: {
      alignItems: 'center',
    },
    dot: {
      width: responsiveWidth(1),
      height: responsiveWidth(1),
      marginTop: responsiveHeight(1),
      marginLeft: responsiveHeight(6),
      borderRadius: responsiveWidth(1),
      backgroundColor: colors.secondary,
    },
  })