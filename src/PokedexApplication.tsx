import { StackNavigator } from './presentation/navigator/StackNavigator';
import { ThemeContextProvider } from './presentation/context/ThemeContext';

export const PokedexApplication = () => {

  return (
    <ThemeContextProvider>
      <StackNavigator />
    </ThemeContextProvider>
  );
};
