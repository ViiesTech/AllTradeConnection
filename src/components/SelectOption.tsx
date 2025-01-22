import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { images } from '../assets/images'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils'
import { colors } from '../assets/colors'
import SVGXml from './SVGXml'
import svgIcons from '../assets/icons'

interface optionProps {
  image: ImageSourcePropType;
  text: string;
  active: boolean;
  onClick: () => void;
}

const SelectOption = ({text,active,image,onClick}: optionProps) => {
  return (
    <TouchableOpacity onPress={onClick} style={styles.wrapper}>
    <View style={styles.cardStyle}>
      <Image source={image} style={styles.imageStyle} />
    </View>
   <View> 
    {active == text &&
        <View style={styles.checkBoxView}>
              <SVGXml icon={svgIcons.check} />
        </View>
    }
    </View>
    <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  )
}

export default SelectOption

const styles = StyleSheet.create({
  wrapper:{
      alignItems: 'center',
  },
  cardStyle:{
    borderWidth: 0.2,
    borderRadius: 10,
    paddingHorizontal: responsiveHeight(3.8),
    padding: responsiveHeight(2.8),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
    imageStyle:{
      height: responsiveHeight(8),
      width: responsiveWidth(12),
    },
    textStyle:{
      color: colors.dark_purple,
      fontWeight: 'bold',
      marginTop: responsiveHeight(1.5),
      fontSize: responsiveFontSize(2)
    },
    checkBoxView:{
      position: 'absolute',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      width: responsiveHeight(4.5),
      height: responsiveHeight(4.5),
      bottom: responsiveHeight(-1),
      backgroundColor: colors.primary
    }
  
})