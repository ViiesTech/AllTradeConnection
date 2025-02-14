import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { responsiveHeight } from '../utils';
import SVGXml from './SVGXml';

interface threadsProps {
  image: ImageSourcePropType;
  name: string;
  icon: string;
  message: string;
}

const Threads = (props: threadsProps) => {
  return (
    <TouchableOpacity style={styles.threadsView}>
      <View style={{flexDirection: 'row', alignItems: 'center',gap: 0}}>
        <Image source={props?.image} style={styles.imageStyle} />
        <View>
      <Text>{props?.name}</Text>
      <View style={{flexDirection: 'row',gap: 10,alignItems: 'center'}}>
        <SVGXml width={'20'} height={'20'} icon={props?.icon} />
      <Text>{props?.message}</Text>
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
    justifyContent: 'space-between'
  },
  imageStyle:{
    height: responsiveHeight(17),
    width: responsiveHeight(17),
    borderRadius: 100,
  }
})