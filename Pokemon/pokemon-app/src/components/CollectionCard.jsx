import styles from '../styles/collectionCard.module.css';

const CollectionCard = ({ pokemon, provided, onDelete  }) => {
  return (
    <div
      className={styles.card}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <button
        className={styles.delete}
        onClick={() => onDelete(pokemon.id)}
      >
        ❌
      </button>
      <img src={pokemon.image} alt={pokemon.name} className={styles.image} />
      <h3 className={styles.name}>{pokemon.name}</h3>
    </div>
  );
};

export default CollectionCard;