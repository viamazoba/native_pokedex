import { pokeApi } from '../../config/api/pokeApi';
import { PokeAPIPaginateResponse } from '../../infrastructure/interfaces/pokeapi.interfaces';


export const getPokemonNameWithID = async () => {

    const url = `pokemon?limit=1000`;
    const { data } = await pokeApi.get<PokeAPIPaginateResponse>(url);

    return data.results.map(info => ({
        id: Number(info.url.split('/')[6]),
        name: info.name,
    }));
};
