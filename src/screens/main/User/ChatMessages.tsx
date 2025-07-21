/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import {images} from '../../../assets/images';
import {responsiveFontSize, responsiveHeight} from '../../../utils';
import SVGXml from '../../../components/SVGXml';
import svgIcons from '../../../assets/icons';
import Example from '../../../components/ChatCom';
import {useNavigation} from '@react-navigation/native';
import {updateProjectStatusToInDiscussion} from '../../../GlobalFunctions/userMain';

const ChatMessages = ({route}: any) => {
  const nav = useNavigation();
  const professionalImage = route?.params?.professionalImage;
  const professionalName = route?.params?.professionalName;
  const professionalId = route?.params?.professionalId;
  const projectId = route?.params?.projectId;
//   const projectStatus = route?.params?.projectStatus;

  const updateProjectInDiscussion = async () => {
    const res = await updateProjectStatusToInDiscussion({
      id: projectId,
      inDiscussionPro: professionalId,
    });

    console.log({res});
  };

  useEffect(() => {
    if(projectId && professionalId){
        updateProjectInDiscussion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, professionalId]);

  return (
    <MainContainer style={{flex: 1}}>
      <View
        style={{marginTop: responsiveHeight(1), padding: responsiveHeight(2)}}>
        <View style={{flexDirection: 'row', gap: 30, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => nav.goBack()}>
            <SVGXml width={'20'} height={'20'} icon={svgIcons.back_arrow} />
          </TouchableOpacity>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
            <View
              style={{
                borderWidth: 3,
                width: 55,
                height: 55,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#D4D4D4',
                borderRadius: 100,
              }}>
              <Image
                source={
                  professionalImage ? {uri: professionalImage} : images.profile
                }
                style={{width: 47, height: 47, borderRadius: 100}}
              />
            </View>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                textTransform: 'capitalize',
              }}>
              {professionalName ? professionalName : `Lord Justin`}
            </Text>
          </View>
        </View>
      </View>
      <Example />
    </MainContainer>
  );
};

export default ChatMessages;
