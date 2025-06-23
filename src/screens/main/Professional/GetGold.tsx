import React from 'react';
import { View, Text, ImageBackground, FlatList } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import { responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES } from '../../../utils';
import { images } from '../../../assets/images';
import { colors } from '../../../assets/colors';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';

const GetGold = () => {
  const nav = useNavigation();

  const data = [
    {
      id: '1',
      title: 'Quarterly',
      numOfUsd: '$50.00',
      bgColor: '#0272C2',
      titleStyle: { color: colors.secondary, fontSize: responsiveFontSize(2) },
      numOfUsdStyle: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.secondary,
      },
    },
    {
      id: '2',
      title: 'Annually',
      numOfUsd: '$90.00',
      bgColor: '#b3b3b3',
      titleStyle: { color: colors.black, fontSize: responsiveFontSize(2) },
      numOfUsdStyle: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.black,
      },
    },
  ];

  return (
    <MainContainer>
      <Header2 headerText3='' hideCancel text='Get Gold' subHeading='' />

      <View style={{ alignItems: 'center' }}>
        <ImageBackground
          imageStyle={{ borderRadius: 20 }}
          source={images.cardBg}
          style={{ padding: responsiveHeight(2), width: responsiveWidth(90) }}
        >
          <View style={{ marginHorizontal: responsiveHeight(2), marginTop: responsiveHeight(2) }}>
            <Text style={{ fontSize: responsiveFontSize(3), color: colors.secondary }}>Gold</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(7),
                  fontWeight: 'bold',
                  color: colors.secondary,
                }}
              >
                $1600
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  marginTop: responsiveHeight(3),
                  fontWeight: 'bold',
                  color: colors.secondary,
                }}
              >
                /Month
              </Text>
            </View>
          </View>

          <View style={{ marginHorizontal: responsiveHeight(1.5), paddingBottom: responsiveHeight(2) }}>
            <Text
              style={{
                color: colors.secondary,
                fontSize: responsiveFontSize(2.5),
                width: responsiveWidth(80),
                marginTop: responsiveHeight(1),
              }}
            >
              Free forever when you host with Debbi. Free for freelancers with Client Billing.
            </Text>
          </View>
        </ImageBackground>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ marginTop: responsiveHeight(4), gap: 20 }}
          horizontal
          renderItem={({ item }) => (
            <View
              key={item.id}
              style={{
                padding: responsiveHeight(6),
                borderRadius: 20,
                backgroundColor: item.bgColor,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: responsiveWidth(2),
              }}
            >
              <Text style={item.titleStyle}>{item.title}</Text>
              <Text style={item.numOfUsdStyle}>{item.numOfUsd}</Text>
            </View>
          )}
        />

        <Button
          style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(90) }}
          onPress={() => nav.navigate(ROUTES.PROFESSIONALS_PAYMENTMETHOD)}
          buttonText='Continue'
        />

        <View style={{ gap: 10, padding: responsiveHeight(3) }}>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              fontWeight: 'bold',
              color: colors.dark_purple,
              textAlign: 'center',
            }}
          >
            Recurring billing, cancel anytime
          </Text>
          <Text
            style={{
              fontSize: responsiveFontSize(1.8),
              color: colors.gray,
              lineHeight: responsiveHeight(2.7),
              textAlign: 'center',
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor exercitation.
          </Text>
        </View>
      </View>
    </MainContainer>
  );
};

export default GetGold;
