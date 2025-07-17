/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {
  reportList,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils';
import {colors} from '../assets/colors';
import SVGXml from './SVGXml';
import svgIcons from '../assets/icons';
import Button from './Button';
import {useNavigation} from '@react-navigation/native';

function ModalComponent({
  isModalVisible,
  backdropPress,
  selectedReport,
  setSelectedReport,
  onSubmitHandler,
  isLoading,
}: any) {

  return (
    <Modal
      animationInTiming={500}
      animationOutTiming={500}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropOpacity={0}
      onBackdropPress={backdropPress}
      style={{margin: 0}}
      isVisible={isModalVisible}>
      <View style={styles.modalView}>
        <SVGXml style={{alignSelf: 'center'}} icon={svgIcons.modal_bar} />
        <View style={{paddingTop: responsiveHeight(0.8)}}>
          {reportList.map(item => (
            <TouchableOpacity
              style={{
                backgroundColor:
                  selectedReport?.id == item.id ? '#b3b3b3' : '#fff',
                  borderBottomWidth: 1,
                  borderBottomColor: '#b3b3b3',
                  paddingVertical: responsiveHeight(3),
                  borderRadius: 10,
              }}
              onPress={() =>
                setSelectedReport({id: item.id, report: item.text})
              }>
              <Text style={styles.textStyle}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button
          onPress={onSubmitHandler}
          buttonText="Submit"
          isLoading={isLoading}
          style={{
            marginTop: responsiveHeight(3),
            marginBottom: responsiveHeight(2),
          }}
        />
      </View>
    </Modal>
  );
}

export default ModalComponent;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: colors.secondary,
    margin: 0,
    bottom: 0,
    position: 'absolute',
    width: '100%',
    paddingVertical: 5,
    padding: responsiveHeight(2),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  textStyle: {
    color: colors.black,
    textAlign: 'center',
    fontSize: responsiveFontSize(2.5),
  },
  border: {
    borderBottomColor: colors.black,
    borderBottomWidth: 0.2,
    marginBottom: responsiveHeight(2),
  },
});
