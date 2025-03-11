import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import ReviewCard from '../../../components/ReviewCard';
import { responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES } from '../../../utils';
import { images } from '../../../assets/images';
import StarRating from 'react-native-star-rating-widget';
import { colors } from '../../../assets/colors';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';

const Proposal = () => {
  const nav = useNavigation();
  return (
    <MainContainer>
    <Header2 headerText3='' hideCancel text={'Proposal'} messagingIcon subHeading={''} />

    <View>
    <View style={[styles.reviewStyle]}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Image style={styles.imageStyle} source={images.review1} />
          <View>
            <Text style={styles.name}>James Andrew</Text>
            <Text style={styles.day}>Rating 4.5</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
          <Text style={styles.ratingTime}>{'45 Sec ago'}</Text>
          <Text style={styles.ratingText}>{'$30'}</Text>
        </View>
      </View>
      <Text style={styles.desc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</Text>
    </View>
    </View>

        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: responsiveHeight(2)}}>
        <Button style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(90) }} onPress={() => nav.navigate(ROUTES.MY_JOBS)} buttonText='Hire Now' />}
        <Button gradient style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(90), backgroundColor: colors.red2 }} onPress={() => nav.navigate(ROUTES.CONGRATULATION, {reject: 'reject'})} buttonText='Reject' />
        </View>
    </MainContainer>
  )
}

export default Proposal;

const styles = StyleSheet.create({
  reviewStyle: {
    width: responsiveWidth(90),
    alignSelf: 'center'
  },
  imageStyle:{
    height: responsiveHeight(6),
    width: responsiveHeight(6),
    borderRadius: 100,
  },
  name: {
    color: colors.textColor2,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2)
  },
  day: {
    color: colors.gray,
    fontSize: responsiveFontSize(1.8)
  },
  ratingTime: {
    color: colors.gray,
    fontSize: responsiveFontSize(1.5)
  },
  ratingText: {
    color: colors.textColor2,
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
  },
  desc: {
    marginTop: responsiveHeight(2),
    color: colors.textColor3,
  }
})