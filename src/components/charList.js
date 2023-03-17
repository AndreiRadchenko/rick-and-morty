import { CharListItem } from '@/components';
import styles from '../styles/components/_charList.module.scss';

export const CharList = ({ characters }) => {
  return (
    <ul className={styles.charactersList}>
      {characters.length === 0 ? (
        <p>No characters found</p>
      ) : (
        characters?.map(char => (
          <CharListItem key={char.id} charData={char}>
            {/* <Link to={`/movies/${film.id}`}>{film.title}</Link> */}
          </CharListItem>
        ))
      )}
    </ul>
  );
};
