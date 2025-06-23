import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import {images} from '../../../assets/images';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  reviews,
  ROUTES,
  taskDetails,
} from '../../../utils';
import {colors} from '../../../assets/colors';
import SVGXml from '../../../components/SVGXml';
import svgIcons from '../../../assets/icons';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import ReviewCard from '../../../components/ReviewCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-star-rating-widget';

const TaskDetail = ({route}) => {
  const nav = useNavigation();
  const [type, setType] = useState('');
  const previousData = route?.params?.type;

  useEffect(() => {
    const fetchType = async () => {
      try {
        const res = await AsyncStorage.getItem('type');
        if (res) setType(res);
      } catch (err) {
        console.log(err);
      }
    };

    fetchType();
  }, []);

  const renderItem = ({item}) => (
    <ReviewCard
      day={item.days}
      image={item.image}
      name={item.name}
      rating={item.rating}
      desc={item.desc}
    />
  );

  const showEdit =
    previousData !== 'Done' &&
    previousData !== 'Reject' &&
    previousData !== 'Hired' &&
    previousData !== 'In Discussion' &&
    type === 'User';

  const showReportButton =
    previousData !== 'Hired' &&
    previousData !== 'Done' &&
    previousData !== 'Reject' &&
    previousData !== 'In Discussion';

  const isUser = type === 'User';
  const isPro = type === 'Pro';

  const getHeaderText2 = () => {
    if (previousData === 'Hired' || previousData === 'In Discussion')
      return 'Report';
    if (isUser) return 'Cancel';
    return '';
  };

  const getHeaderText = () => {
    switch (previousData) {
      case 'Hired':
        return 'Hired Tasks';
      case 'Done':
        return 'Done Project';
      case 'Reject':
        return 'Rejected Project';
      case 'In Discussion':
        return 'In Discussion';
      default:
        return 'Open Project';
    }
  };

  return (
    <MainContainer>
      <Header2
        onCancel={() => {
          if (previousData === 'Hired' || previousData === 'In Discussion') {
            nav.navigate(ROUTES.REPORT_JOB);
          } else if (previousData !== 'In Discussion') {
            nav.navigate(ROUTES.CONGRATULATION, {cancelJob: 'cancel job'});
          } else {
            nav.goBack();
          }
        }}
        headerText2={getHeaderText2()}
        text={getHeaderText()}
      />

      <View style={styles.subContainer}>
        <Image style={styles.taskImage} source={images.taskdetail1} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            gap: 10,
          }}>
          <Text style={styles.heading}>
            {isUser ? 'Project Name' : 'Task Name'}
          </Text>
          {showEdit && (
            <TouchableOpacity
              style={styles.editView}
              onPress={() =>
                nav.navigate(ROUTES.POST_JOB, {screen: 'Edit Project'})
              }>
              <SVGXml width="20" height="20" icon={svgIcons.edit} />
            </TouchableOpacity>
          )}
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FlatList
            data={taskDetails}
            numColumns={2}
            columnWrapperStyle={{gap: 15}}
            contentContainerStyle={{gap: 10}}
            renderItem={({item}) => (
              <View style={styles.taskItem}>
                <SVGXml icon={item.icon} />
                <Text style={{color: colors.black}}>{item.title}</Text>
              </View>
            )}
          />
          <Text style={styles.priceText}>
            Hourly/<Text style={{fontWeight: 'bold'}}>$455</Text>
          </Text>
        </View>

        <Text style={styles.desc}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry...
        </Text>

        {showReportButton && (
          <View style={styles.postTimeRow}>
            <View>
              <View style={styles.timeRow}>
                <SVGXml icon={svgIcons.clock} />
                <Text style={styles.time}>Posted 3 days ago</Text>
              </View>
              {previousData === 'Reject' && (
                <>
                  <Text
                    style={[styles.heading, {marginTop: responsiveHeight(2)}]}>
                    Email
                  </Text>
                  <Text style={styles.detail}>exampleemail@gmail.com</Text>
                  <Text
                    style={[styles.heading, {marginTop: responsiveHeight(2)}]}>
                    Phone Number
                  </Text>
                  <Text style={styles.detail}>1234567890</Text>
                </>
              )}
            </View>
            {showReportButton && (
              <TouchableOpacity
                onPress={() =>
                  nav.navigate('SecondaryStack', {screen: ROUTES.REPORT_JOB})
                }>
                <Text style={styles.reportText}>Report</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {['Hired', 'Done', 'In Discussion'].includes(previousData) &&
          isUser && (
            <>
              <TouchableOpacity style={styles.professionalProfile}>
                <View style={styles.profileLeft}>
                  <Image
                    source={images.professional}
                    style={styles.professionalImage}
                  />
                  <View>
                    <Text style={styles.name}>James Andrew</Text>
                    <Text style={styles.ratingText}>Rating 4.5</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.iconWrapper}
                  onPress={() => nav.navigate(ROUTES.CHAT_MESSAGES)}>
                  <SVGXml width="17" height="17" icon={svgIcons.professional} />
                </TouchableOpacity>
              </TouchableOpacity>

              {previousData === 'In Discussion' && (
                <View style={{paddingTop: responsiveHeight(3)}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Button
                      buttonText="Hire Now"
                      onPress={() => nav.navigate(ROUTES.MY_JOBS)}
                      style={{width: responsiveWidth(42)}}
                    />
                    <Button
                      buttonText="Proposal"
                      onPress={() => nav.navigate(ROUTES.PROPOSAL)}
                      style={{width: responsiveWidth(42)}}
                    />
                  </View>
                  <Button
                    gradient
                    onPress={() =>
                      nav.navigate(ROUTES.CONGRATULATION, {reject: 'reject'})
                    }
                    style={{
                      marginTop: responsiveHeight(2),
                      width: responsiveWidth(90),
                      backgroundColor: colors.red2,
                    }}
                    buttonText="Reject"
                  />
                </View>
              )}

              {previousData === 'Done' && (
                <>
                  <ReviewCard
                    style={{
                      marginTop: responsiveHeight(2.5),
                      width: responsiveWidth(89),
                    }}
                    image={images.review1}
                    name="James Andrew"
                    rating="5.0"
                    day="1 day ago"
                    desc="Many thanks to james he is professional, Cleaner.."
                  />
                  <Button
                    onPress={() => nav.navigate(ROUTES.GIVE_REVIEW)}
                    style={{
                      marginTop: responsiveHeight(3.5),
                      width: responsiveWidth(90),
                    }}
                    buttonText="Give Review"
                  />
                </>
              )}

              {previousData === 'Hired' && (
                <Button
                  style={{
                    marginTop: responsiveHeight(3.5),
                    width: responsiveWidth(90),
                  }}
                  onPress={() => nav.navigate(ROUTES.PAYMENT_METHODS)}
                  buttonText="Pay Now"
                />
              )}
            </>
          )}

        {previousData !== 'In Discussion' && isUser && (
          <View style={{marginTop: responsiveHeight(2)}}>
            <Text style={styles.applyTxt}>Apply For This Job</Text>
            <TouchableOpacity style={styles.professionalProfile}>
              <View style={styles.profileLeft}>
                <Image
                  source={images.professional}
                  style={styles.professionalImage}
                />
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Text style={styles.name}>James Andrew</Text>
                    <SVGXml width="17" height="17" icon={svgIcons.checkmark2} />
                  </View>
                  <View style={{flexDirection: 'row', gap: 20}}>
                    <Text style={styles.ratingText}>Rating 4.5</Text>
                    <Text style={styles.ratingText}>Waiting</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.iconWrapper}
                onPress={() => nav.navigate(ROUTES.CHAT_MESSAGES)}>
                <SVGXml width="17" height="17" icon={svgIcons.professional} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        )}

        {isPro && previousData === 'Done' && (
          <>
            <View>
              <View style={styles.timeRow}>
                <SVGXml icon={svgIcons.clock} />
                <Text style={styles.time}>Posted 3 days ago</Text>
              </View>
              <Text style={[styles.heading, {marginTop: responsiveHeight(2)}]}>
                Email
              </Text>
              <Text style={styles.detail}>exampleemail@gmail.com</Text>
              <Text style={[styles.heading, {marginTop: responsiveHeight(2)}]}>
                Phone Number
              </Text>
              <Text style={styles.detail}>1234567890</Text>
            </View>

            <View style={{paddingTop: responsiveHeight(2)}}>
              <View style={styles.reviewRow}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
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
                    style={[
                      styles.ratingText,
                      {textDecorationLine: 'underline'},
                    ]}>
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: 20,
                  paddingHorizontal: responsiveHeight(3),
                  paddingTop: responsiveHeight(2),
                }}
                data={reviews}
                renderItem={renderItem}
              />
            </View>
          </>
        )}

        {isPro && previousData !== 'Hired' && (
          <Button
            style={{
              marginTop: responsiveHeight(3.5),
              width: responsiveWidth(90),
            }}
            onPress={() => nav.navigate(ROUTES.PROFESSIONALS_PAYMENTMETHOD)}
            buttonText="Get Job"
          />
        )}
      </View>
    </MainContainer>
  );
};

