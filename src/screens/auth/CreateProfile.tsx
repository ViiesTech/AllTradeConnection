import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import AuthHeader from '../../components/AuthHeader'
import { images } from '../../assets/images'
import { createProfileFields, responsiveHeight, responsiveWidth, ROUTES } from '../../utils'
import { colors } from '../../assets/colors'
import SVGXml from '../../components/SVGXml'
import svgIcons from '../../assets/icons'
import CustomInputForm from '../../components/InputField'
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native'

const validationSchema = Yup.object().shape({
  fullname: Yup.string()
  .min(2, "Full name must be at least 2 characters")
  .max(50, "Full name must not exceed 50 characters")
  .notRequired(), 
  number: Yup.string()
  .matches(/^\d+$/, "Contact number must contain only digits")
  .min(10, "Contact number must be at least 10 digits")
  .max(15, "Contact number must not exceed 15 digits")
  .notRequired(),
  bio: Yup.string()
  .max(200, "Bio must not exceed 200 characters")
  .notRequired(),
})

const CreateProfile = () => {
  const nav = useNavigation()

  return (
      <Container>
        <AuthHeader text='Create Profile' desc='Please enter your details' />
        <View style={styles.imageWrapper}>
          <View>
              <Image source={images.exp1} style={styles.imageStyle} /> 
              <TouchableOpacity style={styles.uploadView}>
                  <SVGXml icon={svgIcons.upload} width={'11'} />
              </TouchableOpacity>
              </View>
        </View>
        <CustomInputForm inputContainerStyle={{marginTop: responsiveHeight(3)}} onSubmit={(values) => nav.navigate(ROUTES.SELECT_GENDER)} initialValues={{fullname: '',number: '',bio: ''}} validationSchema={validationSchema} buttonText='Continue' fields={createProfileFields} />
      </Container>
  )
}

export default CreateProfile

const styles = StyleSheet.create({
  imageWrapper:{
    alignItems: 'center',
    paddingTop: responsiveHeight(3),
  },
  imageStyle:{
    height: responsiveHeight(11),
    width: responsiveWidth(17)
  },
  uploadView:{
    borderWidth: 1,
    height: responsiveHeight(4),
    width: responsiveHeight(4),
    position: 'absolute',
    backgroundColor: colors.secondary,
    bottom: responsiveHeight(-1),
    left: responsiveHeight(3.5),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.dark_purple
  }
})