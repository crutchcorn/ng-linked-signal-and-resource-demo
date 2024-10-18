export interface AllPokemon {
  count: number;
  next: string;
  previous: string;
  results: Array<{
    // 'https://pokeapi.co/api/v2/pokemon/1/'
    url: string;
    // bulbasaur
    name: string;
  }>;
}

export function getAllPokemon() {
  return fetch('https://pokeapi.co/api/v2/pokemon/?limit=2000')
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch all pokemon');
      }
      return res;
    })
    .then((res) => res.json() as Promise<AllPokemon>);
}
