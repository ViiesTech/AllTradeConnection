import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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

const TaskDetail = () => {

  const previousData = 'MyJobs';
  // const status = 'Completed';
  const nav = useNavigation();

  return (
    <MainContainer>
      <Header2 onCancel={() => {
        if (previousData === 'MyJobs') {
          nav.navigate(ROUTES.REPORT_JOB);
        } else {
          nav.goBack();
        }
      }} headerText2={previousData === 'MyJobs' ? 'Report' : 'Cancel'} text={previousData === 'MyJobs' ? 'Hired Tasks' : 'Open Project'} />
      <View style={styles.subContainer}>
        <Image style={styles.taskImage} source={images.taskdetail1} />
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingTop: responsiveHeight(1.5) }}>
          <Text style={styles.heading}>Project Name</Text>
          {/* <TouchableOpacity style={styles.editView}>
            <SVGXml width={'20'} height={'20'} icon={svgIcons.edit} />
          </TouchableOpacity> */}
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
        {previousData != 'MyJobs' ?
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: responsiveHeight(2) }}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <SVGXml icon={svgIcons.clock} />
              <Text style={styles.time}>Posted 3 days ago</Text>
            </View>
            <TouchableOpacity onPress={() => nav.navigate('SecondaryStack', { screen: ROUTES.REPORT_JOB })}>
              <Text style={styles.reportText}>Report</Text>
            </TouchableOpacity>
          </View>
          :
          <>
            <TouchableOpacity style={styles.professionalProfile}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Image source={images.professional} style={styles.professionalImage} />
                <View>
                  <Text style={styles.name}>James Andrew</Text>
                  <Text style={styles.ratingText}>Rating 4.5</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.iconWrapper}>
                <SVGXml width={'17'} height={'17'} icon={svgIcons.professional} />
              </TouchableOpacity>
            </TouchableOpacity>
           {/* {status === 'Completed' &&
            <Text style={styles.statusText}>Professional complete the job</Text>
          } */}
            <Button style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(90) }} buttonText='Pay Now' />
          </>
        }
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
  statusText:{
    color: colors.black,
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    marginTop: responsiveHeight(3),
  }
});