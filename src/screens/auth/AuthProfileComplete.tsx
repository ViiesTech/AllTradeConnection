import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import Modal from "react-native-modal";
import { colors } from '../../assets/colors';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES } from '../../utils';
import SVGXml from '../../components/SVGXml';
import svgIcons from '../../assets/icons';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthProfileComplete = ({route}) => {

  const nav = useNavigation();

  const {type} = route?.params || {};
  console.log('data',type)

  const onCompleteButtonPress = async () => {
    if (type === 'logout') {
      nav.navigate(ROUTES.AUTHSTACK);
    } else {
      await AsyncStorage.getItem('type').then((res: any) => {
        if(res === 'User'){
          nav.navigate(ROUTES.DRAWER_STACK);
        }else {
          nav.navigate(ROUTES.SUBSCRIPTION_PACKAGES);
        }
      }).catch((err) => {
        console.log(err, 'err');
      });
    }
  };

  return (
    <Container>
      <Modal animationIn={'bounce'} backdropOpacity={0} isVisible={true}>
        <View style={styles.modalStyle}>
          <Text style={styles.heading}>{type === 'logout' ? 'Logout' : 'All Set'}</Text>
          <View style={styles.border} />
          <LinearGradient
            start={{ x: 1, y: 2 }}
            end={{ x: 2, y: 0.2 }}
            style={styles.circleContainer}
            colors={[colors.primary, colors.secondary]}>
            <View style={styles.circle}>
                  <SVGXml icon={svgIcons.checkmark} width={'100'} height={'120'} />
            </View>
          </LinearGradient>
                <Text style={styles.welcomeText}>{type === 'logout' ?  'Are you sure you want to logout' :  'Welcome To The All Trades Connection'}</Text>
                <Button onPress={() => onCompleteButtonPress()} gradient={true} buttonText={type === 'logout' ? 'Logout' : 'Get Started' }textStyle={{color: colors.dark_purple}} style={{backgroundColor: colors.secondary,marginTop: responsiveHeight(3)}} />
        </View>
      </Modal>
    </Container>
  )
}

export default AuthProfileComplete;

const styles = StyleSheet.create({
  modalStyle: {
    flex: 0.45,
    borderRadius: 10,
    paddingTop: responsiveHeight(2),
    backgroundColor: colors.primary
  },
  heading: {
    color: colors.secondary,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.2)
  },
  border: {
    borderBottomColor: colors.secondary,
    marginTop: responsiveHeight(2),
    borderBottomWidth: 1,
  },
  circleContainer: {
    alignItems: 'center',
    paddingTop: responsiveHeight(5),
  },
  circle: {
    height: responsiveHeight(10),
    width: responsiveHeight(10),
    borderRadius: 100,
    alignItems: 'center',
    backgroundColor: colors.secondary,
    justifyContent: 'center'
  },
  welcomeText:{
    color: colors.secondary,
    fontSize: responsiveFontSize(1.8),
    textAlign: 'center',
    marginTop: responsiveHeight(4),
    alignSelf: 'center',
    width: responsiveWidth(40),
  }
})