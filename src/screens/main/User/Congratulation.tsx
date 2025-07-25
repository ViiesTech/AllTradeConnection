/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import CongratulationCard from '../../../components/CongratulationCard';
import {useNavigation} from '@react-navigation/native';

const Congratulation = ({route}) => {
  const changePasswordScreen = route?.params?.changePassword;
  const review = route?.params?.review;
  const cancelJob = route?.params?.cancelJob;
  const reject = route?.params?.reject;
  const subscribing = route?.params?.subscribing;
  const deleteCard = route?.params?.deleteCard;
  const addNow = route?.params?.addNow;
  const additional = route?.params?.additional;
  const proposalId = route?.params?.proposalId;
  const projectId = route?.params?.projectId;
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigation();

  return (
    <MainContainer scrollEnabled={false}>
      <Header2 headerText3="" hideCancel text="" subHeading={''} />

      <View style={{flex: 0.7, justifyContent: 'center', alignItems: 'center'}}>
        <CongratulationCard
          changePasswordScreen={changePasswordScreen}
          review={review}
          cancelJob={cancelJob}
          reject={reject}
          subscribing={subscribing}
          deleteCard={deleteCard}
          addNow={addNow}
          additional={additional}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          nav={nav}
          proposalId={proposalId}
          projectId={projectId}
        />
      </View>
    </MainContainer>
  );
};

export default Congratulation;
