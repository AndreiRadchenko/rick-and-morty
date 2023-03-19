import Skeleton from 'react-loading-skeleton';
import { getCharacter } from '@/utils/charApi';
import { useEffect, useState } from 'react';
import styles from '../../styles/pages/_character.module.scss';
import { Layout, CharDetailsList } from '@/components';
import { useRouter } from 'next/router';

export default function Character({}) {
  const [characterInfo, setCharacterInfo] = useState(null);
  const router = useRouter();
  const { character } = router.query;

  useEffect(() => {
    async function fetchData() {
      try {
        const info = await getCharacter(character);
        if (!info) {
          setCharacterInfo(null);
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
    <Layout backButton>
      <div className={styles.imageWrapper}>
        {characterInfo === null ? (
          <Skeleton className={styles.imageSkeleton} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={characterInfo.image}
            alt={characterInfo.name}
            sizes="(max-width: 1440px) 50vw,
              33vw"
            className={styles.image}
          />
        )}
      </div>
      <h1 className={styles.charName}>{characterInfo?.name || <Skeleton width={150} />}</h1>
      <p className={styles.information}>Information</p>
      <CharDetailsList charInfo={characterInfo} />
    </Layout>
  );
}
