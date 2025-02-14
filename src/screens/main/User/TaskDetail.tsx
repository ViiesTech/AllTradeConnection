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

  const nav = useNavigation();

  return (
    <MainContainer>
      <Header2  text='Open Project'/>
      <View style={styles.subContainer}>
        <Image style={styles.taskImage} source={images.taskdetail1} />
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingTop: responsiveHeight(1.5) }}>
          <Text style={styles.heading}>Project Name</Text>
          <TouchableOpacity style={styles.editView}>
            <SVGXml width={'20'} height={'20'} icon={svgIcons.edit} />
          </TouchableOpacity>
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center',paddingTop: responsiveHeight(2)}}>
          <View style={{flexDirection: 'row',gap: 10,alignItems: 'center'}}>
            <SVGXml icon={svgIcons.clock} />
                <Text style={styles.time}>Posted 3 days ago</Text>
                </View>
                <TouchableOpacity onPress={() => nav.navigate('SecondaryStack',{screen: ROUTES.REPORT_JOB})}>
                <Text style={styles.reportText}>Report</Text>
                </TouchableOpacity>
        </View>
        <Button style={{marginTop: responsiveHeight(4),width: responsiveWidth(90)}} buttonText='Get Job' />
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
    height: responsiveHeight(46),
    borderRadius: 10,
    width: responsiveHeight(46)
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
  desc:{
    color: colors.textColor3,
    marginTop: responsiveHeight(2.5),
    width: responsiveWidth(90),
    fontSize: responsiveFontSize(1.9)
  },
  reportText:{
    color: colors.textColor2,
    marginTop: responsiveHeight(0.5),
    fontSize: responsiveFontSize(2)
  },
  time:{
    color: colors.textColor3,
    fontSize: responsiveFontSize(1.9),
  }
})