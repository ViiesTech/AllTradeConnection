/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import StarRating from 'react-native-star-rating-widget';
import {
  giveReviewFields,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ROUTES,
} from '../../../utils';
import {colors} from '../../../assets/colors';
import CustomInputForm from '../../../components/InputField';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {createReview} from '../../../GlobalFunctions/userMain';
import Toast from 'react-native-toast-message';

export const validationSchema = Yup.object().shape({
  review: Yup.string().required(),
});

const GiveReview = ({route}) => {
  const nav = useNavigation();
  const userId = route?.params?.userId;
  const professionalId = route?.params?.professionalId;
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async values => {
    if (isLoading) {
      return null;
    }

    if (!values?.review) {
      return Toast.show({
        type: 'error',
        text1: 'Failed to Post Review',
        text2: 'Review is required',
      });
    }

    if (!rating) {
      return Toast.show({
        type: 'error',
        text1: 'Failed to Post Review',
        text2: 'Rating is required',
      });
    }

    console.log({
      userId: userId,
      proProfileId: professionalId,
      comment: values?.review,
      rating: rating,
    });

    setIsLoading(true);
    const res = await createReview({
      userId: userId,
      proProfileId: professionalId,
      comment: values?.review,
      rating: rating,
    });

    console.log(res);
    if (res?.success) {
      nav.navigate(ROUTES.CONGRATULATION, {review: 'review'});
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Review Posted successfully',
        text2: `Your review has been posted successfully.`,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed to Post Review',
        text2: res?.message,
      });
      setIsLoading(false);
    }
  };

  return (
    <MainContainer>
      <Header2 headerText3="" hideCancel text={''} subHeading={''} />

      <ScrollView style={{flex: 1}} nestedScrollEnabled scrollEnabled>
        <View
          style={{
            flex: 1,
            gap: responsiveHeight(20),
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View style={{gap: 10}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: responsiveFontSize(2.5),
                fontWeight: 'bold',
                color: colors.dark_purple,
              }}>
              Give a Star
            </Text>
            <StarRating
              rating={rating}
              onChange={rate => setRating(Math.round(rate))}
              starSize={responsiveHeight(4)}
              maxStars={5}
            />
          </View>

          <CustomInputForm
            inputContainer={{width: responsiveWidth(90)}}
            buttonStyle={{width: responsiveWidth(90)}}
            inputStyle={{color: 'black'}}
            inputContainerStyle={{marginTop: responsiveHeight(0)}}
            onSubmit={values => onSubmitHandler(values)}
            initialValues={{review: ''}}
            validationSchema={validationSchema}
            buttonText="Submit"
            isLoading={isLoading}
            fields={giveReviewFields}
          />
        </View>
      </ScrollView>
    </MainContainer>
  );
};

export default GiveReview;
