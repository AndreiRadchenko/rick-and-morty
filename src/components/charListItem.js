import Image from 'next/image';
import styles from '../styles/components/_charListItem.module.scss';

export function CharListItem({ charData: { image, name, species } }) {
  return (
    <li>
      <div className={styles.itemCard}>
        <div className={styles.itemCard__imageWrapper}>
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 1440px) 100vw,
              33vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className={styles.itemCard__textWrapper}>
          <p className={styles.itemCard__charName}>{name}</p>
          <p className={styles.itemCard__charSpecies}>{species}</p>
        </div>
      </div>
    </li>
  );
}
