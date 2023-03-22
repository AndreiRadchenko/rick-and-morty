import { CharListItem } from '@/components';
import styles from '../styles/components/_charList.module.scss';
import Link from 'next/link';
import { useMedia } from 'react-use';

const createDummyArray = isWide => {
  return isWide
    ? Array.from({ length: 8 }, (_, i) => ({
        id: i,
        name: '',
      }))
    : Array.from({ length: 3 }, (_, i) => ({
        id: i,
        name: '',
      }));
};

export const CharList = ({ characters, isLoading, queryName, queryPage }) => {
  const isWide = useMedia('(min-width: 1440px)', false);

  if (isLoading) {
    characters = createDummyArray(isWide);
  }

  return (
    <>
      {characters.length === 0 && !isLoading ? (
        <p>No characters found</p>
      ) : (
        <ul className={styles.charactersList}>
          {characters?.map(char => (
            <Link key={char.id} href={`/characters/${char.id}?name=${queryName}&page=${queryPage}`}>
              <CharListItem charData={char} isLoading={isLoading} />
            </Link>
          ))}
        </ul>
      )}
    </>
  );
};
