import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MainContainer from '../../../components/MainContainer'
import Header from '../../../components/Header'
import { responsiveFontSize, responsiveHeight, responsiveWidth, reviews, ROUTES } from '../../../utils'
import { images } from '../../../assets/images'
import SVGXml from '../../../components/SVGXml'
import svgIcons from '../../../assets/icons'
import { colors } from '../../../assets/colors'
import ProfileCard from '../../../components/ProfileCard'
import ReviewCard from '../../../components/ReviewCard'
import StarRating from 'react-native-star-rating-widget'
import { useNavigation } from '@react-navigation/native'

const certificates = [
    {id: 1, certicateImg: images.certi1},
    {id: 2, certicateImg: images.certi2},
    {id: 3, certicateImg: images.certi3},
    {id: 4, certicateImg: images.certi4},
]

const Profile = () => {
  const nav = useNavigation();

  const renderReviews = () => {

    const renderItem = ({ item }) => {
      return (
        <ReviewCard day={item.days} image={item.image} name={item.name} rating={item.rating} desc={item.desc} />
      )
    }



    return (
      <View style={{ paddingTop: responsiveHeight(2) }}>
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text style={styles.reviewHeading}>Reviews</Text>
            <StarRating
              rating={1}
              onChange={() => null}
              starSize={responsiveHeight(2.3)}
              maxStars={1}
            />
            <Text style={styles.ratingText}>4.9 (124)</Text>
          </View>
          <TouchableOpacity onPress={() => nav.navigate(ROUTES.SEE_ALL_REVIEWS)}>
            <Text style={[styles.ratingText, { textDecorationLine: 'underline' }]}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList style={{marginHorizontal: -responsiveHeight(3)}} showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 20, paddingHorizontal: responsiveHeight(3), paddingTop: responsiveHeight(2) }} data={reviews} renderItem={renderItem} />
      </View>
    )
  }

  return (
    <MainContainer style={{paddingBottom: responsiveHeight(12)}}>
      <Header hideNotification showEdit />
      <View style={styles.subContainer}>
        <View>
          <Image style={styles.profileStyle} source={images.profile} />
          <TouchableOpacity style={styles.downloadView}>
            <SVGXml width={'14'} height={'14'} icon={svgIcons.download} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', paddingTop: responsiveHeight(3) }}>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <Text style={styles.name}>John Smith</Text>
            <SVGXml width={'18'} height={'18'} icon={svgIcons.checkmark2} />
          </View>
          <Text style={styles.detail}>john.smith@domain.com</Text>
          <Text style={styles.detail}>Los angles, California</Text>
          <Text style={styles.detail}>Phone: 123456749</Text>
        </View>
        <Text style={styles.desc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: responsiveHeight(3) }}>
          <ProfileCard text='Total Project' text2='100+' />
          <ProfileCard icon text='Email Address' />
        </View>
        {renderReviews()}

        <View style={{marginTop: responsiveHeight(2)}}>
        <Text style={styles.reviewHeading}>Certificates</Text>

        <FlatList 
          data={certificates}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{gap: 20, marginTop: responsiveHeight(2)}}
          renderItem={({item}) => {
            return (
              <View>
                <Image source={item.certicateImg} style={{width: responsiveWidth(20), height: responsiveHeight(8)}} />
              </View>
            )
          }}
          />
        </View>
      </View>
    </MainContainer>
  )
}

export default Profile;

const styles = StyleSheet.create({
  subContainer: {
    padding: responsiveHeight(2),
  },
  profileStyle: {
    height: responsiveHeight(15),
    alignSelf: 'center',
    width: responsiveHeight(15),
  },
  downloadView: {
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(4.5),
    width: responsiveHeight(4.5),
    borderRadius: 100,
    right: responsiveHeight(13),
    bottom: -responsiveHeight(2),
    // alignSelf: 'center',
    position: 'absolute',
  },
  name: {
    color: colors.textColor2,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.5)
  },
  detail: {
    color: colors.black,
    fontSize: responsiveFontSize(1.7),
  },
  desc: {
    color: colors.textColor3,
    textAlign: 'center',
    width: responsiveWidth(90),
    fontSize: responsiveFontSize(1.7),
    marginTop: responsiveHeight(4)
  },
  reviewHeading: {
    color: colors.textColor2,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.5)
  },
  ratingText: {
    color: colors.textColor2,
    fontSize: responsiveFontSize(2)
  }
})