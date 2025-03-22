import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigator/StackNavigator';

export const PokedexApplication = () => {

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};
