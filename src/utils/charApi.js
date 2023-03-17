import axios from 'axios';

axios.defaults.baseURL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (param = '') => {
  let query = '/character';
  if (param) {
    query = `${query}/?name=${param}`;
  }
  try {
    const {
      data: { results },
    } = await axios.get(query);
    return results;
  } catch (error) {}
};

export const getCharacter = async param => {
  const query = `/character/${param}`;
  try {
    const { data } = await axios.get(query);
    return data;
  } catch (error) {}
};
