import styles from '../styles/tabs.module.css';

const Tabs = ({ active, setActive }) => {
  return (
    <div className={styles.container}>
      <button
        onClick={() => setActive('discover')}
        className={`${styles.tab} ${active === 'discover' ? styles.active : ''}`}
      >
        Discover
      </button>
      <button
        onClick={() => setActive('collection')}
        className={`${styles.tab} ${active === 'collection' ? styles.active : ''}`}
      >
        My Collection
      </button>
    </div>
  );
};

export default Tabs;