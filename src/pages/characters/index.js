import Image from 'next/image';
import { getCharacters } from '@/utils/charApi';
import { useEffect, useState, useCallback } from 'react';
import { CharList, Searchbar } from '@/components';
import styles from '../../styles/pages/_characters.module.scss';
import { Layout } from '@/components';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';

export default function Characters() {
  const [charactersList, setCharacterList] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [queryName, setQueryName] = useState('');
  const router = useRouter();
  // let { name } = router.query;

  const handleFilterInput = event => {
    setNameFilter(event.target.value);
  };

  const debouncedFilterHandler = useCallback(
    debounce(event => setNameFilter(event.target.value), 300),
    []
  );

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(router);
        setQueryName(router.name);
        const characters = await getCharacters(nameFilter);
        if (!characters) {
          setCharacterList([]);
          return;
        }

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
  }, [nameFilter]);

  return (
    <Layout>
      <div className={styles.imageWrapper}>
        <Image
          src="/images/rick-and-morty.jpg"
          alt="Rick and Morty"
          className={styles.vercelLogo}
          fill
          priority
        />
      </div>
      <Searchbar handleFilterInput={debouncedFilterHandler} />
      <p>{`query name = ${queryName}`}</p>
      <CharList characters={charactersList} />
    </Layout>
  );
}
