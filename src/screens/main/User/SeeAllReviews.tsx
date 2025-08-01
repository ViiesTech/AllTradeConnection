/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, FlatList} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import {responsiveFontSize, responsiveHeight, reviews} from '../../../utils';
import StarRating from 'react-native-star-rating-widget';
import {colors} from '../../../assets/colors';
import ReviewCard from '../../../components/ReviewCard';
import moment from 'moment';
import {baseUrl} from '../../../utils/api_content';

const SeeAllReviews = ({route}) => {
  const data = route?.params?.data;

  const renderItem = ({item}) => {
    return (
      <ReviewCard
        day={moment(item?.createdAt).fromNow()}
        image={`${baseUrl}/${item?.userId.image}`}
        name={`${item?.userId?.firstName} ${item?.userId?.lastName}`}
        rating={item.rating}
        desc={item.comment}
        style={{width: '100%'}}
      />
    );
  };
  return (
    <MainContainer>
      <Header2 headerText3="" hideCancel text={''} subHeading={''} />

      <View style={{padding: responsiveHeight(3), paddingTop: 0}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(2.3),
              fontWeight: 'bold',
              color: colors.dark_purple,
            }}>
            Reviews
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <StarRating
              rating={1}
              onChange={() => null}
              starSize={responsiveHeight(2.3)}
              maxStars={1}
            />
            <Text>
              {Number(data?.avgRating)?.toFixed(1)}{' '}
              {`(${data?.reviews?.length})`}
            </Text>
          </View>
        </View>

        <View>
          <FlatList
            contentContainerStyle={{gap: 20, paddingTop: responsiveHeight(2)}}
            data={data?.reviews}
            renderItem={renderItem}
          />
        </View>
      </View>
    </MainContainer>
  );
};

export default SeeAllReviews;
