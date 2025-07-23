/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import {images} from '../../../assets/images';
import {responsiveFontSize, responsiveHeight} from '../../../utils';
import SVGXml from '../../../components/SVGXml';
import svgIcons from '../../../assets/icons';
import {useNavigation} from '@react-navigation/native';
import {
  getUserProfileById,
  updateProjectStatusToInDiscussion,
} from '../../../GlobalFunctions/userMain';
import ChatCom from '../../../components/ChatCom';
import {useSelector} from 'react-redux';
// import Toast from 'react-native-toast-message';
import {baseUrl} from '../../../utils/api_content';
import {colors} from '../../../assets/colors';

const ChatMessages = ({route}: any) => {
  const nav = useNavigation();
  const professionalImage = route?.params?.professionalImage;
  const professionalSimpleImage = route?.params?.professionalSimpleImage;
  const professionalName = route?.params?.professionalName;
  const professionalId = route?.params?.professionalId;
  const projectId = route?.params?.projectId;
  //   const projectStatus = route?.params?.projectStatus;
  const userDetail = useSelector((state: RootState) => state.user);
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const receiverData = {
    _id: professionalId,
    fullName: professionalName,
    image: professionalSimpleImage,
  };

  const userData = {
    _id: userProfile?._id,
    image: userProfile?.image,
    fullName: `${userProfile?.firstName} ${userProfile?.lastName}`,
  };

  const updateProjectInDiscussion = async () => {
    const res = await updateProjectStatusToInDiscussion({
      id: projectId,
      inDiscussionPro: professionalId,
    });

    console.log({res});
  };

  const getUserProfile = async () => {
    setIsLoading(true);
    const res = await getUserProfileById({
      token: userDetail?.token,
      userId: userDetail?.userData?._id,
      type: 'User',
    });

    if (res.success) {
      setIsLoading(false);
      setUserProfile(res?.data);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (projectId && professionalId) {
      updateProjectInDiscussion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, professionalId]);

  useEffect(() => {
    getUserProfile();
  }, [userDetail, route?.params]);

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
                  professionalImage
                    ? {uri: professionalImage}
                    : professionalSimpleImage
                    ? {uri: `${baseUrl}/${professionalSimpleImage}`}
                    : images.profile
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
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      ) : (
        <ChatCom userData={userData} receiverData={receiverData} />
      )}
    </MainContainer>
  );
};

export default ChatMessages;
