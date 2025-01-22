import { ImageBackground, ImageSourcePropType, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import { images } from '../assets/images';
import { responsiveHeight, responsiveWidth } from '../utils';
import { colors } from '../assets/colors';

interface ContainerProps {
  children: ReactNode;
  style?: ViewStyle;
  image?: ImageSourcePropType;
  scrollEnabled?: boolean;
}

const Container = (props: ContainerProps) => {
  return (
      <ScrollView
        // style={[styles.containerStyle]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={props?.scrollEnabled}
        contentContainerStyle={[styles.contentStyle, props?.style]}>
         <ImageBackground style={styles.containerStyle} source={images.background}> 
        {props?.children}
        </ImageBackground>
      </ScrollView>
  );
};

export default Container;

const styles = StyleSheet.create({
  contentStyle: {
    flexGrow: 1,
    backgroundColor: colors.secondary,
  },
  imageStyle: {
    backgroundColor: 'red',
    width: responsiveWidth(100),
    height: responsiveHeight(30),
  },
  containerStyle: {
    flex: 1,
  },
});
