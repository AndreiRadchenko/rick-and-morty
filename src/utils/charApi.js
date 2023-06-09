import axios from 'axios';

axios.defaults.baseURL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (name, page) => {
  let query = '/character';
  query = `${query}/?page=${page}&name=${name}`;
  try {
    const { data } = await axios.get(query);
    return data;
  } catch (error) {}
};

export const getCharacter = async param => {
  const query = `/character/${param}`;
  try {
    const { data } = await axios.get(query);
    return data;
  } catch (error) {}
};
