import styles from '../styles/components/_backButton.module.scss';
import { ArrowBack } from '../../public/images/svgs';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const BackButton = () => {
  const router = useRouter();
  const { name = '', page = 1 } = router.query;
  return (
    <Link href={`/characters/?name=${name}&page=${page}`} className={styles.backButton}>
      <ArrowBack className={styles.backButton__icon} />
      <p className={styles.backButton__text}>GO BACK</p>
    </Link>
  );
};
