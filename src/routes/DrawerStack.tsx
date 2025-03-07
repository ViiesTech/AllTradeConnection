import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import {
  drawerItems,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ROUTES,
} from "../utils";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { images } from "../assets/images";
import { colors } from "../assets/colors";
import SVGXml from "../components/SVGXml";
import svgIcons from "../assets/icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TermsConditions from "../screens/main/User/TermsConditions";
import PrivacyPolicy from "../screens/main/User/PrivacyPolicy";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/main/User/Home";
import Project from "../screens/main/User/Project";
import Profile from "../screens/main/User/Profile";
import Message from "../screens/main/User/Message";
import TaskDetail from "../screens/main/User/TaskDetail";
import ReportJob from "../screens/main/User/ReportJob";
import Notification from "../screens/main/User/Notification";
import Support from "../screens/main/User/Support";
import MyJobs from "../screens/main/User/MyJobs";
import AuthProfileComplete from "../screens/auth/AuthProfileComplete";
import PostJob from "../screens/main/User/PostJob";
import PostLocationJob from "../screens/main/User/PostLocationJob";
import MyLocation from "../screens/main/User/MyLocation";
import SelectServiceAddinal from "../screens/main/User/SelectServiceAddinal";
import Congratulation from "../screens/main/User/Congratulation";
import ListOfPro from "../screens/main/User/ListOfPro";
import ChatMessages from "../screens/main/User/ChatMessages";

type RootStackParamList = {
  BottomStack: undefined;
  SecondaryStack: undefined;
  MainStack: undefined;
  Home: { type: string };
  [key: string]: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

interface CustomTabIconProps {
  icon: string;
  activeIcon: string;
  focused: boolean;
}

const CustomTabIcon: React.FC<CustomTabIconProps> = ({ icon, activeIcon, focused }) => {
  return (
    <View style={styles.tabContainer}>
      {focused && <View style={styles.activeIndicator} />}
      <SVGXml icon={focused ? activeIcon : icon} />
    </View>
  );
};

const BottomStack: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          elevation: 0,
          right: 0,
          borderTopWidth: 1,
          paddingTop: responsiveHeight(2),
          height: responsiveHeight(10),
          backgroundColor: colors.secondary,
        },
      }}
    >
      <Tab.Screen
        name={ROUTES.HOME}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon icon={svgIcons.home} activeIcon={svgIcons.house_active} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.MY_JOBS}
        component={MyJobs}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon icon={svgIcons.project} activeIcon={svgIcons.project_active} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.MESSAGE}
        component={Message}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon icon={svgIcons.message} activeIcon={svgIcons.message_active} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon icon={svgIcons.profile} activeIcon={svgIcons.profile_active} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const SecondaryStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROUTES.TASK_DETAIL} component={TaskDetail} />
      <Stack.Screen name={ROUTES.REPORT_JOB} component={ReportJob} />
      <Stack.Screen name={ROUTES.NOTIFICATION} component={Notification} />
      <Stack.Screen name={ROUTES.POST_JOB} component={PostJob} />
      <Stack.Screen name={ROUTES.POST_LOCATION_JOB} component={PostLocationJob} />
      <Stack.Screen name={ROUTES.MY_LOCATION} component={MyLocation} />
      <Stack.Screen name={ROUTES.SElECT_SERVICE_ADDINAL} component={SelectServiceAddinal} />
      <Stack.Screen name={ROUTES.CONGRATULATION} component={Congratulation} />
      <Stack.Screen name={ROUTES.LIST_OF_PRO} component={ListOfPro} />
    </Stack.Navigator>
  );
};

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomStack" component={BottomStack} />
      <Stack.Screen name="SecondaryStack" component={SecondaryStack} />
    </Stack.Navigator>
  );
};

const DrawerStack: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: responsiveWidth(100) },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name={ROUTES.MAIN_STACK} component={MainStack} />
      <Drawer.Screen name={ROUTES.MY_JOBS} component={MyJobs} />
      <Drawer.Screen name={ROUTES.PRIVACY_POLICY} component={PrivacyPolicy} />
      <Drawer.Screen name={ROUTES.TERMS_CONDITIONS} component={TermsConditions} />
      <Drawer.Screen name={ROUTES.SUPPORT} component={Support} />
      <Drawer.Screen name={ROUTES.TASK_DETAIL} component={TaskDetail} />
      <Drawer.Screen name={ROUTES.REPORT_JOB} component={ReportJob} />
      <Drawer.Screen name={ROUTES.AUTH_PROFILE_COMPLETE} component={AuthProfileComplete} />
      <Drawer.Screen name={ROUTES.PROFILE} component={Profile} />
      <Drawer.Screen name={ROUTES.CHAT_MESSAGES} component={ChatMessages} />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // console.log(navigation.getState().routes[0].state?.routes);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainContainer}>
      <View style={styles.profileContainer}>
        <Image style={styles.profileStyle} source={images.profile} />
        <View style={{ paddingTop: responsiveHeight(2), alignItems: "center" }}>
          <Text style={styles.name}>John Smith</Text>
          <Text style={styles.email}>john.smith@domain.com</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        {drawerItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              if (!item.navTo) {
                alert('working in progress')
              } else if (item.navTo === ROUTES.AUTH_PROFILE_COMPLETE) {
                navigation.navigate(ROUTES.DRAWER_STACK,{screen: item.navTo,params: {type: 'logout'}})
              }
              else {
                navigation.navigate(ROUTES.DRAWER_STACK, { screen: item.navTo })
              }
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: responsiveHeight(3),
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
              <SVGXml icon={item.icon} />
              <Text
                style={[
                  styles.labelStyle,
                  item.id === 10 ? { fontWeight: "bold", color: colors.red } : { color: colors.textColor2 },
                ]}
              >
                {item.title}
              </Text>
            </View>
            <SVGXml icon={item.id === 10 ? svgIcons.arrow_red : svgIcons.arrow} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default DrawerStack;

const styles = StyleSheet.create({
  mainContainer: {
    paddingBottom: responsiveHeight(10),
  },
  profileContainer: {
    alignItems: "center",
    paddingTop: responsiveHeight(8),
  },
  profileStyle: {
    height: responsiveHeight(18),
    width: responsiveHeight(18),
  },
  name: {
    color: colors.textColor2,
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
  },
  email: {
    color: colors.textColor2,
    fontSize: responsiveFontSize(2),
  },
  listContainer: {
    alignSelf: "center",
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
  labelStyle: {
    fontSize: responsiveFontSize(2.2),
  },
  tabContainer: {
    alignItems: "center",
  },
  activeIndicator: {
    height: 3,
    position: "absolute",
    width: responsiveWidth(25),
    bottom: responsiveHeight(6.4),
    backgroundColor: colors.primary,
  },
});
