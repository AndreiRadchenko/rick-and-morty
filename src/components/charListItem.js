import Image from 'next/image';
import styles from '../styles/components/_charListItem.module.scss';

export function CharListItem({ charData: { id, image, name, species } }) {
  return (
    <li>
      <div className={styles.itemCard}>
        <div className={styles.imageWrapper}>
          <Image src={image} alt={name} fill />
        </div>

        <h3>{name}</h3>
        <p>{species}</p>
      </div>
    </li>
  );
}
