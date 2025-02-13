import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator} from '@react-navigation/drawer';
import { drawerItems, responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES } from '../utils';
import { useNavigation } from '@react-navigation/native';
import { images } from '../assets/images';
import { colors } from '../assets/colors';
import SVGXml from '../components/SVGXml';
import svgIcons from '../assets/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TermsConditions from '../screens/main/User/TermsConditions';
import PrivacyPolicy from '../screens/main/User/PrivacyPolicy';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/main/User/Home';
import Project from '../screens/main/User/Project';
import Profile from '../screens/main/User/Profile';
import Message from '../screens/main/User/Message';
import TaskDetail from '../screens/main/User/TaskDetail';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomTabIcon = ({ icon, activeIcon, focused }) => {
  return (
    <View style={styles.tabContainer}>
      {focused && <View style={styles.activeIndicator} />}
      <SVGXml icon={focused ? activeIcon : icon} />
    </View>
  );
};

const BottomStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          elevation: 0,
          right: 0,
          borderTopWidth: 1,
          paddingTop: responsiveHeight(2),
          height: responsiveHeight(10),
          backgroundColor: colors.secondary,
        },
      }}>
      <Tab.Screen
        name={ROUTES.HOME}
        component={Home}
        options={{
          tabBarIcon: ({focused}) =>
            <CustomTabIcon 
            icon={svgIcons.home} 
            activeIcon={svgIcons.house_active} 
            focused={focused} 
        />
          }}
      />
      <Tab.Screen
        name={ROUTES.PROJECT}
        component={Project}
        options={{
          tabBarIcon: ({focused}) =>
            <CustomTabIcon 
            icon={svgIcons.project} 
            activeIcon={svgIcons.project_active} 
            focused={focused} 
        />
          }}
      />
      <Tab.Screen
        name={ROUTES.MESSAGE}
        component={Message}
        options={{
          tabBarIcon: ({focused}) =>
            <CustomTabIcon 
            icon={svgIcons.message} 
            activeIcon={svgIcons.message_active} 
            focused={focused} 
        />
          }}
      />
      <Tab.Screen
        name={ROUTES.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({focused}) =>
            <CustomTabIcon 
          icon={svgIcons.profile} 
          activeIcon={svgIcons.profile_active} 
          focused={focused} 
      />
          }}
      />
    </Tab.Navigator>
  );
};

// const MerchandiseStack = () => {
//   return (
//     <Stack.Navigator
//     screenOptions={{
//         headerShown: false,
//       }}>
//       <Tab.Screen name="FreeStuff" component={FreeStuff} />
//       <Tab.Screen name="MerchandiseDetails" component={MerchandiseDetails} />
//     </Stack.Navigator>
//   );
// };


const SecondaryStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={ROUTES.TASK_DETAIL} component={TaskDetail} />
      <Stack.Screen name={ROUTES.TERMS_CONDITIONS} component={TermsConditions} />
      <Stack.Screen name={ROUTES.PRIVACY_POLICY} component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};


const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomStack" component={BottomStack} />
      <Stack.Screen name="SecondaryStack" component={SecondaryStack} />
    </Stack.Navigator>
  );
};



const DrawerStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: responsiveWidth(100) }
      }}
      drawerContent={props => {
        return <CustomDrawerContent {...props} />
      }}
    >
      <Drawer.Screen name="UserStack" component={MainStack} />
    </Drawer.Navigator>
  );
}



const CustomDrawerContent = () => {


  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainContainer}>
      <View style={styles.profileContainer}>
        <Image style={styles.profileStyle} source={images.profile} />
        <View style={{ paddingTop: responsiveHeight(2), alignItems: 'center' }}>
          <Text style={styles.name}>John Smith</Text>
          <Text style={styles.email}>john.smith@domain.com</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
      {drawerItems.map((item) => {
                    return (
                       <TouchableOpacity onPress={() => {
                            if(!item.navTo) {
                                  alert('working in progress')
                            } else {
                              navigation.navigate('SecondaryStack',{screen: item.navTo});
                            }
                       }} style={{flexDirection: 'row', justifyContent: 'space-between',marginBottom: responsiveHeight(3)}}>
                        <View style={{flexDirection: 'row',alignItems: 'center',gap: 20}}>
                            <SVGXml icon={item.icon} />
                            <Text style={[styles.labelStyle,item.id == 10 ? {fontWeight: 'bold',color: colors.red} : {color: colors.textColor2}]}>{item.title}</Text>
                            </View>
                            <SVGXml icon={item.id == 10 ? svgIcons.arrow_red : svgIcons.arrow} />
                            </TouchableOpacity>
                    )
                })}
      </View>
    </ScrollView>
  );
}




export default DrawerStack;

const styles = StyleSheet.create({
  mainContainer: {
    paddingBottom: responsiveHeight(10),
  },
  profileContainer: {
    alignItems: 'center',
    paddingTop: responsiveHeight(8)
  },
  profileStyle: {
    height: responsiveHeight(18),
    width: responsiveHeight(18)
  },
  name: {
    color: colors.textColor2,
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
  },
  email: {
    color: colors.textColor2,
    fontSize: responsiveFontSize(2)
  },
  listContainer: {
    alignSelf: 'center',
    borderRadius: 10,
    padding: responsiveHeight(2),
    width: responsiveWidth(90),
    marginTop: responsiveHeight(3.5),
    backgroundColor: colors.secondary,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 10,
  },
  labelStyle:{
    fontSize: responsiveFontSize(2.2),
  },
  iconView: {
    backgroundColor: '#373636',
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
  },
  tabContainer: {
    alignItems: 'center',
  },
  activeIndicator: {
    height: 3,
    position: 'absolute',
    width: responsiveWidth(25),
    bottom: responsiveHeight(6.4),
    backgroundColor: colors.primary,
  },
})