import {ScrollView, StyleSheet, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {colors} from '../assets/colors';

interface ContainerProps {
  children: ReactNode;
  style: ViewStyle;
  scrollEnabled: boolean,
}

const Container = (props: ContainerProps) => {
  return (
    <ScrollView
      style={[styles.containerStyle]}
      showsVerticalScrollIndicator={false}
      scrollEnabled={props?.scrollEnabled}  
      contentContainerStyle={[styles.contentStyle,props?.style]}>
      {props?.children}
    </ScrollView>
  );
};

export default Container;

const styles = StyleSheet.create({
  contentStyle: {
    flexGrow: 1,
    backgroundColor: colors.secondary,
  },
});
