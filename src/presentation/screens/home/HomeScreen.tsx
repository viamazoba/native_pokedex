import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useQuery } from '@tanstack/react-query';
import { PakeballBackground } from '../../components/ui/PokeballBackground';
import { FlatList } from 'react-native-gesture-handler';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';


export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();

    const { isLoading, data: pokemons = [] } = useQuery({
        queryKey: ['pokemons'],
        queryFn: () => getPokemons(0),
        staleTime: 1000 * 60 * 60, // Tiempo que se va a guardar en caché la información
    });

    return (
        <View style={globalTheme.globalMargin}>
            <PakeballBackground style={styles.imgPosition} />

            <FlatList
                data={pokemons}
                keyExtractor={(pokemon, index) => `${pokemon.id}--${index}`}
                numColumns={2}
                ListHeaderComponent={() => (
                    <Text variant="displayMedium">Pokédex</Text>
                )}
                style={{ paddingTop: top + 20 }}
                renderItem={({ item }) => (
                    <PokemonCard pokemon={item} />
                )}
            />

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
