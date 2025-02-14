import { ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import { images } from '../../../assets/images';
import Header2 from '../../../components/Header2';

const Map = () => {
  return (
    <ImageBackground style={{flex: 1}} source={images.map}>
      <Header2 hideCancel  />
    </ImageBackground>
  )
}

export default Map;

const styles = StyleSheet.create({})