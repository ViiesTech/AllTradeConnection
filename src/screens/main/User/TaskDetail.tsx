/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
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
} from '../../../utils';
import {colors} from '../../../assets/colors';
import SVGXml from '../../../components/SVGXml';
import svgIcons from '../../../assets/icons';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import ReviewCard from '../../../components/ReviewCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-star-rating-widget';
import {
  getProjectById,
  getProposalsByProjectIdAndStatus,
  getReviewByUserIdAndProId,
  updateProposalByProposalIdAndStatus,
} from '../../../GlobalFunctions/userMain';
import Toast from 'react-native-toast-message';
import {baseUrl} from '../../../utils/api_content';
import moment from 'moment';
import {useSelector} from 'react-redux';

const TaskDetail = ({route}) => {
  const nav = useNavigation();
  const [type, setType] = useState('');
  const [getProjectDetails, setGetProjectDetails] = useState({});
  const [getReviews, setGetReviews] = useState({});
  const [reviewLoading, setReviewLoading] = useState({});
  const [inDiscussionData, setInDiscussionData] = useState([]);
  const [rejectedProposal, setRejectedProposal] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState({id: 0});
  const [showButtons, setShowButtons] = useState(false);
  const [getProposal, setGetProposal] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Pending');
  const [isLoading, setIsLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  // const previousData = route?.params?.type;
  const projectId = route?.params?.projectId;
  const userDetail = useSelector((state: RootState) => state.user);
  const [isUpdating, setIsUpdating] = useState(false);

  interface taskDetailTypes {
    id: number;
    title: string;
    icon: string;
  }

  const taskDetails: taskDetailTypes[] = [
    {
      id: 1,
      title: moment(getProjectDetails?.selectDate).format('YYYY-MM-DD'),
      icon: svgIcons.calendar,
    },
    {
      id: 2,
      title: moment(getProjectDetails?.createdAt).format('hh:mm A'),
      icon: svgIcons.clock,
    },
    {
      id: 3,
      title: getProjectDetails?.locationName,
      icon: svgIcons.location,
    },
  ];

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

  const isUser = userDetail?.userData?.type === 'User';
  const isPro = userDetail?.userData?.type === 'Professional';

  const showEdit =
    getProjectDetails?.status !== 'Done' &&
    getProjectDetails?.status !== 'Canceled' &&
    getProjectDetails?.status !== 'Hired' &&
    getProjectDetails?.status !== 'In Discussion' &&
    isUser;

  const showReportButton =
    getProjectDetails?.status !== 'Hired' &&
    getProjectDetails?.status !== 'Done' &&
    getProjectDetails?.status !== 'Canceled' &&
    getProjectDetails?.status !== 'In Discussion';

  const getHeaderText2 = () => {
    if (
      getProjectDetails?.status === 'Hired' ||
      getProjectDetails?.status === 'In Discussion'
    )
      return 'Report';
    if (
      isUser &&
      getProjectDetails?.status !== 'Canceled' &&
      getProjectDetails?.status !== 'Done'
    )
      return 'Cancel';
    return '';
  };

  const getHeaderText = () => {
    if (getProjectDetails?.status === 'Hired') {
      return 'Hired Tasks';
    } else if (getProjectDetails?.status === 'Done') {
      return 'Done Project';
    } else if (getProjectDetails?.status === 'Canceled') {
      return 'Canceled Project';
    } else if (getProjectDetails?.status === 'In Discussion') {
      return 'In Discussion';
    } else if (!!rejectedProposal?.length) {
      return 'Rejected Project';
    } else if (!!inDiscussionData?.length) {
      return 'In Discussion';
    } else {
      return 'Open Project';
    }
  };

  const getProject = async projectId => {
    setIsLoading(true);
    const res = await getProjectById({projectId: projectId});
    if (res?.success) {
      setGetProjectDetails(res.data);
      setIsLoading(false);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch project',
        text2: res?.message,
      });
      setIsLoading(false);
    }
  };

  const getProposalByProjectId = async (projectId, status) => {
    setStatusLoading(true);
    const res = await getProposalsByProjectIdAndStatus({
      projectId: projectId,
      projectStatus: status,
    });

    if (res?.success) {
      setGetProposal(res?.data);
      setStatusLoading(false);
    } else {
      setGetProposal([]);
      setStatusLoading(false);
    }
  };

  const getReview = async (proId, userId) => {
    setReviewLoading(true);
    const res = await getReviewByUserIdAndProId({
      userId: userId,
      proProfileId: proId,
    });

    if (res?.success) {
      setGetReviews(res?.data[0]);
      setReviewLoading(false);
    } else {
      setGetReviews({});
      setReviewLoading(false);
    }
  };

  useEffect(() => {
    getProject(projectId);
  }, [projectId]);

  useEffect(() => {
    getReview(getProjectDetails?.asignTo?._id, userDetail?.userData?._id);
  }, [getProjectDetails?.asignTo?._id, userDetail?.userData?._id]);

  useEffect(() => {
    getProposalByProjectId(projectId, selectedTab);
  }, [projectId, selectedTab]);

  const getDataForInDiscussion = async () => {
    const res = await getProposalsByProjectIdAndStatus({
      projectId: getProjectDetails?._id,
      projectStatus: 'Pending',
    });

    const proposalData = res?.data?.filter(item => item.proProfileId?._id);
    const proProfileData = getProjectDetails.inDiscussionPro?.filter(
      item => item._id,
    );

    const matchedData = proposalData?.filter(proposal =>
      proProfileData?.some(pro => pro._id === proposal.proProfileId._id),
    );

    if (!!matchedData.length) {
      setInDiscussionData(matchedData);
    }
  };

  const getDataForRejectedProposalData = async () => {
    const res = await getProposalsByProjectIdAndStatus({
      projectId: getProjectDetails?._id,
      projectStatus: 'Reject',
    });

    const matched = res?.data?.filter(
      item => item.proProfileId?._id === userDetail?.userData?._id,
    );

    setRejectedProposal(matched);
  };

  const handleHireNow = async proposalId => {
    if (isUpdating) {
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
        text2: `You have successfully Accept`,
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
    getDataForInDiscussion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProjectDetails?.inDiscussionPro]);

  useEffect(() => {
    getDataForRejectedProposalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProjectDetails?.inDiscussionPro]);

  console.log(getProjectDetails);
  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      ) : (
        <MainContainer>
          <Header2
            onCancel={() => {
              if (
                getProjectDetails?.status === 'Hired' ||
                getProjectDetails?.status === 'In Discussion'
              ) {
                nav.navigate(ROUTES.REPORT_JOB);
              } else if (getProjectDetails?.status !== 'In Discussion') {
                nav.navigate(ROUTES.CONGRATULATION, {
                  cancelJob: 'cancel job',
                  projectId: projectId,
                });
              } else {
                nav.goBack();
              }
            }}
            headerText2={getHeaderText2()}
            text={getHeaderText()}
          />

          <View style={styles.subContainer}>
            {!!getProjectDetails?.images?.length && (
              <Image
                style={styles.taskImage}
                source={{uri: `${baseUrl}/${getProjectDetails?.images[0]}`}}
              />
            )}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
                gap: 10,
              }}>
              <Text style={styles.heading}>{getProjectDetails?.fullName}</Text>
              {showEdit && (
                <TouchableOpacity
                  style={styles.editView}
                  onPress={() =>
                    nav.navigate('SecondaryStack', {
                      screen: ROUTES.POST_JOB,
                      params: {
                        projectId: projectId,
                        screen: 'Edit Project',
                      },
                    })
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
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <SVGXml icon={item.icon} />
                    <Text style={{color: colors.black}}>{item.title}</Text>
                  </View>
                )}
              />
              <Text style={styles.priceText}>
                Hourly/
                <Text style={{fontWeight: 'bold'}}>
                  ${getProjectDetails?.price}
                </Text>
              </Text>
            </View>

            <Text style={styles.desc}>{getProjectDetails?.additionalNote}</Text>

            {showReportButton && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: responsiveHeight(2),
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <SVGXml icon={svgIcons.clock} />
                    <Text style={styles.time}>
                      Posted {moment(getProjectDetails?.createdAt).fromNow()}
                    </Text>
                  </View>
                  {!!rejectedProposal?.length && (
                    <>
                      <Text
                        style={[
                          styles.heading,
                          {marginTop: responsiveHeight(2)},
                        ]}>
                        Email
                      </Text>
                      <Text style={styles.detail}>
                        {getProjectDetails?.userProfileId?.email}
                      </Text>
                      <Text
                        style={[
                          styles.heading,
                          {marginTop: responsiveHeight(2)},
                        ]}>
                        Phone Number
                      </Text>
                      <Text style={styles.detail}>
                        {getProjectDetails?.userProfileId?.phoneNumber}
                      </Text>
                    </>
                  )}
                </View>
                {showReportButton && isPro && rejectedProposal?.length === 0 ? (
                  <TouchableOpacity
                    onPress={() =>
                      nav.navigate('SecondaryStack', {
                        screen: ROUTES.REPORT_JOB,
                        params: {
                          professionalId: getProjectDetails?.userProfileId?._id,
                        },
                      })
                    }>
                    <Text style={styles.reportText}>Report</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            )}

            {['Hired', 'Done', 'In Discussion'].includes(
              getProjectDetails?.status,
            ) &&
              isUser && (
                <>
                  <TouchableOpacity style={styles.professionalProfile}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                      }}>
                      <Image
                        source={
                          getProjectDetails?.asignTo
                            ? {
                                uri: `${baseUrl}/${getProjectDetails?.asignTo?.image}`,
                              }
                            : images.professional
                        }
                        style={styles.professionalImage}
                      />
                      <View>
                        <Text style={styles.name}>
                          {getProjectDetails?.asignTo?.firstName}{' '}
                          {getProjectDetails?.asignTo?.lastName}
                        </Text>
                        <Text style={styles.ratingText}>
                          Rating{' '}
                          {Math.round(getProjectDetails?.asignTo?.avgRating)}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.iconWrapper}
                      onPress={() => nav.navigate(ROUTES.CHAT_MESSAGES)}>
                      <SVGXml
                        width="17"
                        height="17"
                        icon={svgIcons.professional}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>

                  {/* {getProjectDetails?.status === 'In Discussion' && (
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
                          nav.navigate(ROUTES.CONGRATULATION, {
                            reject: 'reject',
                          })
                        }
                        style={{
                          marginTop: responsiveHeight(2),
                          width: responsiveWidth(90),
                          backgroundColor: colors.red2,
                        }}
                        buttonText="Reject"
                      />
                    </View>
                  )} */}

                  {getProjectDetails?.status === 'Done' && (
                    <>
                      <ReviewCard
                        style={{
                          marginTop: responsiveHeight(2.5),
                          width: responsiveWidth(89),
                        }}
                        image={`${baseUrl}/${getReviews?.userId?.image}`}
                        name={`${getReviews?.userId?.firstName} ${getReviews?.userId?.lastName}`}
                        rating={getReviews?.rating}
                        day={moment(getReviews?.createdAt).fromNow()}
                        desc={getReviews?.comment}
                      />
                      <Button
                        onPress={() => {
                          nav.navigate(ROUTES.GIVE_REVIEW, {
                            userId: userDetail?.userData?._id,
                            professionalId: getProjectDetails?.asignTo?._id,
                          });
                        }}
                        style={{
                          marginTop: responsiveHeight(3.5),
                          width: responsiveWidth(90),
                        }}
                        buttonText="Give Review"
                      />
                    </>
                  )}

                  {getProjectDetails?.status === 'Hired' && (
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

            {isUser && !!inDiscussionData.length && (
              <>
                <Text
                  style={[styles.applyTxt, {marginTop: responsiveHeight(2)}]}>
                  In Discussion
                </Text>
                <FlatList
                  data={inDiscussionData}
                  renderItem={({item}) => {
                    return (
                      <>
                        <TouchableOpacity
                          style={[
                            styles.professionalProfile,
                            {
                              backgroundColor:
                                selectedProposal?.id == item._id
                                  ? colors.line_color
                                  : null,
                            },
                          ]}
                          onPress={() => {
                            setSelectedProposal({id: item?._id});
                            setShowButtons(true);
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: 10,
                              alignItems: 'center',
                            }}>
                            <Image
                              source={
                                item?.proProfileId?.image
                                  ? {
                                      uri: `${baseUrl}/${item?.proProfileId?.image}`,
                                    }
                                  : images.professional
                              }
                              style={styles.professionalImage}
                            />
                            <View>
                              <Text style={styles.name}>
                                {item?.proProfileId?.firstName}{' '}
                                {item?.proProfileId?.lastName}
                              </Text>
                              <Text style={styles.ratingText}>
                                Rating{' '}
                                {Number(item?.proProfileId?.avgRating)?.toFixed(
                                  1,
                                )}
                              </Text>
                            </View>
                          </View>
                          <TouchableOpacity
                            style={styles.iconWrapper}
                            onPress={() =>
                              nav.navigate(ROUTES.CHAT_MESSAGES, {
                                professionalImage: `${baseUrl}/${item?.proProfileId?.image}`,
                                professionalName: `${item?.proProfileId?.firstName} ${item?.proProfileId?.lastName}`,
                              })
                            }>
                            <SVGXml
                              width="17"
                              height="17"
                              icon={svgIcons.professional}
                            />
                          </TouchableOpacity>
                        </TouchableOpacity>
                        {showButtons && selectedProposal.id == item._id && (
                          <View style={{paddingTop: responsiveHeight(3)}}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <Button
                                buttonText="Hire Now"
                                isLoading={isUpdating}
                                onPress={() => {
                                  handleHireNow(selectedProposal.id);
                                }}
                                style={{width: responsiveWidth(42)}}
                              />
                              <Button
                                buttonText="Proposal"
                                onPress={() => {
                                  if (selectedProposal.id) {
                                    nav.navigate(ROUTES.PROPOSAL, {
                                      proposalId: selectedProposal.id,
                                    });
                                  } else {
                                    Toast.show({
                                      type: 'error',
                                      text1: 'Failed',
                                      text2: 'Select the proposal',
                                    });
                                  }
                                }}
                                style={{width: responsiveWidth(42)}}
                              />
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <Button
                                gradient
                                onPress={() =>
                                  nav.navigate(ROUTES.CONGRATULATION, {
                                    reject: 'reject',
                                    proposalId: selectedProposal.id,
                                  })
                                }
                                style={{
                                  marginTop: responsiveHeight(2),
                                  width: responsiveWidth(42),
                                  backgroundColor: colors.red2,
                                }}
                                buttonText="Reject"
                              />
                              <Button
                                gradient
                                onPress={() =>
                                  nav.navigate('SecondaryStack', {
                                    screen: ROUTES.REPORT_JOB,
                                    params: {
                                      professionalId: item?.proProfileId?._id,
                                    },
                                  })
                                }
                                style={{
                                  marginTop: responsiveHeight(2),
                                  width: responsiveWidth(42),
                                  backgroundColor: colors.textColor,
                                }}
                                buttonText="Report"
                              />
                            </View>
                          </View>
                        )}
                      </>
                    );
                  }}
                />
              </>
            )}

            {getProjectDetails?.status === 'Open' &&
              isUser &&
              inDiscussionData?.length == 0 && (
                <View style={{marginTop: responsiveHeight(2)}}>
                  <Text style={styles.applyTxt}>Apply For This Job</Text>

                  <View
                    style={{
                      marginTop: responsiveHeight(1),
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 20,
                    }}>
                    <Text style={[styles.applyTxt, {fontSize: 17}]}>
                      Status:
                    </Text>

                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          selectedTab === 'Pending'
                            ? colors.primary
                            : colors.secondary,
                        borderWidth: 1,
                        borderColor: colors.primary,
                        borderRadius: 10,
                      }}
                      onPress={() => setSelectedTab('Pending')}>
                      <Text
                        style={{
                          color:
                            selectedTab === 'Pending'
                              ? colors.secondary
                              : colors.primary,
                          padding: 7,
                        }}>
                        Pending
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setSelectedTab('Accept')}
                      style={{
                        borderWidth: 1,
                        borderColor: colors.primary,
                        backgroundColor:
                          selectedTab === 'Accept'
                            ? colors.primary
                            : colors.secondary,
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          color:
                            selectedTab === 'Accept'
                              ? colors.secondary
                              : colors.primary,
                          padding: 7,
                        }}>
                        Accept
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setSelectedTab('Reject')}
                      style={{
                        borderWidth: 1,
                        borderColor: colors.primary,
                        backgroundColor:
                          selectedTab === 'Reject'
                            ? colors.primary
                            : colors.secondary,
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          color:
                            selectedTab === 'Reject'
                              ? colors.secondary
                              : colors.primary,
                          padding: 7,
                        }}>
                        Reject
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {statusLoading ? (
                    <ActivityIndicator
                      size={'large'}
                      color={colors.primary}
                      style={{marginTop: responsiveHeight(2)}}
                    />
                  ) : !!getProposal.length ? (
                    <FlatList
                      data={getProposal}
                      renderItem={({item}) => {
                        return (
                          <TouchableOpacity
                            style={styles.professionalProfile}
                            onPress={() =>
                              nav.navigate(ROUTES.PROPOSAL, {
                                proposalId: item?._id,
                                professionalImage: `${baseUrl}/${item?.proProfileId?.image}`,
                                professionalSimpleImage:
                                  item?.proProfileId?.image,
                                professionalName: `${item?.proProfileId?.firstName} ${item?.proProfileId?.lastName}`,
                                professionalId: item.proProfileId?._id,
                                projectId: getProjectDetails?._id,
                                projectStatus: getProjectDetails?.status,
                              })
                            }>
                            <View
                              style={{
                                flexDirection: 'row',
                                gap: 10,
                                alignItems: 'center',
                              }}>
                              <Image
                                source={{
                                  uri: `${baseUrl}/${item?.proProfileId?.image}`,
                                }}
                                style={styles.professionalImage}
                              />
                              <View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 10,
                                  }}>
                                  <Text style={styles.name}>
                                    {item?.proProfileId?.firstName || 'N/A'}{' '}
                                    {item?.proProfileId?.lastName}
                                  </Text>
                                  <SVGXml
                                    width="17"
                                    height="17"
                                    icon={svgIcons.checkmark2}
                                  />
                                </View>
                                <View style={{flexDirection: 'row', gap: 20}}>
                                  <Text style={styles.ratingText}>
                                    Rating{' '}
                                    {Number(
                                      item?.proProfileId?.avgRating,
                                    )?.toFixed(1)}
                                  </Text>
                                  <Text style={styles.ratingText}>
                                    {item?.status}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <TouchableOpacity
                              style={styles.iconWrapper}
                              onPress={() => {
                                nav.navigate(ROUTES.CHAT_MESSAGES, {
                                  professionalImage: `${baseUrl}/${item?.proProfileId?.image}`,
                                  professionalSimpleImage:
                                    item?.proProfileId?.image,
                                  professionalName: `${item?.proProfileId?.firstName} ${item?.proProfileId?.lastName}`,
                                  professionalId: item.proProfileId?._id,
                                  projectId: getProjectDetails?._id,
                                  projectStatus: getProjectDetails?.status,
                                });
                              }}>
                              <SVGXml
                                width="17"
                                height="17"
                                icon={svgIcons.professional}
                              />
                            </TouchableOpacity>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  ) : (
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#000',
                          marginTop: responsiveHeight(2),
                        }}>
                        Proposal Not Found
                      </Text>
                    </View>
                  )}
                </View>
              )}

            {isPro && getProjectDetails?.status === 'Done' && (
              <>
                <View>
                  <View style={styles.timeRow}>
                    <SVGXml icon={svgIcons.clock} />
                    <Text style={styles.time}>Posted 3 days ago</Text>
                  </View>
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
                </View>

                <View style={{paddingTop: responsiveHeight(2)}}>
                  <View style={styles.reviewRow}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}>
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

            {isPro &&
              getProjectDetails?.status !== 'Hired' &&
              rejectedProposal?.length === 0 &&
              inDiscussionData?.length === 0 && (
                <Button
                  style={{
                    marginTop: responsiveHeight(3.5),
                    width: responsiveWidth(90),
                  }}
                  onPress={() =>
                    nav.navigate(ROUTES.FILL_PROPOSAL, {
                      professionalId: userDetail?.userData?._id,
                      projectId: getProjectDetails?._id,
                    })
                  }
                  buttonText="Get Job"
                />
              )}

            {isPro && !!inDiscussionData?.length && (
              <Button
                style={{
                  marginTop: responsiveHeight(3.5),
                  width: responsiveWidth(90),
                }}
                onPress={() =>
                  nav.navigate(ROUTES.FILL_PROPOSAL, {
                    professionalId: userDetail?.userData?._id,
                    projectId: getProjectDetails?._id,
                  })
                }
                buttonText="Edit Proposal"
              />
            )}
          </View>
        </MainContainer>
      )}
    </>
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
