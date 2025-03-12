import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import { responsiveHeight, responsiveWidth, ROUTES } from '../../../utils';
import SVGXml from '../../../components/SVGXml';
import svgIcons from '../../../assets/icons';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../assets/colors';

const filters = [
    {id: 1, title: 'Categories', subTitle: 'Plumber: Cleaning: Electrician', navScreen: ''},
    {id: 2, title: 'Location', subTitle: 'New York', navScreen: ROUTES.MY_LOCATION, param: 'applyLocation'},
    {id: 3, title: 'Skill', subTitle: 'Plumber', navScreen: ROUTES.SKILLS, param: 'skills'},
    {id: 4, title: 'Language', subTitle: 'English', navScreen: ROUTES.SKILLS, param: 'languages'},
]

const LocationFilter = () => {
        const nav = useNavigation();
  return (
    <MainContainer>
      <Header2 headerText3='' hideCancel text='Filter' subHeading={''} />

    <View>
        <FlatList 
        data={filters}
        contentContainerStyle={{gap: responsiveHeight(2)}}
        renderItem={({item}) => {
            return (
                <TouchableOpacity onPress={() => item.navScreen ? nav.navigate(item.navScreen, {screen: item.param}) : {}}>
                <View style={{marginHorizontal: responsiveWidth(5), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{gap: 5}}>
                    <Text>{item.title}</Text>
                    <Text style={{color: colors.gray}}>{item.subTitle}</Text>
                    </View>
                    <SVGXml width={'12'} height={'12'} icon={svgIcons.right_arrow} />
                </View>
                <View style={{width: '100%', height: responsiveHeight(0.2), backgroundColor: colors.line_color, marginTop: responsiveHeight(2)}} />
                </TouchableOpacity>
            )
        }}
        />
    </View>

    <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: responsiveHeight(2)}}>
        <Button style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(90) }} onPress={() => nav.navigate(ROUTES.MY_JOBS)} buttonText='Apply' />}
    </View>
    </MainContainer>
  )
}

export default LocationFilter;