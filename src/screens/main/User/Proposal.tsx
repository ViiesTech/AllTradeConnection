/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import ReviewCard from '../../../components/ReviewCard';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ROUTES,
} from '../../../utils';
import {images} from '../../../assets/images';
import StarRating from 'react-native-star-rating-widget';
import {colors} from '../../../assets/colors';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {
  getProposalsByProposalId,
  updateProposalByProposalIdAndStatus,
} from '../../../GlobalFunctions/userMain';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import { baseUrl } from '../../../utils/api_content';

const Proposal = ({route}) => {
  const nav = useNavigation();
  const proposalId = route?.params?.proposalId;
  const professionalImage = route?.params?.professionalImage;
  const professionalSimpleImage = route?.params?.professionalSimpleImage;
  const professionalName = route?.params?.professionalName;
  const professionalId = route?.params?.professionalId;
  const projectId = route?.params?.projectId;
  const projectStatus = route?.params?.projectStatus;
  const [getPropo, setPropo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const getProposal = async proposalId => {
    setIsLoading(true);
    const res = await getProposalsByProposalId({proposalId: proposalId});
    if (res?.success) {
      setPropo(res.data);
      setIsLoading(false);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch proposal',
        text2: res?.message,
      });
      setIsLoading(false);
    }
  };

  const handleHireNow = async () => {
    if (isLoading) {
      return null;
    }

    setIsUpdating(true);
    const res = await updateProposalByProposalIdAndStatus({
      proposalId: proposalId,
      status: 'Accept',
    });
    if (res?.success) {
      nav.navigate(ROUTES.MAIN_STACK, {screen: 'BottomStack'});
      setIsUpdating(false);
      Toast.show({
        type: 'success',
        text1: 'Hired successfully',
        text2: `You have successfully Accept ${getPropo?.proProfileId?.firstName} ${getPropo?.proProfileId?.lastName}`,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed to hire',
        text2: res?.message,
      });
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    getProposal(proposalId);
  }, [proposalId, route?.params]);

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      ) : (
        <MainContainer>
          <Header2
            headerText3=""
            hideCancel
            text={'Proposal'}
            messagingIcon
            subHeading={''}
            professionalImage={professionalImage}
            professionalSimpleImage={professionalSimpleImage}
            professionalName={professionalName}
            professionalId={professionalId}
            projectId={projectId}
            projectStatus={projectStatus}
          />

          <View>
            <View style={[styles.reviewStyle]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Image style={styles.imageStyle} source={{uri: `${baseUrl}/${getPropo?.proProfileId?.image}`}} />
                  <View>
                    <Text style={styles.name}>
                      {getPropo?.proProfileId?.firstName}{' '}
                      {getPropo?.proProfileId?.lastName}
                    </Text>
                    <Text style={styles.day}>
                      Rating {Number(getPropo?.proProfileId?.avgRating)?.toFixed(1)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Text style={styles.ratingTime}>
                    {moment(getPropo?.createdAt).fromNow()}
                  </Text>
                  <Text style={styles.ratingText}>{`$${getPropo?.price}`}</Text>
                </View>
              </View>
              <Text style={styles.desc}>{getPropo?.proposal}</Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              marginBottom: responsiveHeight(2),
            }}>
            {getPropo?.status !== 'Accept' && getPropo?.status !== 'Reject' ? (
              <Button
                style={{
                  marginTop: responsiveHeight(3.5),
                  width: responsiveWidth(90),
                }}
                isLoading={isUpdating}
                onPress={() => handleHireNow()}
                buttonText="Hire Now"
              />
            ) : null}
            {getPropo?.status !== 'Reject' && (
              <Button
                gradient
                style={{
                  marginTop: responsiveHeight(3.5),
                  width: responsiveWidth(90),
                  backgroundColor: colors.red2,
                }}
                onPress={() =>
                  nav.navigate(ROUTES.CONGRATULATION, {
                    reject: 'reject',
                    proposalId: proposalId,
                  })
                }
                buttonText="Reject"
              />
            )}
          </View>
        </MainContainer>
      )}
    </>
  );
};

export default Proposal;

const styles = StyleSheet.create({
  reviewStyle: {
    width: responsiveWidth(90),
    alignSelf: 'center',
  },
  imageStyle: {
    height: responsiveHeight(6),
    width: responsiveHeight(6),
    borderRadius: 100,
  },
  name: {
    color: colors.textColor2,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  day: {
    color: colors.gray,
    fontSize: responsiveFontSize(1.8),
  },
  ratingTime: {
    color: colors.gray,
    fontSize: responsiveFontSize(1.5),
  },
  ratingText: {
    color: colors.textColor2,
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
  },
  desc: {
    marginTop: responsiveHeight(2),
    color: colors.textColor3,
  },
});
