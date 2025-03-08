import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import { images } from '../../../assets/images';
import { responsiveFontSize, responsiveHeight, ROUTES } from '../../../utils';
import SVGXml from '../../../components/SVGXml';
import svgIcons from '../../../assets/icons';
import Example  from '../../../components/ChatCom';
import { useNavigation } from '@react-navigation/native';

const ChatMessages = () => {
    const nav = useNavigation()
  return (
    <MainContainer style={{flex: 1}}>
        <View style={{marginTop: responsiveHeight(1), padding: responsiveHeight(2)}}>
            <View style={{flexDirection: 'row', gap: 30, alignItems: 'center'}}>
                <TouchableOpacity onPress={() => nav.goBack()}>
                <SVGXml width={'20'} height={'20'} icon={svgIcons.back_arrow} />
                </TouchableOpacity>

            <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
                <View style={{borderWidth: 3, width:55, height: 55, justifyContent: 'center', alignItems: 'center', borderColor: '#D4D4D4', borderRadius: 100}}>
            <Image source={images.profile} style={{width: 47, height: 47, borderRadius: 100}} />
                </View>
                    <Text style={{fontSize: responsiveFontSize(2)}}>Lord Justin</Text>
            </View>
            </View>
        </View>
            <Example />
    </MainContainer>
  )
}

export default ChatMessages;