import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { responsiveFontSize, responsiveHeight } from '../utils';
import SVGXml from './SVGXml';
import { colors } from '../assets/colors';

interface threadsProps {
  image: ImageSourcePropType;
  name: string;
  icon: string;
  message: string;
}

const Threads = (props: threadsProps) => {
  return (
    <TouchableOpacity style={styles.threadsView}>
      <View style={{flexDirection: 'row', alignItems: 'center',gap: 10}}>
        <Image source={props?.image} style={styles.imageStyle} />
        <View>
      <Text style={styles.name}>{props?.name}</Text>
      <View style={{flexDirection: 'row',gap: 2,alignItems: 'center'}}>
        <SVGXml  icon={props?.icon} />
      <Text style={styles.message}>{props?.message}</Text>
      </View>
      </View>
     </View>
    </TouchableOpacity>
  )
};

export default Threads

const styles = StyleSheet.create({
  threadsView:{
    flexDirection: 'row',
    marginBottom: responsiveHeight(2),
    justifyContent: 'space-between'
  },
  imageStyle:{
    height: responsiveHeight(7.5),
    width: responsiveHeight(7.5),
    borderRadius: 100,
  },
  name:{
    color: colors.black,
    fontSize: responsiveFontSize(1.9)
  },
  message:{
    color: colors.textColor3,
    fontSize: responsiveFontSize(1.7)
  }
})