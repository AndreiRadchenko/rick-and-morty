import axios from 'axios';

axios.defaults.baseURL = 'https://rickandmortyapi.com/api';

export const getAllCharacters = async () => {
  try {
    const {
      data: { results },
    } = await axios.get('/character');
    return results;
  } catch (error) {
    console.log(error);
  }
};
