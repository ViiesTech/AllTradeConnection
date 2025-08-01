import {Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container';
import SelectOption from '../../components/SelectOption';
import AuthHeader from '../../components/AuthHeader';
import {
  AllExperiences,
  responsiveHeight,
  responsiveWidth,
  ROUTES,
} from '../../utils';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectExperience = () => {
  const [chooseExperience, setChooseExperience] = useState<string>('User');
  const nav = useNavigation();

  const onClickHandler = async () => {
    // await AsyncStorage.setItem('type', chooseExperience)
    //   .then(res => {
    //     nav.navigate(ROUTES.LOGIN, {type: chooseExperience === 'Pro' ? 'Professional' : "User"});
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    nav.navigate(ROUTES.SIGNUP, {
      type: chooseExperience === 'Pro' ? 'Professional' : 'User',
    });
  };

  return (
    <Container>
      <AuthHeader text="Select Experience" showBack={true} />
      <View style={{alignItems: 'center'}}>
        <View style={styles.wrapper}>
          {AllExperiences.map(item => {
            return (
              <SelectOption
                text={item.text}
                image={item.image}
                active={chooseExperience}
                onClick={() => setChooseExperience(item.text)}
              />
            );
          })}
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <Button onPress={() => onClickHandler()} buttonText="Continue" />
      </View>
    </Container>
  );
};

export default SelectExperience;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 20,
  },
  buttonWrapper: {
    justifyContent: 'flex-end',
    flex: 0.9,
  },
  imageStyle: {
    backgroundColor: 'red',
    bottom: 0,
    width: responsiveWidth(100),
    height: responsiveHeight(30),
  },
});
