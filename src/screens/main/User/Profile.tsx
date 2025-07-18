/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header from '../../../components/Header';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  reviews,
  ROUTES,
} from '../../../utils';
import {images} from '../../../assets/images';
import SVGXml from '../../../components/SVGXml';
import svgIcons from '../../../assets/icons';
import {colors} from '../../../assets/colors';
import ProfileCard from '../../../components/ProfileCard';
import ReviewCard from '../../../components/ReviewCard';
import StarRating from 'react-native-star-rating-widget';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import {
  getUserProfileById,
  updateProfileImage,
} from '../../../GlobalFunctions/userMain';
import {baseUrl} from '../../../utils/api_content';
import {launchImageLibrary} from 'react-native-image-picker';

const certificates = [
  {id: 1, certicateImg: images.certi1},
  {id: 2, certicateImg: images.certi2},
  {id: 3, certicateImg: images.certi3},
  {id: 4, certicateImg: images.certi4},
];

const Profile = () => {
  const nav = useNavigation();
  const [userProfile, setUserProfile] = useState({});
  const [newImage, setNewImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateProfileImage, setIsUpdateProfileImage] = useState(false);
  const userDetail = useSelector((state: RootState) => state.user);

  const renderReviews = () => {
    const renderItem = ({item}) => {
      return (
        <ReviewCard
          day={item.days}
          image={item.image}
          name={item.name}
          rating={item.rating}
          desc={item.desc}
          local="local"
        />
      );
    };

    return (
      <View style={{paddingTop: responsiveHeight(2)}}>
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={styles.reviewHeading}>Reviews</Text>
            <StarRating
              rating={1}
              onChange={() => null}
              starSize={responsiveHeight(2.3)}
              maxStars={1}
            />
            <Text style={styles.ratingText}>4.9 (124)</Text>
          </View>
          <TouchableOpacity
            onPress={() => nav.navigate(ROUTES.SEE_ALL_REVIEWS)}>
            <Text
              style={[styles.ratingText, {textDecorationLine: 'underline'}]}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{marginHorizontal: -responsiveHeight(3)}}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{
            gap: 20,
            paddingHorizontal: responsiveHeight(3),
            paddingTop: responsiveHeight(2),
          }}
          data={reviews}
          renderItem={renderItem}
        />
      </View>
    );
  };

  const getUserProfile = async () => {
    setIsLoading(true);
    const res = await getUserProfileById({
      token: userDetail?.token,
      userId: userDetail?.userData?._id,
      type: 'User',
    });

    if (res.success) {
      setUserProfile(res?.data);
      setIsLoading(false);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch profile',
        text2: res?.message,
      });
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        (async () => {
          try {
            setIsUpdateProfileImage(true);
            const res = await updateProfileImage({
              userId: userDetail?.userData?._id,
              image: response.assets[0]?.uri,
              type: 'User',
            });

            if (res?.success) {
              setNewImage(response.assets[0]?.uri);
            } else {
              setIsUpdateProfileImage(false);
              setNewImage('');
            }
          } catch (error) {
            setIsUpdateProfileImage(false);
            setNewImage('');
            console.log('Image upload failed:', error);
          } finally {
            setIsUpdateProfileImage(false);
          }
        })();
      }
    });
  };

  useEffect(() => {
    getUserProfile();
  }, [userDetail, nav]);

  return (
    <MainContainer style={{paddingBottom: responsiveHeight(12)}}>
      <Header hideNotification showEdit />
      <View style={styles.subContainer}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color={colors.primary} />
        ) : (
          <>
            {isUpdateProfileImage ? (
              <ActivityIndicator size={'large'} color={colors.primary} />
            ) : (
              <View>
                <Image
                  style={styles.profileStyle}
                  source={{
                    uri: newImage
                      ? newImage
                      : `${baseUrl}/${userProfile?.image}`,
                  }}
                />
                <TouchableOpacity
                  style={styles.downloadView}
                  onPress={() => pickImage()}>
                  <SVGXml width={'14'} height={'14'} icon={svgIcons.download} />
                </TouchableOpacity>
              </View>
            )}
            <View
              style={{alignItems: 'center', paddingTop: responsiveHeight(3)}}>
              <View
                style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
                <Text style={styles.name}>
                  {userProfile?.firstName} {userProfile?.lastName}
                </Text>
                <SVGXml width={'18'} height={'18'} icon={svgIcons.checkmark2} />
              </View>
              <Text style={styles.detail}>{userProfile?.email}</Text>
              <Text style={styles.detail}>{userProfile?.address}</Text>
              <Text style={styles.detail}>
                Phone: {userProfile?.phoneNumber}
              </Text>

              {userDetail?.userData?.type === 'Professional' && (
                <View
                  style={{
                    marginTop: responsiveHeight(2),
                    alignItems: 'center',
                    gap: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.5),
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Monday - Sat
                  </Text>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.5),
                      color: colors.gray,
                      textAlign: 'center',
                    }}>
                    9:00am To 9:00pm
                  </Text>

                  <View>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2),
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      Rewards Points
                    </Text>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.1),
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      2000
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </>
        )}

        {/* <Text style={styles.desc}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries,
        </Text> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: responsiveHeight(3),
          }}>
          <ProfileCard
            text="Total Project"
            text2={userProfile?.projectLength}
          />
          <ProfileCard icon text="Email Address" />
        </View>
        {userDetail?.userData?.type === 'Professional' ? renderReviews() : null}

        {userDetail?.userData?.type === 'Professional' ? (
          <View style={{marginTop: responsiveHeight(2)}}>
            <Text style={styles.reviewHeading}>Certificates</Text>

            <FlatList
              data={certificates}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{gap: 20, marginTop: responsiveHeight(2)}}
              renderItem={({item}) => {
                return (
                  <View>
                    <Image
                      source={item.certicateImg}
                      style={{
                        width: responsiveWidth(20),
                        height: responsiveHeight(8),
                      }}
                    />
                  </View>
                );
              }}
            />
          </View>
        ) : null}
      </View>
    </MainContainer>
  );
};

export default Profile;

const styles = StyleSheet.create({
  subContainer: {
    padding: responsiveHeight(2),
  },
  profileStyle: {
    height: responsiveHeight(15),
    alignSelf: 'center',
    width: responsiveHeight(15),
    borderRadius: 10,
  },
  downloadView: {
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(4.5),
    width: responsiveHeight(4.5),
    borderRadius: 100,
    right: responsiveHeight(13),
    bottom: -responsiveHeight(2),
    // alignSelf: 'center',
    position: 'absolute',
  },
  name: {
    color: colors.textColor2,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.5),
  },
  detail: {
    color: colors.black,
    fontSize: responsiveFontSize(1.7),
  },
  desc: {
    color: colors.textColor3,
    textAlign: 'center',
    width: responsiveWidth(90),
    fontSize: responsiveFontSize(1.7),
    marginTop: responsiveHeight(4),
  },
  reviewHeading: {
    color: colors.textColor2,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.5),
  },
  ratingText: {
    color: colors.textColor2,
    fontSize: responsiveFontSize(2),
  },
});
