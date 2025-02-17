import { StyleSheet, Text } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../assets/colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils';
import SVGXml from './SVGXml';
import svgIcons from '../assets/icons';

interface cardProps {
  text: string,
  text2: string,
  icon: boolean;
}

const ProfileCard = (props: cardProps) => {
  return (
    <LinearGradient
      start={{ x: 1, y: -1.9 }}
      end={{ x: 1, y: 1 }}
      colors={[colors.secondary, colors.primary]}
      style={styles.cardStyle}>
        <Text style={styles.text}>{props?.text}</Text>
        {props?.icon ?
              <SVGXml icon={svgIcons.location2} />
          :
        <Text style={styles.number}>{props?.text2}</Text>
      }
    </LinearGradient>
  )
}

export default ProfileCard;

const styles = StyleSheet.create({
  cardStyle: {
    alignItems: 'center',
    width: responsiveWidth(44),
    paddingVertical: responsiveHeight(1.4),
    justifyContent: 'center',
    borderRadius: 10,
  },
  text:{
    color: colors.secondary,
    fontSize: responsiveFontSize(2.2)
  },
  number:{
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.2)
  }
})