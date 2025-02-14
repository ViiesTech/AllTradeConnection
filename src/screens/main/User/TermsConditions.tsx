import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainContainer from '../../../components/MainContainer'
import Header2 from '../../../components/Header2'
import { responsiveFontSize, responsiveHeight } from '../../../utils'
import { colors } from '../../../assets/colors'

const TermsConditions = () => {
  return (
    <MainContainer>
        <Header2 hideCancel text='Terms & Conditions' />
        <View style={styles.textView}>
              <Text style={styles.text}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu{'\n'}{'\n'}{'\n'}

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu{'\n'}{'\n'}{'\n'}

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.{'\n'}{'\n'}{'\n'}

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuDuis aute irure dolor in.{'\n'}{'\n'}{'\n'}

 reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu</Text>
        </View>
    </MainContainer>
  )
}

export default TermsConditions;

const styles = StyleSheet.create({
  textView:{
    paddingTop: responsiveHeight(0.5),
    padding: responsiveHeight(2.5),
  },
  text:{
    color: colors.textColor3,
    fontSize: responsiveFontSize(2)
  }
})