export default TaskDetail;

// Reuse original styles and remove duplicates.
const styles = StyleSheet.create({
  subContainer: {
    padding: responsiveHeight(2.5),
  },
  taskImage: {
    height: responsiveHeight(44),
    alignSelf: 'center',
    borderRadius: 10,
    width: responsiveHeight(44),
  },
  heading: {
    fontSize: responsiveFontSize(2.5),
    color: colors.textColor2,
    fontWeight: 'bold',
  },
  editView: {
    backgroundColor: colors.primary,
    height: responsiveHeight(4.5),
    width: responsiveHeight(4.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  priceText: {
    color: colors.textColor2,
    marginTop: responsiveHeight(0.5),
    fontSize: responsiveFontSize(2.2),
  },
  desc: {
    color: colors.textColor3,
    marginTop: responsiveHeight(2.5),
    width: responsiveWidth(90),
    fontSize: responsiveFontSize(1.9),
  },
  reportText: {
    color: colors.textColor2,
    marginTop: responsiveHeight(0.5),
    fontSize: responsiveFontSize(2),
  },
  time: {
    color: colors.textColor3,
    fontSize: responsiveFontSize(1.9),
  },
  professionalProfile: {
    borderWidth: 0.2,
    borderColor: colors.black,
    padding: responsiveHeight(1.5),
    flexDirection: 'row',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: responsiveHeight(3),
    justifyContent: 'space-between',
  },
  applyTxt: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
  },
  name: {
    color: colors.black,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  ratingText: {
    color: colors.textColor3,
    fontSize: responsiveFontSize(1.7),
  },
  professionalImage: {
    height: responsiveHeight(7),
    width: responsiveHeight(7),
    borderRadius: 100,
  },
  iconWrapper: {
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(4),
    width: responsiveHeight(4),
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusText: {
    color: colors.black,
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    marginTop: responsiveHeight(3),
  },
  detail: {
    color: colors.textColor2,
    fontSize: responsiveFontSize(1.8),
    marginTop: responsiveHeight(1),
  },
});
