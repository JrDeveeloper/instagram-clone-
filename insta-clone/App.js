import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import MainScreen from './Components/MainScreen';

const AppStackNavigator = createStackNavigator({
  Main:{
    screen: MainScreen
  }
});


export default createAppContainer(AppStackNavigator);
