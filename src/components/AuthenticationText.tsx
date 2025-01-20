import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { colors } from '../assets/colors'
import { responsiveFontSize } from '../utils'

interface TextProps {
    text: string,
    text2: string,
    onPress: () => void,
    containerStyle: ViewStyle
}

const AuthenticationText = ({text,onPress,text2,containerStyle}: TextProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[containerStyle]}>
      <Text style={styles.textStyle}>{text} have an account ? <Text style={{fontWeight: 'bold',color: colors.primary}}>{text2}</Text></Text>
    </TouchableOpacity>
  )
}

export default AuthenticationText

const styles = StyleSheet.create({
    textStyle:{
        textAlign: 'center',
        fontSize: responsiveFontSize(2)
    }
})