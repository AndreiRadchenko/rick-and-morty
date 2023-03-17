import styles from '../styles/components/_searchbar.module.scss';

export const Searchbar = ({ handleFilterInput }) => {
  return (
    <form className={styles.filterForm}>
      <svg className={styles.filterForm__icon} width="24" height="24">
        <use href="./images/icon-sprite.svg#magnify"></use>
      </svg>
      <input
        className={styles.filterForm__input}
        name="filter"
        id="filter"
        placeholder="Filter by name..."
        onChange={handleFilterInput}
      ></input>
    </form>
  );
};
