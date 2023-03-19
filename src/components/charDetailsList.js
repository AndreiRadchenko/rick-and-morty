import styles from '../styles/components/_charDetailsList.module.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { uid } from 'uid';

const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);

export const CharDetailsList = ({ charInfo }) => {
  let infoArrayFiltered = new Array(5).fill(['', '']);
  if (charInfo !== null) {
    const infoArray = Object.entries(charInfo);
    const excludedParams = ['name', 'image'];
    infoArrayFiltered = infoArray?.filter(([name, value]) => !excludedParams.includes(name));
  }

  return (
    <ul className={styles.charInfo}>
      {infoArrayFiltered?.map(([name, value]) => {
        return (
          <li key={uid()} className={styles.charInfo__item}>
            <div>
              <h3 className={styles.charInfo__item__title}>
                {name ? capitalize(name) : <Skeleton width={120} />}
              </h3>
              <p className={styles.charInfo__item__value}>{value || <Skeleton width={120} />}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
