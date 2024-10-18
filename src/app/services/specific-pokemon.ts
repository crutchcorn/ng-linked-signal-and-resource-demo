export interface SpecificPokemon {
  // 2
  id: number;
  // ivysaur
  name: string;
}

export function getSpecificPokemon(pokemonId: number) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch pokemon ${pokemonId}`);
      }
      return res;
    })
    .then((res) => res.json() as Promise<SpecificPokemon>);
}
