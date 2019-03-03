import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NewEvent from '../components/NewEvent';

const HomeStack = createStackNavigator({
   Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused= { focused }
      name   = {
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-information-circle'
      }
    />
  ),
};

const ExploreStack = createStackNavigator({
  Explore: ExploreScreen,
});

ExploreStack.navigationOptions = {
  tabBarLabel: 'Explore',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused= { focused }
      name   = { Platform.OS === 'ios' ? 'ios-search' : 'md-link' }
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  New: NewEvent
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused = { focused }
      name    = { Platform.OS === 'ios' ? 'ios-person' : 'md-options' }
    />
  ),

};

export default createBottomTabNavigator({
  HomeStack,
  ExploreStack,
  ProfileStack
});
