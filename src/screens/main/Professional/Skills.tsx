/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
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
import {useNavigation} from '@react-navigation/native';
import {getAllServices} from '../../../GlobalFunctions/auth';
import Toast from 'react-native-toast-message';

const skillData = [
  {id: 1, title: 'Plumber', isChecked: true},
  {id: 2, title: 'Electrician', isChecked: false},
  {id: 3, title: 'Wall Repairs', isChecked: false},
  {id: 4, title: 'Appliance', isChecked: false},
  {id: 5, title: 'Cleaning', isChecked: true},
  {id: 6, title: 'Locksmith', isChecked: false},
  {id: 7, title: 'Appliance', isChecked: false},
  {id: 8, title: 'Cleaning', isChecked: false},
  {id: 9, title: 'Locksmith', isChecked: false},
  {id: 10, title: 'Plumber', isChecked: true},
  {id: 11, title: 'Electrician', isChecked: false},
  {id: 12, title: 'Wall Repairs', isChecked: false},
];

const languagesData = [
  {id: 1, name: 'Spanish', isChecked: true},
  {id: 2, name: 'English', isChecked: false},
  {id: 3, name: 'Arabic', isChecked: false},
  {id: 4, name: 'German', isChecked: false},
  {id: 6, name: 'Javanese', isChecked: false},
  {id: 7, name: 'Korean', isChecked: false},
  {id: 8, name: 'Italian', isChecked: false},
  {id: 9, name: 'Turkish', isChecked: false},
  {id: 10, name: 'French', isChecked: false},
];

const Skills = ({route}) => {
  const nav = useNavigation();
  const screen = route?.params?.screen;
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [languagesList, setLanguagesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllCategories = async () => {
    setIsLoading(true);
    const res = await getAllServices();

    if (res?.success) {
      setServices(res?.data);
      setIsLoading(false);
    } else {
      setServices([]);
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch services',
        text2: res?.message,
      });
    }
  };

  const handleSkillsApplyHandler = () => {
    nav.navigate(ROUTES.LOCATION_FILTER, {skillsData: selectedServices});
  };

  const handleSelect = item => {
    setSelectedServices(prev => {
      const alreadySelected = prev.find(s => s._id === item._id);
      if (alreadySelected) {
        // Remove from selected
        return prev.filter(s => s._id !== item._id);
      } else {
        // Add to selected
        return [...prev, item];
      }
    });
  };

  useEffect(() => {
    getAllCategories();
  }, [route?.params]);

  return (
    <MainContainer>
      <Header2
        headerText3=""
        hideCancel
        text={screen === 'skills' ? 'Skill' : 'Language'}
        subHeading={''}
      />

      {isLoading ? (
        <ActivityIndicator size={'large'} color={colors.primary} />
      ) : (
        <View style={{marginHorizontal: responsiveWidth(5)}}>
          <FlatList
            data={screen === 'skills' ? services : languagesData}
            contentContainerStyle={{
              flexDirection: 'row',
              gap: 10,
              flexWrap: 'wrap',
            }}
            renderItem={({item}) => {
              const isSelected = selectedServices.some(s => s._id === item._id); // ✅ Check if selected
              return (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  style={{
                    padding:
                      screen === 'skills'
                        ? responsiveWidth(4.1)
                        : responsiveWidth(3.8),
                    paddingHorizontal:
                      screen === 'skills'
                        ? responsiveWidth(4.1)
                        : responsiveWidth(6.1),
                    borderRadius: 12,
                    backgroundColor: isSelected
                      ? colors.primary
                      : colors.secondary,
                    borderWidth: isSelected ? 0 : 1,
                    borderColor: colors.gray,
                  }}>
                  <Text
                    style={{
                      color: isSelected ? colors.secondary : colors.gray,
                      fontSize: responsiveFontSize(2),
                    }}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: responsiveHeight(2),
        }}>
        <Button
          style={{marginTop: responsiveHeight(3.5), width: responsiveWidth(90)}}
          onPress={() => handleSkillsApplyHandler()}
          buttonText="Apply"
        />
      </View>
    </MainContainer>
  );
};

export default Skills;
