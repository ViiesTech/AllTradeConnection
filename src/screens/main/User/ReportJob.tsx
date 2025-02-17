import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header2 from '../../../components/Header2';
import { responsiveHeight } from '../../../utils';
import ModalComponent from '../../../components/Sheet';
import { useIsFocused } from '@react-navigation/native';

const ReportJob = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const isFocused = useIsFocused();

  useEffect(() => {

    if(isFocused) { 
    setModalVisible(true)
  } else {
    setModalVisible(false)
  }

  },[isFocused])

  return (
    <>
      <Header2 hideBack subHeading hideCancel text='Report this Job' />
      <ModalComponent   
          isModalVisible={modalVisible}
      />
       </>
  )
}

export default ReportJob;

const styles = StyleSheet.create({
  subContainer:{
    padding: responsiveHeight(2.5),
    paddingTop: responsiveHeight(0)
  }
})