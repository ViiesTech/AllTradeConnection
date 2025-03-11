import React from 'react';
import { View, Text } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import StarRating from 'react-native-star-rating-widget';
import { giveReviewFields, responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES } from '../../../utils';
import { colors } from '../../../assets/colors';
import CustomInputForm from '../../../components/InputField';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

export const validationSchema = Yup.object().shape({
  review: Yup.string()
});

const GiveReview = () => {
  const nav = useNavigation();
  return (
    <MainContainer>
    <Header2 headerText3='' hideCancel text={''} subHeading={''} />

        <View style={{flex: 1, gap: responsiveHeight(20), justifyContent: 'flex-end', alignItems: 'center'}}>
            <View style={{gap: 10}}>
            <Text style={{textAlign: 'center', fontSize: responsiveFontSize(2.5), fontWeight: 'bold', color: colors.dark_purple}}>Give a Star</Text>
            <StarRating
            rating={2}
            onChange={() => null}
            starSize={responsiveHeight(4)}
            maxStars={5}
            />
            </View>

        <CustomInputForm inputContainer={{width: responsiveWidth(90)}} buttonStyle={{width: responsiveWidth(90)}} inputStyle={{color: 'black'}} inputContainerStyle={{marginTop: responsiveHeight(0)}} onSubmit={(values) => nav.navigate(ROUTES.CONGRATULATION, {review: 'review'})} initialValues={{review: 'Write a review',}} validationSchema={validationSchema} buttonText='Submit' fields={giveReviewFields} />
        </View>
    </MainContainer>
  )
}

export default GiveReview