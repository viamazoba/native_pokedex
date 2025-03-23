import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useQuery } from '@tanstack/react-query';
import { PakeballBackground } from '../../components/ui/PokeballBackground';


export const HomeScreen = () => {

    const { isLoading, data = [] } = useQuery({
        queryKey: ['pokemons'],
        queryFn: () => getPokemons(0),
        staleTime: 1000 * 60 * 60, // Tiempo que se va a guardar en caché la información
    });

    return (
        <View>
            <PakeballBackground style={styles.imgPosition} />

        </View>
    );
};


const styles = StyleSheet.create({
    imgPosition: {
        position: 'absolute',
        top: -100,
        right: -100,
    },
});
