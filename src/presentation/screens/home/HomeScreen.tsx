import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { PakeballBackground } from '../../components/ui/PokeballBackground';
import { FlatList } from 'react-native-gesture-handler';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';


export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();

    // Este query client lo vas a utilizar para guardar la info de pokemons que haces
    // en un inicio, se guarda todo en caché para evitar realizar llamados innecesarios
    const queryClient = useQueryClient();

    // Est es la forma tradicional de una petición http
    /* const { isLoading, data: pokemons = [] } = useQuery({
        queryKey: ['pokemons'],
        queryFn: () => getPokemons(0),
        staleTime: 1000 * 60 * 60, // Tiempo que se va a guardar en caché la información
    }); */

    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['pokemons', 'infinite'],
        initialPageParam: 0,
        queryFn: async (params) => {
            const pokemons = await getPokemons(params.pageParam);
            pokemons.forEach(pokemon => {
                queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
            });
            return pokemons;
        },
        getNextPageParam: (lastPage, pages) => pages.length,
        staleTime: 1000 * 60 * 60, // Tiempo que se va a guardar en caché la información
    });

    return (
        <View style={globalTheme.globalMargin}>
            <PakeballBackground style={styles.imgPosition} />

            <FlatList
                data={data?.pages.flat() ?? []}
                keyExtractor={(pokemon, index) => `${pokemon.id}--${index}`}
                numColumns={2}
                ListHeaderComponent={() => (
                    <Text variant="displayMedium">Pokédex</Text>
                )}
                style={{ paddingTop: top + 20 }}
                renderItem={({ item }) => (
                    <PokemonCard pokemon={item} />
                )}
                onEndReachedThreshold={0.6}
                onEndReached={() => fetchNextPage()}
                showsVerticalScrollIndicator={false}
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
