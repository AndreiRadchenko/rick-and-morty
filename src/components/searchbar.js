import styles from '../styles/components/_searchbar.module.scss';
import { Magnify } from '../../public/images/svgs';

export const Searchbar = ({ filterValue, handleFilterInput }) => {
  return (
    <form className={styles.filterForm}>
      <Magnify className={styles.filterForm__icon} />
      <input
        className={styles.filterForm__input}
        name="filter"
        id="filter"
        placeholder="Filter by name..."
        onChange={handleFilterInput}
        value={filterValue}
      ></input>
    </form>
  );
};
