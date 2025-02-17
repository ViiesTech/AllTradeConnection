import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../assets/colors'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils'
import StarRating from 'react-native-star-rating-widget'

interface reviewProps {
  image: ImageSourcePropType,
  name: string,
  day: string,
  desc: string,
  rating: string,
  style: ViewStyle,
}

const ReviewCard = (props: reviewProps) => {
  return (
    <TouchableOpacity style={[styles.reviewStyle,props?.style]}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Image style={styles.imageStyle} source={props?.image} />
          <View>
            <Text style={styles.name}>{props?.name}</Text>
            <Text style={styles.day}>{props?.day}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <StarRating
            rating={1}
            onChange={() => null}
            starSize={responsiveHeight(2.3)}
            maxStars={1}
          />
          <Text style={styles.ratingText}>{props?.rating}</Text>
        </View>
      </View>
      <Text style={styles.desc}>{props?.desc}</Text>
    </TouchableOpacity>
  )
}

export default ReviewCard

const styles = StyleSheet.create({
  reviewStyle: {
    borderWidth: 0.2,
    borderColor: colors.black,
    borderRadius: 10,
    width: responsiveWidth(70),
    padding: responsiveHeight(1.5),
  },
  imageStyle:{
    height: responsiveHeight(6),
    width: responsiveHeight(6),
    borderRadius: 100,
  },
  name: {
    color: colors.textColor2,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2)
  },
  day: {
    color: colors.textColor3,
    fontSize: responsiveFontSize(1.8)
  },
  ratingText: {
    color: colors.textColor2,
    fontSize: responsiveFontSize(1.8)
  },
  desc: {
    width: responsiveWidth(65),
    marginTop: responsiveHeight(1),
    color: colors.textColor3,
  }
})