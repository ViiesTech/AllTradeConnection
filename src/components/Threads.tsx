/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {responsiveFontSize, responsiveHeight, ROUTES} from '../utils';
import SVGXml from './SVGXml';
import {colors} from '../assets/colors';
import {useNavigation} from '@react-navigation/native';
import {baseUrl} from '../utils/api_content';

interface threadsProps {
  image: ImageSourcePropType;
  name: string;
  icon: string;
  message: string;
  userId: string;
}

const Threads = (props: threadsProps) => {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      style={styles.threadsView}
      onPress={() =>
        nav.navigate(ROUTES.CHAT_MESSAGES, {
          professionalSimpleImage: props?.image,
          professionalName: props?.name,
          professionalId: props?.userId,
        })
      }>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <Image
          source={{uri: `${baseUrl}/${props?.image}`}}
          style={styles.imageStyle}
        />
        <View>
          <Text style={styles.name}>{props?.name}</Text>
          <View style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
            {/* <SVGXml icon={props?.icon} /> */}
            <Text style={styles.message}>{props?.message}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Threads;

const styles = StyleSheet.create({
  threadsView: {
    flexDirection: 'row',
    marginBottom: responsiveHeight(2),
    justifyContent: 'space-between',
  },
  imageStyle: {
    height: responsiveHeight(7.5),
    width: responsiveHeight(7.5),
    borderRadius: 100,
  },
  name: {
    color: colors.black,
    fontSize: responsiveFontSize(1.9),
  },
  message: {
    color: colors.textColor3,
    fontSize: responsiveFontSize(1.7),
  },
});
