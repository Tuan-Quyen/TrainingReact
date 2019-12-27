import { HomeScreen } from './lib/components/homeScreen';
import ThirdScreen from './lib/components/thirdScreen';
import FirstScreen from './lib/components/firstScreen';
import SecondScreen from './lib/components/secondScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import React, { Component } from 'react';

//import redux structure neccessary
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

//import all reducer
import allReducers from './lib/reducer/index';

const customNavigationOption = function (title, backgroundColor) {
  return navigationOptions = {
    headerTitleStyle: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 18,
      flex: 1,
      textAlign: 'center',
      alignSelf: 'center',
      marginRight: 75
    },
    headerTintColor: '#FFFFFF',
    headerTitle: title,
    headerStyle: {
      backgroundColor: backgroundColor
    }
  }
}

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Third: {
    screen: ThirdScreen,
    navigationOptions: customNavigationOption("Third Screen", "#ff8080")
  },
  First: {
    screen: FirstScreen,
    navigationOptions: customNavigationOption("First Screen", "#0099ff")
  },
  Second: {
    screen: SecondScreen,
    navigationOptions: customNavigationOption("Second Screen", "#0099ff")
  }
});

const drawerScreen = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  First: {
    screen: FirstScreen,
    navigationOptions: customNavigationOption("First Screen", "#0099ff")
  },
  Second: {
    screen: SecondScreen,
    navigationOptions: customNavigationOption("Second Screen", "#0099ff")
  }
}, {
  drawerLockMode: "unlocked",
  initialRouteName: 'Home'
});

const AppStack = createSwitchNavigator({
  drawer: {
    screen: drawerScreen
  },
});

const AppContainer = createAppContainer(AppStack);

const store = createStore(allReducers, applyMiddleware(thunk));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
};