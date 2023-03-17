import { CharListItem } from '@/components';
import styles from '../styles/components/_charList.module.scss';
import Link from 'next/link';

export const CharList = ({ characters }) => {
  return (
    <ul className={styles.charactersList}>
      {characters.length === 0 ? (
        <p>No characters found</p>
      ) : (
        characters?.map(char => (
          <Link key={char.id} href={`/characters/${char.id}`}>
            <CharListItem charData={char} />
          </Link>
        ))
      )}
    </ul>
  );
};
