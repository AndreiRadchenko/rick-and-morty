import Image from 'next/image';
import { Inter } from 'next/font/google';
// import styles from '@/styles/Home.module.css';
import { getAllCharacters } from '@/utils/charApi';
import { useEffect, useState } from 'react';
import { CharListItem } from '@/components';
import styles from '../../styles/pages/_characters.module.scss';
import { Layout } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export default function Characters() {
  const [charactersList, setCharacterList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const characters = await getAllCharacters();
        setCharacterList(
          characters.map(({ id, name, species, image }) => {
            return {
              id,
              name,
              species,
              image,
            };
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <div className={styles.imageWrapper}>
        <Image
          src="/images/rick-and-morty.jpg"
          alt="Rick and Morty"
          className={styles.vercelLogo}
          width={600}
          height={200}
          priority
        />
      </div>
      <form className={styles.filterForm}>
        <input
          className={styles.filter}
          name="filter"
          id="filter"
          placeholder="Filter by name..."
        ></input>
      </form>
      <ul className={styles.charactersList}>
        {charactersList?.map(char => (
          <CharListItem key={char.id} charData={char}>
            {/* <Link to={`/movies/${film.id}`}>{film.title}</Link> */}
          </CharListItem>
        ))}
      </ul>
    </Layout>
  );
}
