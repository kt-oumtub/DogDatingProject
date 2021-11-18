import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Matching from './Matching';
import Matches from './Matches';
import Chat from './Chat';
import Profile from './Profile';

const BottomTab = createBottomTabNavigator();
const Home = ({route}) => {
  const [memberType, setMemberTpye] = useState(route.params);

  return (
    <BottomTab.Navigator
      // initialRouteName="Matching"
      screenOptions={({route, navigation}) => ({
        headerShown: false,
        tabBarActiveTintColor: 'deeppink',
        tabBarInactiveTintColor: 'darkgray',
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: styles.tabBarStyle,

        tabBarIcon: ({focused, color, size}) => {
          let iconName, type, iconSize;
          if (route.name === 'Matching') {
            iconName = focused ? 'heart-multiple' : 'heart-multiple';
            type = 'material-community';
            iconSize = 23;
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chat-processing' : 'chat-processing';
            type = 'material-community';
            iconSize = 28;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user-alt' : 'user-alt';
            type = 'font-awesome-5';
            iconSize = 21;
          } else if (route.name === 'Matches') {
            iconName = focused ? 'dog' : 'dog';
            type = 'material-community';
            iconSize = 28;
          }
          return (
            <Icon
              name={iconName}
              size={iconSize}
              color={color}
              style={{paddingBottom: -1}}
              type={type}
            />
          );
        },
      })}>
      <BottomTab.Screen name="Matching" component={Matching} />
      {memberType === 'Member' && (
        <BottomTab.Screen name="Matches" component={Matches} />
      )}
      {memberType === 'Member' && (
        <BottomTab.Screen name="Chat" component={Chat} />
      )}
      {memberType === 'Member' && (
        <BottomTab.Screen name="Profile" component={Profile} />
      )}
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 14,
    marginBottom: 2,
    color: '#707070',
    fontWeight: '700',
  },
  tabBarStyle: {
    height: '10%',
    paddingBottom: 3,
    backgroundColor: 'whitesmoke',
  },
});

export default Home;
