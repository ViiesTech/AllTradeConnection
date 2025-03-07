import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import CustomInputForm from '../../../components/InputField';
import { listSearchField, responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES } from '../../../utils';
import * as Yup from 'yup';
import { images } from '../../../assets/images';
import { colors } from '../../../assets/colors';
import SVGXml from '../../../components/SVGXml';
import svgIcons from '../../../assets/icons';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';

const searchValidationSchema = Yup.object().shape({
  search: Yup.string()
    .trim()
    .min(1, 'Please enter at least 1 character to search.') 
    .max(200, 'cannot be longer than 200 characters.'),
});

const data = [
    {id: 1, profImg: images.logo, name: 'James Andrew', isCheck: true, subTitle: 'Florida', numOfReview: '4.9', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since.'},
    {id: 2, profImg: images.logo, name: 'James Andrew', isCheck: false, subTitle: 'Florida', numOfReview: '4.9', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since.'},
    {id: 3, profImg: images.logo, name: 'James Andrew', isCheck: false, subTitle: 'Florida', numOfReview: '4.9', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since.'},
    {id: 4, profImg: images.logo, name: 'James Andrew', isCheck: false, subTitle: 'Florida', numOfReview: '4.9', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since.'},
]

const ListOfPro = () => {
          const nav = useNavigation();
  return (
    <MainContainer>
      <Header2 headerText3='' hideCancel text='List Of Pro' subHeading={''} />

      <CustomInputForm hideButton searchIcon={true} inputContainer={{width: responsiveWidth(92)}} inputContainerStyle={{ padding: 0 }} childrenStyle={{ marginBottom: responsiveHeight(3) }} onSubmit={(values) => {}}  fields={listSearchField} validationSchema={searchValidationSchema} initialValues={{ search: 'Search' }} />

        <View style={{padding: responsiveHeight(2), paddingTop: 0}}>
            <FlatList
            ItemSeparatorComponent={() => <View style={{ height: responsiveHeight(2) }} />}
            data={data}
            renderItem={({item}) => {
                return (
                    <View style={{borderWidth: 1, borderColor: colors.line_color, borderRadius: 10, padding: 10, gap: 10}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                            <Image source={item.profImg} style={{width: 40, height: 40, borderRadius: 100}} />
                            <View style={{gap: 2}}>
                              <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                            <Text style={{fontWeight: 'bold', fontSize: responsiveFontSize(2)}}>{item.name}</Text>
                            <SVGXml width={'15'} height={'15'} icon={svgIcons.verifiedBadge} />
                              </View>
                            <Text style={{color: colors.gray}}>{item.subTitle}</Text>
                            </View>
                            </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
                                    <View style={{flexDirection: 'row', gap: 5}}>
                                    <Text>{item.numOfReview}</Text>
                                    <Text>Review</Text>
                                    </View>
                                    <TouchableOpacity style={{backgroundColor: item.isCheck ? colors.primary : colors.secondary, borderWidth: 1, borderColor: colors.primary, borderRadius: 3, width: 20, height: 18, justifyContent: 'center', alignItems: 'center'}}>
                                    <SVGXml width={'12'} height={'12'} icon={svgIcons.checkWhite} />
                                    </TouchableOpacity>
                                </View>
                        </View>
                        <View>
                          <Text style={{color: colors.gray}}>{item.desc}</Text>
                        </View>
                    </View>
                );
            }}
            />
          <Button  style={{marginTop: responsiveHeight(2), width: responsiveWidth(90)}} buttonText={'Create Now'} onPress={() => nav.navigate(ROUTES.POST_JOB, {screen: 'Edit Project'})} /> 
        </View>
    </MainContainer>
  )
}

export default ListOfPro;