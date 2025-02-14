import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Header2 from '../../../components/Header2'
import { responsiveHeight } from '../../../utils'
import ModalComponent from '../../../components/Sheet'

const ReportJob = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(true)

  return (
    <>
      <Header2 subHeading hideCancel text='Report this Job' />
      <ModalComponent   
          isModalVisible={modalVisible}
      />
      </>
  )
}

export default ReportJob

const styles = StyleSheet.create({
  subContainer:{
    padding: responsiveHeight(2.5),
    paddingTop: responsiveHeight(0)
  }
})