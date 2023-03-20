import { getCharacters } from '@/utils/charApi';
import { useEffect, useState } from 'react';
import { CharList, Searchbar } from '@/components';
import { Layout } from '@/components';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';

export default function Characters() {
  const [charactersList, setCharacterList] = useState([]);
  const router = useRouter();
  const { name = '' } = router.query;

  const handleFilterInput = ({ target: { value } }) => {
    router.push(
      {
        pathname: '/characters',
        query: { name: value },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const characters = await getCharacters(name);
        if (!characters) {
          setCharacterList([]);
          return;
        }
        setCharacterList(
          characters.map(({ id, name, species, image }) => {
            return {
              id,
              name,
              species,
              image,
            };
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    const debouncedFetch = debounce(fetchData, 500);
    debouncedFetch();
  }, [name, router]);

  return (
    <Layout>
      <Searchbar filterValue={name} handleFilterInput={handleFilterInput} />
      <CharList characters={charactersList} queryName={name} />
    </Layout>
  );
}
