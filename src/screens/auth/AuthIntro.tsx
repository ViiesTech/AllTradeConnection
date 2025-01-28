import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES, slides } from '../../utils';
import { colors } from '../../assets/colors';
import SVGXml from '../../components/SVGXml';
import svgIcons from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';

const renderItem = ({ item }) => {
  return (
    <View style={styles.slidesWrapper}>
      <Image source={item.image} style={styles.imageStyle} />
      <Text style={styles.titleStyle}>{item.title}</Text>
      <Text style={styles.textStyle}>{item.text}</Text>
    </View>
  )
}

const renderNextButton = () => {
  return (
    <View style={styles.nextCard}>
          <SVGXml icon={svgIcons.arrownext} width={'10'} />
    </View> 
  )
}

const renderSlider = () => {
  const nav = useNavigation()

  return (
    <AppIntroSlider showNextButton={true}
      showDoneButton={true}
      showSkipButton={true}
      renderNextButton={renderNextButton}
      renderDoneButton={renderNextButton}
      onDone={() => nav.navigate(ROUTES.AUTH_PROFILE_COMPLETE)}
      renderSkipButton={() => (
        <Text style={styles.skipText}>Skip</Text>
      )}
      dotStyle={{ display: 'none' }} renderItem={renderItem} data={slides} />
  )
}

const AuthIntro = () => {
  return (
    <View style={styles.container}>
      {renderSlider()}
    </View>
  )
}

export default AuthIntro

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  slidesWrapper: {
    alignItems: 'center',
    paddingTop: responsiveHeight(10),
  },
  imageStyle: {
    height: responsiveHeight(69),
    width: responsiveWidth(81)
  },
  titleStyle: {
    color: colors.dark_purple,
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
  },
  textStyle: {
    textAlign: 'center',
    color: colors.b,
    marginTop: responsiveHeight(0.5),
    width: responsiveWidth(85),
    fontSize: responsiveFontSize(1.6)
  },
  nextCard:{
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: responsiveHeight(0.5),
    justifyContent: 'center',
    height: responsiveHeight(5),
    width: responsiveHeight(5)
  },
  skipText:{
    color: colors.primary,
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  }
})