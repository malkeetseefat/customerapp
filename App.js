import React, { useEffect, useRef } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon, { Icons } from './src/components/Icons';
import * as colors from './src/assets/css/Colors';
import { bold } from './src/config/Constants';
import * as Animatable from 'react-native-animatable';

/* Screens */
import Splash from './src/views/Splash';
import LoginHome from './src/views/LoginHome';
import Faq from './src/views/Faq';
import FaqCategories from './src/views/FaqCategories';
import FaqDetails from './src/views/FaqDetails';
import PrivacyPolicies from './src/views/PrivacyPolicies';
import Otp from './src/views/Otp';
import CheckPhone  from './src/views/CheckPhone';
import CreatePassword  from './src/views/CreatePassword';
import Password  from './src/views/Password';
import TermsAndConditions from './src/views/TermsAndConditions';
import More from './src/views/More';
import Register from './src/views/Register';
import LocationEnable from './src/views/LocationEnable';
import PaymentMethods from './src/views/PaymentMethods';
import SelectCurrentLocation from './src/views/SelectCurrentLocation';
import CurrentLocation from './src/views/CurrentLocation';
import AddressList from './src/views/AddressList';
import AddAddress from './src/views/AddAddress';
import Profile from './src/views/Profile';
import MyBookingDetails from './src/views/MyBookingDetails';
import Search from './src/views/Search';
import OrderRating from './src/views/OrderRating';
import Service from './src/views/Service';
import ServiceDetails from './src/views/ServiceDetails';
import ServiceCart from './src/views/ServiceCart';
import ServicePromoCode from './src/views/ServicePromoCode';
import MyBookings from './src/views/MyBookings';
import ComingSoon from './src/views/ComingSoon';
import QueryList from './src/views/QueryList';
import QueryServiceList from './src/views/QueryServiceList';
import QuerySubmit from './src/views/QuerySubmit';
import Dashboard from './src/views/Dashboard';

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};
const TabArr = [
  { route: 'Dashboard', label: 'Home', type: Icons.Feather, icon: 'home', component: Dashboard, color: colors.theme_fg, alphaClr: colors.theme_bg_three },
  { route: 'MyBookings', label: 'Bookings', type: Icons.Feather, icon: 'file-text', component: MyBookings, color: colors.theme_fg, alphaClr: colors.theme_bg_three },
  { route: 'QueryList', label: 'Query', type: Icons.MaterialIcons, icon: 'chat', component: QueryList, color: colors.theme_fg, alphaClr: colors.theme_bg_three },
  { route: 'More', label: 'More', type: Icons.FontAwesome, icon: 'user-circle-o', component: More, color: colors.theme_fg, alphaClr: colors.theme_bg_three },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) { // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
      viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
      textViewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
    } else {
      viewRef.current.animate({ 0: { scale: 1, }, 1: { scale: 0, } });
      textViewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, {flex: focused ? 1 : 0.65, height:60}]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color, borderRadius: 16 }]} />
        <View style={[styles.btn, { backgroundColor: focused ? item.alphaClr : null }]}>
          <Icon type={item.type} name={item.icon} color={focused ? colors.theme_fg : colors.theme_fg_three} />
          <Animatable.View
            ref={textViewRef}>
            {focused && <Text style={{
              color: colors.theme_fg, paddingHorizontal: 8, fontFamily:bold
            }}>{item.label}</Text>}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
          backgroundColor:colors.theme_bg
        }
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" options={{headerShown: false}}  >
      <Stack.Screen name="PaymentMethods" component={PaymentMethods} options={{ title: 'Select Payment Mode', headerBackTitle:'  ' }} />
      <Stack.Screen name="Service" component={Service} options={{ title: 'Periodic Service', headerBackTitle:'  ' }} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails}  options={({ route }) => ({ title: route.params.title, headerBackTitle:'  ' })} />
      <Stack.Screen name="OrderRating" component={OrderRating} options={{headerShown: false}} />
      <Stack.Screen name="Search" component={Search} options={{headerShown: false}} />
      <Stack.Screen name="FaqDetails" component={FaqDetails} options={{ title: 'Faq Details' , headerBackTitle:'  '}} />
      <Stack.Screen name="ComingSoon" component={ComingSoon} options={{ title: 'Under Construction', headerBackTitle:'  ' }} />
      <Stack.Screen name="FaqCategories" component={FaqCategories} options={{ title: 'Faq Categories', headerBackTitle:'  ' }} />
      <Stack.Screen name="Faq" component={Faq} options={{ title: 'Faq' , headerBackTitle:'  '}}  />
      <Stack.Screen name="Dashboard" component={TabNavigator}  options={{headerShown: false}} />
      <Stack.Screen name="LoginHome" component={LoginHome} options={{headerShown: false}} />
      <Stack.Screen name="Otp" component={Otp} options={{headerShown: false}} />
      <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}} />
      <Stack.Screen name="CheckPhone" component={CheckPhone} options={{headerShown: false}} />
      <Stack.Screen name="CreatePassword" component={CreatePassword} options={{headerShown: false}} />
      <Stack.Screen name="Password" component={Password} options={{headerShown: false}} />
      <Stack.Screen name="PrivacyPolicies" component={PrivacyPolicies} options={{ title: 'Privacy Policies', headerBackTitle:'  ' }} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} options={{ title: 'Terms and Conditions', headerBackTitle:'  ' }} />
      <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
      <Stack.Screen name="LocationEnable" component={LocationEnable} options={{ title: 'Location Enable', headerBackTitle:'  ' }} />
      <Stack.Screen name="SelectCurrentLocation" component={SelectCurrentLocation} options={{ title: 'Pick your Location' , headerBackTitle:'  '}} />
      <Stack.Screen name="CurrentLocation" component={CurrentLocation} options={{ headerShown: false }} />
      <Stack.Screen name="AddressList" component={AddressList} options={{ title: 'Address List', headerBackTitle:'  ' }} />
      <Stack.Screen name="AddAddress" component={AddAddress} options={{ title: 'Add Address', headerBackTitle:'  ' }} />
      <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile', headerBackTitle:'  ' }} />
      <Stack.Screen name="MyBookingDetails" component={MyBookingDetails} options={{ headerShown: false }} />
      <Stack.Screen name="ServiceCart" component={ServiceCart} options={{ title: 'Service Cart', headerBackTitle:'  ' }} />
      <Stack.Screen name="ServicePromoCode" component={ServicePromoCode} options={{ title: 'Service Promo Code', headerBackTitle:'  ' }} />
      <Stack.Screen name="MyBookings" component={MyBookings} options={{ title: 'My Bookings', headerBackTitle:'  ' }} />
      <Stack.Screen name="QuerySubmit" component={QuerySubmit} options={{ title: 'Submit your query', headerBackTitle:'  ' }} />
      <Stack.Screen name="QueryServiceList" component={QueryServiceList} options={{ title: 'Submit your service', headerBackTitle:'  ' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  }
})

export default App;