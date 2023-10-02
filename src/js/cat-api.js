import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_iFHHuD1PAYpjNu6BjBSizo3AxPvPCEAgps2RkZ0f7KxsmBZTcQNFzQ7OysiNQzMN';

const refs = {
  infoCatBlock: document.querySelector('div.cat-info'),
};

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds');
}

export function fetchCatByBreed(breedID) {
  refs.infoCatBlock.textContent = '';
  return axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedID}`
  );
}
