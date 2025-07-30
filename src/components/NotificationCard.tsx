import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {colors} from '../assets/colors';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from '../utils';

interface notificationProps {
  title: string;
  time: string;
  cardStyle: ViewStyle;
}

const NotificationCard = (props: notificationProps) => {
  return (
    <TouchableOpacity style={[styles.notificationStyle, props?.cardStyle]}>
      <View style={{flexDirection: 'row', gap: 14, alignItems: 'center'}}>
        <View style={styles.notificationCircle} />
        <View>
          <Text style={styles.text}>{props?.title}</Text>
          {/* <Text style={styles.desc}>You have earned 1000 Points</Text> */}
        </View>
      </View>
      <View>
        {/* <View style={styles.numberView}>
          <Text style={styles.number}>1</Text>
        </View> */}
        <Text style={styles.time}>{props?.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  notificationStyle: {
    borderWidth: 0.2,
    padding: responsiveHeight(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    borderColor: colors.black,
  },
  notificationCircle: {
    borderRadius: 100,
    borderWidth: 1,
    height: responsiveHeight(6),
    width: responsiveHeight(6),
    borderColor: colors.black,
  },
  text: {
    color: colors.textColor2,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
    maxWidth: responsiveWidth(60)
  },
  desc: {
    color: colors.textColor2,
    fontSize: responsiveFontSize(1.7),
  },
  numberView: {
    borderRadius: 100,
    height: responsiveHeight(2.5),
    backgroundColor: colors.primary,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    width: responsiveHeight(2.5),
  },
  number: {
    color: colors.secondary,
  },
  time: {
    color: colors.textColor3,
  },
});
