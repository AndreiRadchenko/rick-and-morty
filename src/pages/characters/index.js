import { getCharacters } from '@/utils/charApi';
import { useEffect, useState } from 'react';
import { CharList, Searchbar } from '@/components';
import { Layout } from '@/components';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';

export default function Characters() {
  const [charactersList, setCharacterList] = useState([]);
  const [info, setInfo] = useState(null);
  const router = useRouter();
  const { name = '', page = '' } = router.query;

  const handleFilterInput = ({ target: { value } }) => {
    router.push(
      {
        pathname: '/characters',
        query: { ...router.query, name: value },
      },
      undefined,
      { shallow: true }
    );
  };

  const handlePageClick = event => {
    router.push(
      {
        pathname: '/characters',
        query: { ...router.query, page: event.selected },
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
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={info ? info.pages : 1}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </Layout>
  );
}
