import styles from '../styles/pokemonCard.module.css';

const PokemonCard = ({ pokemon, onAdd }) => {
    return (
        <div className={styles.card}>
            <img src={pokemon.image} alt={pokemon.name} className={styles.image} />
            <h3 className={styles.name}>{pokemon.name}</h3>
            <div className={styles.types}>{pokemon.types.join(', ')}</div>
            <div className={styles.stats}>
                HP: {pokemon.stats.hp} | Atk: {pokemon.stats.attack} | Def: {pokemon.stats.defense}
            </div>
            <button className={styles.addButton} onClick={() => onAdd(pokemon)}>
                +
            </button>
        </div>

    )
}

export default PokemonCard