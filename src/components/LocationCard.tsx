import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../assets/colors';
import { responsiveFontSize, responsiveHeight } from '../utils';

interface cardProps {
heading: string;
text: string;
cardStyle: ViewStyle;
}

const LocationCard = ({heading,text,cardStyle}: cardProps) => {
  return (
    <View style={[styles.card,cardStyle]}>
      <Text style={styles.locationText}>{heading}</Text>
      <Text style={styles.location}>{text}</Text>
    </View>
  )
}

export default LocationCard

const styles = StyleSheet.create({
  card:{
      borderWidth: 0.2,
      padding: responsiveHeight(1),
      paddingLeft: responsiveHeight(2),
      borderRadius: 10,
      backgroundColor: colors.secondary,
      borderColor: colors.black
  },
  locationText:{
    color: colors.textColor,
    fontSize: responsiveFontSize(1.8)
  },
  location:{
    color: colors.black,
    fontSize: responsiveFontSize(1.6),
  }
})