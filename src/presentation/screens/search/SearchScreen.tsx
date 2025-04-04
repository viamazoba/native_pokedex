import { View, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalTheme } from '../../../config/theme/global-theme';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { getPokemonNameWithID, getPokemonsByIds } from '../../../actions/pokemons';
import { useMemo, useState } from 'react';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';


export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const [term, setTerm] = useState('');

    const debouncedValue = useDebouncedValue(term);

    const { isLoading, data: pokemonNameList = [] } = useQuery({
        queryKey: ['pokemon', 'all'],
        queryFn: () => getPokemonNameWithID(),
    });

    const pokemonNameIdList = useMemo(() => {
        if (!isNaN(Number(debouncedValue))) {
            const pokemon = pokemonNameList.find(currentPokemon => currentPokemon.id === Number(debouncedValue));

            return pokemon ? [pokemon] : [];
        }

        if (debouncedValue.length === 0) return [];
        if (debouncedValue.length < 3) return [];

        return pokemonNameList.filter(currentPokemon => currentPokemon.name.includes(debouncedValue.toLowerCase()));

    }, [debouncedValue, pokemonNameList]);

    const { isLoading: isLoadingPokemons, data: pokemons = [] } = useQuery({
        queryKey: ['pokemons', 'by', pokemonNameIdList],
        queryFn: () => getPokemonsByIds(pokemonNameIdList.map(pokemon => pokemon.id)),
        staleTime: 1000 * 60 * 5,
    });

    if (isLoading) {
        return (<FullScreenLoader />);
    }

    return (
        <View style={[globalTheme.globalMargin, { paddingTop: top + 10 }]}>
            <TextInput
                placeholder="Buscar Pokémon"
                mode="flat"
                autoFocus
                autoCorrect={false}
                onChangeText={(text: string) => setTerm(text)}
                value={term}
            />

            {
                isLoadingPokemons &&
                <ActivityIndicator
                    style={{ paddingTop: 20 }}
                />
            }


            <FlatList
                data={pokemons}
                keyExtractor={(pokemon, index) => `${pokemon.id}--${index}`}
                numColumns={2}
                style={{ paddingTop: top + 20 }}
                renderItem={({ item }) => (
                    <PokemonCard pokemon={item} />
                )}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{ height: 120 }} />}
            />
        </View>
    );
};
