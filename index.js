/**
 * @format
 */

import './gesture-handler';
import { AppRegistry } from 'react-native';
import { PokedexApplication } from './src/PokedexApplication';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => PokedexApplication);
