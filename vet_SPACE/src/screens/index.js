import { Navigation } from 'react-native-navigation';

import StartScreen from './StartScreen';
import LoginScreen from './LoginScreen';
import JoinScreen from './JoinScreen';

export function registerScreens() {
  Navigation.registerComponent('yuddomack.StartScreen', () => StartScreen);
  Navigation.registerComponent('yuddomack.LoginScreen', () => LoginScreen);
  Navigation.registerComponent('yuddomack.JoinScreen', () => JoinScreen);
}