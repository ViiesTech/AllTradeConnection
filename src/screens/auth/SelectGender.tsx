import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Container from '../../components/Container'
import AuthHeader from '../../components/AuthHeader'
import SelectOption from '../../components/SelectOption'
import { Genders, ROUTES } from '../../utils'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'

const SelectGender = () => {
  const [activeGender, setActiveGender] = useState<string>('Male')

  const nav = useNavigation()

  return (
    <Container>
      <AuthHeader text='Select Gender' />
      <View style={styles.wrapper}>
        <View style={styles.genderWrapper}>
          {Genders.map((item) => (
            <SelectOption image={item.image} text={item.text} active={activeGender} onClick={() => setActiveGender(item.text)} />
          ))}
        </View>
      </View>
     <View style={styles.buttonWrapper}> 
      <Button onPress={() => nav.navigate(ROUTES.ADD_LOCATION)} buttonText='Continue' />
      </View>
    </Container>
  )
}

export default SelectGender

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center'
  },
  genderWrapper: {
    flexDirection: 'row',
    gap: 20
  },
  buttonWrapper:{
    justifyContent: 'flex-end',
    flex: 0.9
  }
})