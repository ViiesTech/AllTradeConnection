/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../assets/colors';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from '../utils';
import CheckBoxText from './CheckBoxText';
import DateTimePicker from '@react-native-community/datetimepicker/src/datetimepicker';
import moment from 'moment';

type Props = {
  isProfessional?: any;
  setIsProfessional?: any;
  startTime?: any;
  endTime?: any;
  openStartTimePicker?: any;
  setOpenStartTimePicker?: any;
  openEndTimePicker?: any;
  setOpenEndTimePicker?: any;
  startTimeOnChange?: any;
  endTimeOnChange?: any;
  additional?: any;
  setAdditional?: any;
};

const StartAndEndtimeInput = ({
  isProfessional,
  setIsProfessional,
  startTime,
  endTime,
  openStartTimePicker,
  setOpenStartTimePicker,
  openEndTimePicker,
  setOpenEndTimePicker,
  startTimeOnChange,
  endTimeOnChange,
  additional,
  setAdditional,
}: Props) => {
  return (
    <View style={styles.inputContainerWrapper}>
      {openStartTimePicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          display="default"
          is24Hour={false}
          onChange={startTimeOnChange}
        />
      )}
      {openEndTimePicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          display="default"
          is24Hour={false}
          onChange={endTimeOnChange}
        />
      )}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.inputContainer, false && styles.errorInput]}
          onPress={() => setOpenStartTimePicker(true)}>
          <Text style={styles.label}>{'Start Time'}</Text>
          <TextInput
            style={styles.input}
            placeholder={moment(startTime).format('hh:mm A')}
            placeholderTextColor={colors.black}
            editable={false}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.inputContainer, false && styles.errorInput]}
          onPress={() => setOpenEndTimePicker(true)}>
          <Text style={styles.label}>{'End Time'}</Text>
          <TextInput
            style={styles.input}
            placeholder={moment(endTime).format('hh:mm A')}
            placeholderTextColor={colors.black}
            editable={false}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.inputContainerTwo, false && styles.errorInput]}>
        <TextInput
          style={styles.inputTwo}
          placeholder={'Addional Details'}
          placeholderTextColor={colors.black}
          multiline={true}
          textAlignVertical="top"
          value={additional}
          onChangeText={(text) => setAdditional(text)}
        />
      </View>
      <View
        style={{
          marginTop: responsiveHeight(4),
          flexDirection: 'row',
          width: responsiveWidth(90),
          justifyContent: 'space-between',
        }}>
        <View style={{width: responsiveWidth(40)}}>
          <CheckBoxText
            isChecked={isProfessional === 'New Professional'}
            text={'New Professional'}
            onPress={() => setIsProfessional('New Professional')}
          />
        </View>
        <View style={{width: responsiveWidth(45)}}>
          <CheckBoxText
            isChecked={isProfessional === 'Previous Professional'}
            text={'Previous Professional'}
            onPress={() => setIsProfessional('Previous Professional')}
          />
        </View>
      </View>
    </View>
  );
};

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
    marginLeft: -15,
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
});

export default StartAndEndtimeInput;
