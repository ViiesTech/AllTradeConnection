/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ROUTES,
} from '../../../utils';
import {colors} from '../../../assets/colors';
import Button from '../../../components/Button';
import SVGXml from '../../../components/SVGXml';
import svgIcons from '../../../assets/icons';
import MapCom from '../../../components/MapCom';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {getAllLocations} from '../../../GlobalFunctions/userMain';

const PostLocationJob = ({route}) => {
  const nav = useNavigation();
  const params = route?.params?.data;
  const userDetail = useSelector((state: RootState) => state.user);
  const [allLocations, setAllLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const data = {
    data: params,
    lat: 66.160507,
    long: -153.369141,
  };

  const getAllLocationsByProject = async token => {
    setIsLoading(true);
    const res = await getAllLocations({token: token});
    if (res?.success) {
      setAllLocations(res?.data);
      setIsLoading(false);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch projects',
        text2: res?.message,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllLocationsByProject(userDetail?.token);
  }, [params, userDetail]);

  console.log(allLocations);
  return (
    <MainContainer style={{backgroundColor: 'white'}}>
      <Header2
        headerText3=""
        hideCancel
        text="Post A Job"
        subHeading={'Enter Your Location'}
      />

      <View style={styles.subContainer}>
        <MapCom isShowDirection={false} />

        {isLoading ? (
          <ActivityIndicator size={'large'} color={colors.primary} />
        ) : (
          <FlatList
            data={allLocations}
            ItemSeparatorComponent={() => (
              <View style={{height: responsiveHeight(3)}} />
            )}
            ListFooterComponent={
              <View style={{paddingTop: responsiveHeight(2)}}>
                <TouchableOpacity
                  onPress={() =>
                    nav.navigate(ROUTES.MY_LOCATION, {data: data})
                  }>
                  <Text
                    style={{
                      color: colors.gray,
                      textDecorationLine: 'underline',
                      fontWeight: 'bold',
                    }}>
                    {'Add New Location'}
                  </Text>
                </TouchableOpacity>
              </View>
            }
            renderItem={({item}) => {
              const data = {
                data: params,
                lat: item.latitude,
                long: item.longitude,
              };
              return (
                <TouchableOpacity
                  onPress={() => nav.navigate(ROUTES.MY_LOCATION, {data})}>
                  {item.address && (
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: responsiveWidth(5),
                        paddingVertical: responsiveHeight(1.5),
                        borderWidth: 1,
                        borderColor: colors.line_color,
                        borderRadius: 8,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 15,
                        }}>
                        <SVGXml
                          width={'17'}
                          height={'17'}
                          icon={
                            item?.isSelected
                              ? svgIcons.rounded_border_with_bg
                              : svgIcons.rounded_border
                          }
                        />
                        <View>
                          <Text
                            style={{
                              fontSize: responsiveFontSize(2),
                              fontWeight: 'bold',
                            }}>
                            {item.address}
                          </Text>
                          <Text>{item.locationName}</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 5,
                          backgroundColor: colors.primary,
                        }}>
                        <SVGXml
                          width={'17'}
                          height={'17'}
                          icon={svgIcons.edit}
                        />
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        )}

        <Button
          style={{marginTop: responsiveHeight(2), width: responsiveWidth(90)}}
          buttonText={'Confirm Location'}
          onPress={() => nav.navigate(ROUTES.MY_LOCATION, {data: data})}
        />
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    paddingTop: 0,
    padding: responsiveHeight(2.5),
  },
});

export default PostLocationJob;
