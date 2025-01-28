import { Image, StyleSheet, TouchableOpacity, View, } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import AuthHeader from '../../components/AuthHeader'
import CustomInputForm from '../../components/InputField'
import * as Yup from 'yup';
import { locationData, locationField, responsiveHeight, responsiveWidth, ROUTES } from '../../utils'
import { images } from '../../assets/images'
import { colors } from '../../assets/colors'
import SVGXml from '../../components/SVGXml'
import svgIcons from '../../assets/icons'
import LocationCard from '../../components/LocationCard'
import { useNavigation } from '@react-navigation/native'

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

  const nav = useNavigation()

  const onSaveLocation = (values: string) => {
    nav.navigate(ROUTES.AUTH_INTRO)
  }

  return (
    <Container style={{ paddingBottom: responsiveHeight(2.5) }} >
      <AuthHeader contentStyle={{ paddingTop: 0 }} />
      <CustomInputForm inputContainerStyle={{ padding: 0 }} childrenStyle={{ marginBottom: responsiveHeight(3) }} onSubmit={(values) => onSaveLocation(values)} buttonText='Add Now' fields={locationField} validationSchema={locationValidationSchema} initialValues={{ location: 'Search Location' }}>
        <View>
          <Image source={images.map} style={styles.mapStyle} />
          <TouchableOpacity style={styles.locationCard}>
            <SVGXml icon={svgIcons.gps} />
          </TouchableOpacity>
        </View>
        {locationData.map((item) => (
          <LocationCard cardStyle={{ marginTop: responsiveHeight(2), marginBottom: responsiveHeight(2) }} text={item.text} heading={item.heading} />
        ))}
      </CustomInputForm>
    </Container>
  )
}

export default AddLocation

const styles = StyleSheet.create({
  mapStyle: {
    height: responsiveHeight(40),
    borderRadius: 10,
    width: responsiveWidth(80),
  },
  locationCard: {
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