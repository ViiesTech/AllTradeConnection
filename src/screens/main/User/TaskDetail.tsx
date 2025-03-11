import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MainContainer from '../../../components/MainContainer'
import Header2 from '../../../components/Header2'
import { images } from '../../../assets/images'
import { responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES, taskDetails } from '../../../utils'
import { colors } from '../../../assets/colors'
import SVGXml from '../../../components/SVGXml'
import svgIcons from '../../../assets/icons'
import Button from '../../../components/Button'
import { useNavigation } from '@react-navigation/native'
import ReviewCard from '../../../components/ReviewCard'

const TaskDetail = ({ route }) => {

  const previousData = route?.params?.type || null;
  // const previousData = 'MyJobs';
  // const status = 'Completed';
  const nav = useNavigation();

  return (
    <MainContainer>
      <Header2 onCancel={() => {
        if (previousData === 'Hired' || previousData === 'In Discussion') {
          nav.navigate(ROUTES.REPORT_JOB);
        } else if(previousData !== 'In Discussion') {
          nav.navigate(ROUTES.CONGRATULATION, {cancelJob: 'cancel job'});
        }else {
          nav.goBack();
        }
      }} headerText2={previousData === 'Hired' || previousData === 'In Discussion' ? 'Report' : 'Cancel'} text={previousData === 'Hired' ? 'Hired Tasks' : previousData === 'Done' ? 'Done Project' : previousData === 'Reject' ? 'Rejected Project' : previousData === 'In Discussion' ? 'In Discussion' : 'Open Project'} />
      <View style={styles.subContainer}>
        <Image style={styles.taskImage} source={images.taskdetail1} />
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingTop: responsiveHeight(1.5) }}>
          <Text style={styles.heading}>Project Name</Text>
          {previousData != 'Done' && previousData != 'Reject' && previousData != 'Hired' && previousData != 'In Discussion' &&
            <TouchableOpacity style={styles.editView} onPress={() => nav.navigate(ROUTES.POST_JOB, {screen: 'Edit Project'})}>
              <SVGXml width={'20'} height={'20'} icon={svgIcons.edit} />
            </TouchableOpacity>
          }
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: responsiveHeight(1.8) }}>
          <FlatList
            data={taskDetails}
            numColumns={2}
            columnWrapperStyle={{ gap: 15 }}
            contentContainerStyle={{ gap: 10 }}
            renderItem={({ item }) => {
              return (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <SVGXml icon={item.icon} />
                  <Text style={{ color: colors.black }}>{item.title}</Text>
                </View>
              )
            }}
          />
          <Text style={styles.priceText}>
            Hourly/<Text style={{ fontWeight: 'bold' }}>$455</Text>
          </Text>
        </View>
        <Text style={styles.desc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</Text>
        {previousData != 'Hired' && previousData != 'Done' && previousData != 'In Discussion' ?
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: responsiveHeight(2) }}>
            <View>
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <SVGXml icon={svgIcons.clock} />
                <Text style={styles.time}>Posted 3 days ago</Text>
              </View>
              {previousData === 'Reject' &&
              <>
            <Text style={[styles.heading,{marginTop: responsiveHeight(2)}]}>Email</Text>
            <Text style={styles.detail}>exampleemail@gmail.com</Text>
            <Text style={[styles.heading,{marginTop: responsiveHeight(2)}]}>Phone Number</Text>
            <Text style={styles.detail}>1234567890</Text>
            </>
              }
            </View>
            {previousData != 'Hired' && previousData != 'Done' && previousData != 'Reject' && previousData != 'In Discussion' &&
              <TouchableOpacity onPress={() => nav.navigate('SecondaryStack', { screen: ROUTES.REPORT_JOB })}>
                <Text style={styles.reportText}>Report</Text>
              </TouchableOpacity>
            }
          </View>
          :
          <>
            <View>
              <Text>Email</Text>
            </View>
            <TouchableOpacity style={styles.professionalProfile}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Image source={images.professional} style={styles.professionalImage} />
                <View>
                  <Text style={styles.name}>James Andrew</Text>
                  <Text style={styles.ratingText}>Rating 4.5</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.iconWrapper} onPress={() => nav.navigate(ROUTES.CHAT_MESSAGES)}>
                <SVGXml width={'17'} height={'17'} icon={svgIcons.professional} />
              </TouchableOpacity>
            </TouchableOpacity>
            {previousData === 'In Discussion' &&
              <View style={{ paddingTop: responsiveHeight(3) }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Button buttonText='Hire Now' onPress={() => nav.navigate(ROUTES.MY_JOBS)} style={{ width: responsiveWidth(42) }} />
                  <Button buttonText='Proposal' onPress={() => nav.navigate(ROUTES.PROPOSAL)} style={{ width: responsiveWidth(42) }} />
                </View>
                <Button gradient onPress={() => nav.navigate(ROUTES.CONGRATULATION, {reject: 'reject'})} style={{ marginTop: responsiveHeight(2), width: responsiveWidth(90), backgroundColor: colors.red2 }} buttonText='Reject' />
              </View>
            }
            {previousData === 'Done' &&
              <ReviewCard style={{ marginTop: responsiveHeight(2.5), width: responsiveWidth(89) }} image={images.review1} name={'James Andrew'} rating={'5.0'} day={'1 day ago'} desc={'Many thanks to james he is professional, Cleaner..'} />}
            {/* {status === 'Completed' &&
            <Text style={styles.statusText}>Professional complete the job</Text>
          } */}
              {previousData === 'Done' &&
                <Button onPress={() => nav.navigate(ROUTES.GIVE_REVIEW)} style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(90) }} buttonText='Give Review' />}
}
            {previousData === 'Hired' &&
              <Button style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(90) }} onPress={() => nav.navigate(ROUTES.PAYMENT_METHODS)} buttonText='Pay Now' />}
          </>
        }

        {previousData !== 'In Discussion' && <View style={{marginTop: responsiveHeight(2)}}>
          <Text style={styles.applyTxt}>Apply For This Job</Text>

          <TouchableOpacity style={styles.professionalProfile}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Image source={images.professional} style={styles.professionalImage} />
                <View>
                  <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Text style={styles.name}>James Andrew</Text>
                  <SVGXml width={'17'} height={'17'} icon={svgIcons.checkmark2} />
                  </View>
                  <View style={{flexDirection: 'row', gap: 20}}>
                  <Text style={styles.ratingText}>Rating 4.5</Text>
                  <Text style={styles.ratingText}>Waiting</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.iconWrapper} onPress={() => nav.navigate(ROUTES.CHAT_MESSAGES)}>
                <SVGXml width={'17'} height={'17'} icon={svgIcons.professional} />
              </TouchableOpacity>
            </TouchableOpacity>
        </View>}
      </View>
    </MainContainer>
  )
}

export default TaskDetail;

const styles = StyleSheet.create({
  subContainer: {
    padding: responsiveHeight(2.5),
  },
  taskImage: {
    height: responsiveHeight(44),
    alignSelf: 'center',
    borderRadius: 10,
    width: responsiveHeight(44)
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
    fontSize: responsiveFontSize(1.9)
  },
  reportText: {
    color: colors.textColor2,
    marginTop: responsiveHeight(0.5),
    fontSize: responsiveFontSize(2)
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
    shadowColor: "#000",
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
    marginTop: responsiveHeight(1)
  }
});