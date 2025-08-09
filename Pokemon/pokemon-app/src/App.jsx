import { useState, useEffect } from 'react';
import Discovery from './pages/Discovery';
import Collection from './pages/Collection';
import Tabs from './components/Tabs';

const App = () => {
  const [active, setActive] = useState('discover');
  const [collection, setCollection] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('myCollection');
    if (stored) {
      setCollection(JSON.parse(stored));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('myCollection', JSON.stringify(collection));
    }
  }, [collection, loaded]);

  const addToCollection = (pokemon) => {
    if (!collection.find((p) => p.id === pokemon.id)) {
      setCollection([...collection, pokemon]);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Tabs active={active} setActive={setActive} />
      {active === 'discover' && <Discovery addToCollection={addToCollection} />}
      {active === 'collection' && (
        <Collection collection={collection} setCollection={setCollection} />
      )}
    </div>
  );
};

export default App;