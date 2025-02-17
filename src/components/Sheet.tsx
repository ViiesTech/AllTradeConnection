import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { reportList, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils';
import { colors } from '../assets/colors';
import SVGXml from './SVGXml';
import svgIcons from '../assets/icons';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';


function ModalComponent({ isModalVisible, backdropPress }) {
const nav = useNavigation();

  return (
    <Modal
      animationInTiming={500}
      animationOutTiming={500}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropOpacity={0}
      onBackdropPress={backdropPress}
      style={{ margin: 0 }}
      isVisible={isModalVisible}>
          <View style={styles.modalView}>
                  <SVGXml style={{alignSelf: 'center'}} icon={svgIcons.modal_bar} />
                  <View style={{paddingTop: responsiveHeight(0.8)}}>
                    {reportList.map((item) => (
                      <>
                      <Text style={styles.textStyle}>{item.text}</Text>
                      <View style={styles.border} />
                      </>
                    ))}
                  </View>
                  <Button onPress={() => nav.goBack()} buttonText='Submit' style={{marginTop: responsiveHeight(3),marginBottom: responsiveHeight(2)}} />
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
  textStyle:{
    color: colors.black,
    textAlign: 'center',
    marginBottom: responsiveHeight(2),
    fontSize: responsiveFontSize(2.5)
  },
  border:{
    borderBottomColor: colors.black,
    borderBottomWidth: 0.20,
    marginBottom: responsiveHeight(2),
  },
})
