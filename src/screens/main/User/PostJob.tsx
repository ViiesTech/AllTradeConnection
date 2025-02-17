import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MainContainer from '../../../components/MainContainer'
import Header2 from '../../../components/Header2'
import { postJobFields, PostJobImages, responsiveFontSize, responsiveHeight, responsiveWidth } from '../../../utils'
import { colors } from '../../../assets/colors'
import SVGXml from '../../../components/SVGXml'
import svgIcons from '../../../assets/icons'
import CustomInputForm from '../../../components/InputField'
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  fullname: Yup.string()
  .min(2, "Full name must be at least 2 characters")
  .max(50, "Full name must not exceed 50 characters")
  .required('Full name is required'), 
  email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  number: Yup.string()
  .matches(/^\d+$/, "Contact number must contain only digits")
  .min(10, "Contact number must be at least 10 digits")
  .max(15, "Contact number must not exceed 15 digits")
  .required('Phone number is required'),
});

const PostJob = () => {
  return (
    <MainContainer>
      <Header2 headerText3='Who Are You' hideCancel text='Post A Job' subHeading />
      <View style={styles.subContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {PostJobImages.map((item) => (
           <View>
          <Image resizeMode='contain' style={styles.imageStyle} source={item.image} />
          <TouchableOpacity style={styles.crossView}>
              <SVGXml width={'40'} height={'40'} icon={svgIcons.cross} />
          </TouchableOpacity>
          </View>
         ))} 
        </View>
        <TouchableOpacity style={styles.uploadView}>
              <SVGXml width={'35'} height={'35'} icon={svgIcons.upload2} />
              <Text style={styles.uploadText}>Upload Your File</Text>
        </TouchableOpacity>
        <CustomInputForm inputContainer={{width: responsiveWidth(90)}} inputContainerStyle={{marginTop: responsiveHeight(3)}} onSubmit={(values) => {}} initialValues={{fullname: 'Name',email: 'loremipsum@gmail.com', number: '02302402910'}} validationSchema={validationSchema} buttonText='Next' fields={postJobFields} />

      </View>
    </MainContainer>
  )
}

export default PostJob

const styles = StyleSheet.create({
  subContainer:{
    padding: responsiveHeight(2.5)
  },
  imageStyle:{
    height: responsiveHeight(16),
    borderRadius: 10,
    width: responsiveWidth(42)
  },
  uploadView:{
    borderWidth: 1,
    borderStyle: 'dashed',
    marginTop: responsiveHeight(3),
    borderColor: colors.black,
    paddingVertical: responsiveHeight(4.5),
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  uploadText:{
    color: colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(0.2)
  },
  crossView:{
    backgroundColor: colors.primary,
    height: responsiveHeight(4),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: responsiveHeight(14.5),
    top: 10,
    width: responsiveHeight(4),
    borderRadius: 100,
  }
})