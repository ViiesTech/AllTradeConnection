/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../assets/colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  taskDetails,
} from '../utils';
import SVGXml from './SVGXml';
import {formatDate} from '../utils/index';
import {baseUrl} from '../utils/api_content';

interface taskProps {
  image?: ImageSourcePropType;
  title?: string;
  desc?: string;
  price?: string;
  item?: any;
  onPress?: () => void;
}

const TaskCard = (props: taskProps) => {
  return (
    <TouchableOpacity
      onPress={props?.onPress}
      style={{marginBottom: responsiveHeight(4)}}
      activeOpacity={0.9}>
      <View style={styles.cardView}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: `${baseUrl}/${props?.item?.images[0]}`}}
            style={{width: 100, height: 100}}
          />
          <View style={{marginLeft: responsiveHeight(1.5)}}>
            <View style={styles.hiredView}>
              <Text style={styles.hiredText}>{props?.item?.status}</Text>
            </View>
            <Text style={styles.taskText}>{props?.title}</Text>
            <Text style={styles.desc}>{props.desc}</Text>
            <View style={{paddingTop: responsiveHeight(0.5)}}>
              <FlatList
                data={taskDetails}
                numColumns={2}
                columnWrapperStyle={{gap: 10, marginTop: responsiveHeight(1.5)}}
                renderItem={({item}) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <SVGXml icon={item.icon} />
                      <Text style={{color: colors.black}}>
                        {item?.id == 2 && props.item?.endTime}
                        {item?.id == 1 && props.item?.selectDate
                          ? formatDate(new Date(props.item?.selectDate))
                          : item?.id == 1 && 'N/A'}
                        {item?.id == 3 && props.item?.locationName}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            Hourly/<Text style={{fontWeight: 'bold'}}>${props?.price}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  cardView: {
    borderWidth: 0.3,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: colors.black,
    padding: responsiveHeight(2),
  },
  hiredView: {
    padding: responsiveHeight(1),
    backgroundColor: 'rgb(211, 229, 242)',
    borderRadius: 10,
    alignItems: 'center',
    maxWidth: responsiveWidth(30),
  },
  hiredText: {
    color: colors.primary,
    fontSize: responsiveFontSize(1.6),
  },
  taskText: {
    color: colors.textColor2,
    fontSize: responsiveFontSize(2.3),
    marginTop: responsiveHeight(1),
    fontWeight: 'bold',
  },
  priceText: {
    color: colors.textColor2,
    fontSize: responsiveFontSize(2.2),
  },
  desc: {
    color: colors.textColor3,
    marginTop: responsiveHeight(1),
    width: responsiveWidth(60),
  },
  priceContainer: {
    position: 'absolute',
    top: responsiveHeight(2),
    right: responsiveWidth(3),
  },
});
