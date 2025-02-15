import { StyleSheet, View } from 'react-native'
import React from 'react'
import MainContainer from '../../../components/MainContainer'
import Header2 from '../../../components/Header2'
import { notificationsData, responsiveHeight } from '../../../utils'
import NotificationCard from '../../../components/NotificationCard'

const Notification = () => {
  return (
    <MainContainer>
      <Header2 hideCancel text='Notification' />
      <View style={styles.subContainer}>
        {notificationsData.map((item) => {
          return (
            <NotificationCard cardStyle={{ marginBottom: responsiveHeight(2.2) }} time={item.time} title={item.title} />
          )
        })}
      </View>
    </MainContainer>
  )
}

export default Notification;

const styles = StyleSheet.create({
  subContainer: {
    padding: responsiveHeight(2.5),
    paddingTop: 0,
  }
})