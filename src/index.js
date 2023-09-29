import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_iFHHuD1PAYpjNu6BjBSizo3AxPvPCEAgps2RkZ0f7KxsmBZTcQNFzQ7OysiNQzMN';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  // error: document.querySelector('p.error'),
  catInfo: document.querySelector('div.cat-info'),
};

fetchBreeds();

refs.select.addEventListener('change', handleOptionClick);

function handleOptionClick() {
  refs.loader.classList.remove('visually-hidden');
  // refs.error.classList.add('visually-hidden');
  const optionId = refs.select.value;
  fetchCatByBreed(optionId);
}
