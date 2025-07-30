import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import {notificationsData, responsiveHeight} from '../../../utils';
import NotificationCard from '../../../components/NotificationCard';
import {getAllNotifications} from '../../../GlobalFunctions/userMain';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

const Notification = ({route}: any) => {
  const userDetail = useSelector((state: RootState) => state.user);
  const [allNotifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getNotifications = async () => {
    const res = await getAllNotifications({token: userDetail?.token});
    if (res?.success) {
      setNotifications(res.data);
      setIsLoading(false);
    } else {
      setNotifications([]);
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch notifications',
        text2: res?.message,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [route?.params]);

  return (
    <MainContainer>
      <Header2 hideCancel text="Notification" />
      <View style={styles.subContainer}>
        {allNotifications.map(item => {
          return (
            <NotificationCard
              cardStyle={{marginBottom: responsiveHeight(2.2)}}
              time={item?.time}
              title={item?.message}
            />
          );
        })}
      </View>
    </MainContainer>
  );
};

export default Notification;

const styles = StyleSheet.create({
  subContainer: {
    padding: responsiveHeight(2.5),
    paddingTop: 0,
  },
});
