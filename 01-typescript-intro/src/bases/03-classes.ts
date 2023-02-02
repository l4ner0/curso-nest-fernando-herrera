import axios from 'axios';
import { Move, PokeapiResponse } from '../interfaces/pokeapi-response.interfaces';

export class Pokemon {
    constructor( public readonly id: number, public name: string) {

    }

    async getMoves(): Promise<Move[]> {
        const { data } = await axios.get<PokeapiResponse>(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
        console.log("data: ", data.moves);
        return data.moves;
    }
}