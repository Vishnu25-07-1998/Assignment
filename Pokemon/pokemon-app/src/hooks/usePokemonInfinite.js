import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

export function usePokemonInfinite() {
  return useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: async ({ pageParam = 0 }) => {
      const limit = 6;
      const offset = pageParam * limit;
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );

      const details = await Promise.all(
        res.data.results.map(async (p) => {
          const pokeRes = await axios.get(p.url);
          return {
            id: pokeRes.data.id,
            name: pokeRes.data.name,
            image: pokeRes.data.sprites.other['official-artwork'].front_default,
            types: pokeRes.data.types.map((t) => t.type.name),
            stats: {
              hp: pokeRes.data.stats[0].base_stat,
              attack: pokeRes.data.stats[1].base_stat,
              defense: pokeRes.data.stats[2].base_stat,
            },
          };
        })
      );

      return { results: details, nextPage: pageParam + 1, hasMore: !!res.data.next };
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
  });
}