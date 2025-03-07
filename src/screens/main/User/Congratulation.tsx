import React from 'react'
import { View } from 'react-native'
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import CongratulationCard from '../../../components/CongratulationCard';

const Congratulation = () => {
  return (
    <MainContainer scrollEnabled={false}>
      <Header2 headerText3='' hideCancel text='' subHeading={''} />

        <View style={{flex: 0.7, justifyContent: 'center', alignItems: 'center'}}>
            <CongratulationCard />
        </View>
    </MainContainer>
  )
}

export default Congratulation