import { ScrollView, StyleSheet,  ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { colors } from '../assets/colors'

interface containerprops {
  children: ReactNode,
  style: ViewStyle,
  scrollEnabled: boolean,
}

const MainContainer = (props: containerprops) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={props.scrollEnabled} contentContainerStyle={[styles.containerStyle,props?.style]}>
        {props?.children}
    </ScrollView>
  )
}

export default MainContainer

const styles = StyleSheet.create({
  containerStyle:{
    flexGrow: 1,
    backgroundColor: colors.secondary
  }
})