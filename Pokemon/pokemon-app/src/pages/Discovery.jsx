import { useEffect, useRef } from 'react';
import PokemonCard from '../components/PokemonCard';
import { usePokemonInfinite } from '../hooks/usePokemonInfinite';
import styles from '../styles/discovery.module.css';

const Discovery = ({ addToCollection }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonInfinite();
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className={styles.container}>
      {data?.pages.flatMap((page) =>
        page.results.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} onAdd={addToCollection} />
        ))
      )}
      <div ref={loaderRef} className={styles.loader}>
        {isFetchingNextPage ? 'Loading more Pokémon...' : ''}
      </div>
    </div>
  );
};

export default Discovery;