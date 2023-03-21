import { getCharacters } from '@/utils/charApi';
import { useEffect, useState } from 'react';
import { CharList, Searchbar } from '@/components';
import { Layout } from '@/components';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import styles from '../../styles/components/_reactPaginate.module.scss';
import { useMedia } from 'react-use';

export default function Characters() {
  const [charactersList, setCharacterList] = useState([]);
  const [info, setInfo] = useState(null);
  const router = useRouter();
  const { name = '', page = 1 } = router.query;
  const isWide = useMedia('(min-width: 1440px)');

  const handleFilterInput = ({ target: { value } }) => {
    router.push(
      {
        pathname: '/characters',
        query: { name: value, page: 1 },
      },
      undefined,
      { shallow: true }
    );
  };

  const handlePageClick = event => {
    router.push(
      {
        pathname: '/characters',
        query: { ...router.query, page: event.selected + 1 },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCharacters(name, page);
        if (!data) {
          setCharacterList([]);
          setInfo(null);
          return;
        }
        setCharacterList(
          data.results.map(({ id, name, species, image }) => {
            return {
              id,
              name,
              species,
              image,
            };
          })
        );
        setInfo(data.info);
      } catch (error) {
        console.log(error);
      }
    }
    const debouncedFetch = debounce(fetchData, 500);
    debouncedFetch();
  }, [name, page, router]);

  return (
    <Layout>
      <Searchbar filterValue={name} handleFilterInput={handleFilterInput} />
      <CharList characters={charactersList} queryName={name} queryPage={page} />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={isWide ? 5 : 3}
        marginPagesDisplayed={isWide ? 2 : 1}
        pageCount={info !== null ? Number(info.pages - 1) : 0}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        forcePage={info !== null ? Number(page) - 1 : -1}
        containerClassName={styles.pagination__container}
        pageClassName={styles.pagination__page}
        activeClassName={styles.active__page}
        previousClassName={styles.previous__page}
        nextClassName={styles.next__page}
        disabledClassName={styles.disabled__next}
      />
    </Layout>
  );
}
