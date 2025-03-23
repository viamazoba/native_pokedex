import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createContext, PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';
import { adaptNavigationTheme, PaperProvider } from 'react-native-paper';


// Define your custom font styles
const customFonts = {
    displaySmall: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '400' as '400',
        fontSize: 20,
    },
    displayMedium: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '400' as '400',
        fontSize: 24,
    },
    bodyLarge: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '400' as '400',
        fontSize: 16,
    },
    bodyMedium: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '400' as '400',
        fontSize: 14,
    },
    bodySmall: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '400' as '400',
        fontSize: 12,
    },
    labelLarge: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '500' as '500',
        fontSize: 14,
    },
    labelMedium: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '400' as '400',
        fontSize: 12,
    },
    labelSmall: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '400' as '400',
        fontSize: 10,
    },
    regular: { fontFamily: 'Nunito-Regular', fontWeight: '400' as '400' },
    medium: { fontFamily: 'Nunito-Medium', fontWeight: '500' as '500' },
    bold: { fontFamily: 'Nunito-Bold', fontWeight: '700' as '700' },
    heavy: { fontFamily: 'Nunito-Heavy', fontWeight: '900' as '900' },
    headlineMedium: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '400' as '400',
        fontSize: 22,
    },
};


const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

export const ThemeContext = createContext({
    isDark: false,
    theme: { ...LightTheme, fonts: customFonts },
});

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {

    const colorScheme = useColorScheme();

    const isDark = colorScheme === 'dark';
    const theme = isDark ? { ...DarkTheme, fonts: customFonts } : { ...LightTheme, fonts: customFonts };

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
                <ThemeContext.Provider value={{
                    isDark,
                    theme,
                }}>
                    {children}
                </ThemeContext.Provider>
            </NavigationContainer>
        </PaperProvider>
    );
};
