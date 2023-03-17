import Image from 'next/image';
import { getCharacter } from '@/utils/charApi';
import { useEffect, useState, useCallback } from 'react';
import { CharList, Searchbar } from '@/components';
import styles from '../../styles/pages/_characters.module.scss';
import { Layout, CharDetailsList } from '@/components';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';

export default function Character({}) {
  const [characterInfo, setCharacterInfo] = useState({});
  const router = useRouter();
  const { character } = router.query;

  useEffect(() => {
    async function fetchData() {
      try {
        const info = await getCharacter(character);
        console.log(info);
        if (!info) {
          setCharacterInfo({});
          return;
        }
        const { name, gender, status, species, origin, type, image } = info;
        setCharacterInfo({
          name,
          gender,
          status,
          species,
          origin: origin.name,
          type: type || 'Unknown',
          image,
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [character]);

  return (
    <Layout character>
      <div className={styles.imageWrapper}>
        <Image
          src={characterInfo.image}
          alt={characterInfo.name}
          className={styles.vercelLogo}
          fill
          priority
        />
      </div>
      <h1>{characterInfo.name}</h1>
      <p>Information</p>
      <CharDetailsList charInfo={characterInfo} />
    </Layout>
  );
}
