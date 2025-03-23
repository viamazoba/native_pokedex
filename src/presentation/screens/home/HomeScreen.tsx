import { ActivityIndicator, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useQuery } from '@tanstack/react-query';


export const HomeScreen = () => {

    getPokemons();

    const { isLoading, data } = useQuery({
        queryKey: ['pokemons'],
        queryFn: () => getPokemons(),
        staleTime: 1000 * 60 * 60, // Tiempo que se va a guardar en caché la información
    });

    return (
        <View>
            <Text variant="displaySmall">HomeScreen</Text>

            {
                isLoading ?
                    <ActivityIndicator />
                    :
                    <Button
                        mode="contained"
                        onPress={() => console.log('Pressed!')}
                    >
                        Press me
                    </Button>
            }

        </View>
    );
};
