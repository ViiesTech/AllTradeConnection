import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { colors } from '../assets/colors'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils'

const StartAndEndtimeInput = () => {
  return (
    <View style={styles.inputContainerWrapper}>
      <View style={styles.row}>
        <View style={[styles.inputContainer, false && styles.errorInput]}>
          <Text style={styles.label}>{'Start Time'}</Text>
          <TextInput
            style={styles.input}
            placeholder={'9:00AM'}
            placeholderTextColor={colors.black}
          />
        </View>
        <View style={[styles.inputContainer, false && styles.errorInput]}>
          <Text style={styles.label}>{'End Time'}</Text>
          <TextInput
            style={styles.input}
            placeholder={'12:00PM'}
            placeholderTextColor={colors.black}
          />
        </View>
      </View>
      <View style={[styles.inputContainerTwo, false && styles.errorInput]}>
          <TextInput
            style={styles.inputTwo}
            placeholder={'Addional Details'}
            placeholderTextColor={colors.black}
            multiline={true}
            textAlignVertical='top'
          />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainerWrapper: {
    marginBottom: responsiveHeight(3.5),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    borderWidth: 0.1,
    borderRadius: 10,
    paddingHorizontal: responsiveHeight(2),
    backgroundColor: colors.secondary,
    borderColor: colors.black,
    marginHorizontal: responsiveWidth(1),
  },
  inputContainerTwo: {
    marginTop: responsiveHeight(3.5),
    borderWidth: 0.1,
    borderRadius: 10,
    paddingHorizontal: responsiveHeight(2),
    backgroundColor: colors.secondary,
    borderColor: colors.black,
    marginHorizontal: responsiveWidth(1),
  },
  input: {
    flex: 1,
    borderRadius: 8,
    padding: responsiveHeight(2),
    fontSize: responsiveFontSize(2),
    color: colors.black,
    marginTop: -7,
    marginLeft: -15
  },
  inputTwo: {
    flex: 1,
    borderRadius: 8,
    padding: responsiveHeight(2),
    fontSize: responsiveFontSize(2),
    color: colors.black,
    marginLeft: -15,
    height: responsiveHeight(20),
  },
  label: {
    marginTop: responsiveHeight(1),
    color: colors.gray,
    textTransform: 'capitalize',
  },
  errorInput: {
    borderColor: colors.red,
    borderWidth: 1,
  },
})

export default StartAndEndtimeInput
