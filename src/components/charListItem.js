import Image from 'next/image';
import styles from '../styles/components/_charListItem.module.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function CharListItem({ charData: { image, name, species }, isLoading }) {
  return (
    <li>
      <div className={styles.itemCard}>
        <>
          <div className={styles.itemCard__imageWrapper}>
            {!isLoading ? (
              <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 1440px) 100vw,
              33vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
              />
            ) : (
              <Skeleton className={styles.skeleton_image} />
            )}
          </div>
          <div className={styles.itemCard__textWrapper}>
            <p className={styles.itemCard__charName}>
              {!isLoading ? name : <Skeleton width={120} />}
            </p>
            <p className={styles.itemCard__charSpecies}>
              {!isLoading ? species : <Skeleton width={60} />}
            </p>
          </div>
        </>
      </div>
    </li>
  );
}
