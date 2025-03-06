import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import { responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES } from '../../../utils';
import { images } from '../../../assets/images';
import CheckBoxText from '../../../components/CheckBoxText';
import { colors } from '../../../assets/colors';
import Button from '../../../components/Button';
import SVGXml from '../../../components/SVGXml';
import svgIcons from '../../../assets/icons';
import MapCom from '../../../components/MapCom';
import { useNavigation } from '@react-navigation/native';

const data = [
    {id: 1, title: 'Sweet Home', subTitle: 'Street no 456 Greenvale'},
    {id: 2, title: 'Office', subTitle: 'Street no 456 Greenvale'},
    {id: 3, title: 'Add New Location',},
]

const PostLocationJob = () => {
        const nav = useNavigation();

  return (
    <MainContainer style={{backgroundColor: 'white',}}>
      <Header2 headerText3='' hideCancel text='Post A Job' subHeading={'Enter Your Location'} />

        <View style={styles.subContainer}>
            <MapCom isShowDirection={false} />

            <FlatList
            data={data}
            ItemSeparatorComponent={() => <View style={{ height: responsiveHeight(3) }} />}
            renderItem={({item}) => {
                return (
                    <View>
                       {item.subTitle && <View style={{flexDirection: 'row', paddingHorizontal: responsiveWidth(5), paddingVertical: responsiveHeight(1.5), borderWidth: 1, borderColor: colors.line_color, borderRadius: 8, justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
                        <SVGXml width={'17'} height={'17'} icon={item.id === 1 ? svgIcons.rounded_border_with_bg : svgIcons.rounded_border} />
                        <View>
                        <Text style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>{item.title}</Text>
                        <Text>{item.subTitle}</Text>
                        </View>
                        </View>
                        <View style={{width: 30, height: 30, justifyContent: 'center', alignItems: 'center',borderRadius: 5, backgroundColor: colors.primary}}>
                          <SVGXml width={'17'} height={'17'} icon={svgIcons.edit} />
                        </View>
                        </View>}

                       {!item.subTitle && <TouchableOpacity><Text style={{color: colors.gray, textDecorationLine: 'underline', fontWeight: 'bold'}}>{item.title}</Text> </TouchableOpacity>}
                    </View>
                )
            }}
            />

          <Button  style={{marginTop: responsiveHeight(2), width: responsiveWidth(90)}} buttonText={'Confirm Location'} onPress={() => nav.navigate(ROUTES.MY_LOCATION)} />
        </View>
      </MainContainer>
  );
}

const styles = StyleSheet.create({
    subContainer: {
        paddingTop: 0,
        padding: responsiveHeight(2.5),
    },
})

export default PostLocationJob;