import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { colors } from '../assets/colors'

interface containerprops {
  children: ReactNode,
}

const MainContainer = (props: containerprops) => {
  return (
    <ScrollView contentContainerStyle={styles.contentStyle}>
        {props?.children}
    </ScrollView>
  )
}

export default MainContainer

const styles = StyleSheet.create({
  contentStyle:{
    flex: 1,
    backgroundColor: colors.secondary
  }
})