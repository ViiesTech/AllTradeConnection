import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { images } from '../assets/images';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils';
import svgIcons from '../assets/icons';
import { colors } from '../assets/colors';
import SVGXml from './SVGXml';

interface MapComProps {
  isShowDirection: boolean;
}

const MapCom = ({ isShowDirection }: MapComProps) => {
  return (
    <View>
        {isShowDirection && <View style={[styles.inputContainerWrapper]}>
      <View style={[styles.inputContainer, false && styles.errorInput]}>
        <SVGXml icon={svgIcons.searchInput} width={20} />
        {true &&
        <View style={styles.verticalLine} />
      }
        <TextInput
          style={[styles.input]}
          placeholder={'Search Location'}
          placeholderTextColor={colors.dark_purple}
          // value={field.value}
          // onChangeText={field.onChange(name)}
          // secureTextEntry={secureTextEntry}
          // onBlur={field.onBlur(name)}
        />
      </View>
      {false && <Text style={styles.errorText}>{'required'}</Text>}
    </View>}
    <ImageBackground source={images.map} style={styles.map}>
    {isShowDirection && <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 15}}><TouchableOpacity style={{width: 50, height: 50, justifyContent: 'center', alignItems: 'center',borderRadius: 5, backgroundColor: colors.primary}}>
        <SVGXml width={'35'} height={'35'} icon={svgIcons.gps} />
    </TouchableOpacity></View>}
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    map: {
        width: responsiveWidth(90),
        height: responsiveHeight(50),
    },
    form: {
        padding: responsiveHeight(1),
        alignItems: 'center',
      },
      inputContainerWrapper: {
        marginBottom: responsiveHeight(3.5),
        width: responsiveWidth(80),
      },
      inputContainer: {
        flexDirection: 'row',
        borderWidth: 0.1,
        borderRadius: 10,
        paddingHorizontal: responsiveHeight(2),
        backgroundColor: colors.secondary,
        borderColor: colors.black,
        alignItems: 'center',
        gap: 10,
        width: responsiveWidth(90),
        height: responsiveHeight(8)
      },
      input: {
        width: responsiveWidth(90),
        height: responsiveHeight(8),
        borderRadius: 8,
        // padding: responsiveHeight(2),
        fontSize: responsiveFontSize(2),
        color: colors.dark_purple,
      },
      errorInput: {
        borderColor: colors.red,
        borderWidth: 1,
      },
      errorText: {
        color: colors.red,
        fontSize: responsiveFontSize(1.6),
        marginTop: responsiveHeight(0.5),
        textAlign: 'left',
      },
      verticalLine: {
        height: responsiveHeight(2),
        width: responsiveWidth(0.3),
        backgroundColor: colors.dark_purple,
      },
      eyeIcon: {
        marginLeft: 8,
      },
});

export default MapCom;