import styles from '../styles/components/_backButton.module.scss';
import { ArrowBack } from '../../public/images/svgs';

export const BackButton = () => {
  return (
    <>
      <div className={styles.backButton}>
        <ArrowBack className={styles.backButton__icon} />
        <p className={styles.backButton__text}>GO BACK</p>
      </div>
    </>
  );
};
