import { View, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalTheme } from '../../../config/theme/global-theme';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { Pokemon } from '../../../domain/entities/pokemon';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { getPokemonNameWithID } from '../../../actions/pokemons';
import { useMemo, useState } from 'react';


export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const [term, setTerm] = useState('');

    const { isLoading, data: pokemonNameList = [] } = useQuery({
        queryKey: ['pokemon', 'all'],
        queryFn: () => getPokemonNameWithID(),
    });

    const pokemonNameIdList = useMemo(() => {
        if (!isNaN(Number(term))) {
            const pokemon = pokemonNameList.find(currentPokemon => currentPokemon.id === Number(term));

            return pokemon ? [pokemon] : [];
        }

        if (term.length === 0) return [];
        if (term.length < 3) return [];

        return pokemonNameList.filter(currentPokemon => currentPokemon.name.includes(term.toLowerCase()));

    }, [term, pokemonNameList]);

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

            <ActivityIndicator
                style={{ paddingTop: 20 }}
            />

            <FlatList
                data={[] as Pokemon[]}
                keyExtractor={(pokemon, index) => `${pokemon.id}--${index}`}
                numColumns={2}
                style={{ paddingTop: top + 20 }}
                renderItem={({ item }) => (
                    <PokemonCard pokemon={item} />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};
