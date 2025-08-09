import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import CollectionCard from '../components/CollectionCard';
import styles from '../styles/collection.module.css';

const Collection = ({ collection, setCollection }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(collection);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setCollection(items);
  };

  const handleDelete = (id) => {
    setCollection((prev) => prev.filter((pokemon) => pokemon.id !== id));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="collection" direction="horizontal">
        {(provided) => (
          <div
            className={styles.container}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {collection.map((pokemon, index) => (
              <Draggable key={pokemon.id} draggableId={String(pokemon.id)} index={index}>
                {(provided) => (
                  <CollectionCard pokemon={pokemon} provided={provided} onDelete={handleDelete} />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Collection;