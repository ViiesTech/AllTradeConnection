import { Image, StyleSheet, TouchableOpacity, View, } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import AuthHeader from '../../components/AuthHeader'
import CustomInputForm from '../../components/InputField'
import * as Yup from 'yup';
import { locationField, responsiveHeight, responsiveWidth } from '../../utils'
import { images } from '../../assets/images'
import { colors } from '../../assets/colors'
import SVGXml from '../../components/SVGXml'
import svgIcons from '../../assets/icons'

const locationValidationSchema = Yup.object().shape({
  location: Yup.string()
    .required('Location is required')
    .min(2, 'Location must be at least 2 characters long')
    .max(100, 'Location must not exceed 100 characters')
    .matches(
      /^[a-zA-Z0-9\s,.'-]+$/,
      'Location can only contain letters, numbers, and special characters (,.\'-)'
    ),
});

const AddLocation = () => {
  return (
    <Container>
      <AuthHeader contentStyle={{paddingTop: 0}} />
      <CustomInputForm inputContainerStyle={{padding: 0}} childrenStyle={{marginBottom: responsiveHeight(3)}} onSubmit={(values) => console.log(values)} buttonText='Add Now' fields={locationField} validationSchema={locationValidationSchema} initialValues={{location: ''}}>
            <Image source={images.map} style={styles.mapStyle} /> 
            <TouchableOpacity style={styles.locationCard}>
                <SVGXml icon={svgIcons.gps}  />
            </TouchableOpacity>
      </CustomInputForm>
    </Container>
  )
}

export default AddLocation

const styles = StyleSheet.create({
  mapStyle:{
    height: responsiveHeight(40),
    borderRadius: 10,
    width: responsiveWidth(80),
  },
  locationCard:{
    backgroundColor: colors.primary,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 15,
    right: 15,
    height: responsiveHeight(5),
    width: responsiveHeight(5),
    borderRadius: 5,
  }
})