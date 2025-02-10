import {Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { responsiveHeight, ROUTES } from '../utils';
import Home from '../screens/main/User/Home';
import Project from '../screens/main/User/Project';
import Home2 from '../screens/main/User/Home2';
import Profile from '../screens/main/User/Profile';
import SVGXml from '../components/SVGXml';
import svgIcons from '../assets/icons';


const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

const UserStack = () => {
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
          // paddingBottom: responsiveHeight(4),
          height: responsiveHeight(10),
          backgroundColor: 'transparent',
        },
        // tabBarItemStyle: {
        //   justifyContent: 'center',
        //   alignItems: 'center',
        // },
      }}>
      <Tab.Screen
        name={ROUTES.HOME}
        component={Home}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <>
              </>
              // <View style={styles.iconView}>
              // </View>
            ) : (
              <SVGXml icon={svgIcons.home} />

              // <SVGImage image={icons.home_inactive} />
            ),
          }}
      />
      <Tab.Screen
        name={ROUTES.PROJECT}
        component={Project}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <>
              </>
              // <View style={styles.iconView}>
              // </View>
            ) : (
              <SVGXml icon={svgIcons.project} />

              // <SVGImage image={icons.home_inactive} />
            ),
          }}
      />
      <Tab.Screen
        name={ROUTES.HOME2}
        component={Home2}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <>
              </>
              // <View style={styles.iconView}>
              // </View>
            ) : (
              <SVGXml icon={svgIcons.message} />

              // <SVGImage image={icons.home_inactive} />
            ),
          }}
      />
      <Tab.Screen
        name={ROUTES.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <>
              </>
              // <View style={styles.iconView}>
              // </View>
            ) : (
              <SVGXml icon={svgIcons.profile} />

              // <SVGImage image={icons.home_inactive} />
            ),
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



// const SecondaryStack = () => {
//   return (
//     <Stack.Navigator
//     screenOptions={{
//       headerShown: false,
//     }}>
//       <Tab.Screen name="Payments" component={Payments} />
//       <Tab.Screen name="Notifications" component={Notifications} />
//       <Tab.Screen name="Wishlist" component={Wishlist} />
//       <Tab.Screen name="ContactUs" component={ContactUs} />
//       <Tab.Screen name="Language" component={Language} />
//       <Tab.Screen name="Rating" component={Rating} />
//       <Tab.Screen name="About" component={About} />
//       {/* <Tab.Screen name="FreeStuff" component={FreeStuff} /> */}
//       <Tab.Screen name="AddToCart" component={AddToCart} />
//       <Tab.Screen name="Checkout" component={Checkout} />
//       <Tab.Screen name="ListingDetails" component={ListingDetails} />
//       <Tab.Screen name="AllGroups" component={AllGroups} />
//       <Tab.Screen name="GroupDetail" component={GroupDetail} />
//       <Tab.Screen name="GroupChat" component={GroupChat} />
//       <Tab.Screen name='ManageCards' component={ManageCards} />
//     </Stack.Navigator>
//   );
// };

// const MainStack = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="BottomStack" component={BottomStack} />
//       <Stack.Screen name="SecondaryStack" component={SecondaryStack} />
//     </Stack.Navigator>
//   );
// };

export default UserStack;

const styles = StyleSheet.create({
  iconView: {
    backgroundColor: '#373636',
    // height:  hp('6.5%'),
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    // width: hp('6.5%'),
  },
});