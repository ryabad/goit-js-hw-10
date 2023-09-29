import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_iFHHuD1PAYpjNu6BjBSizo3AxPvPCEAgps2RkZ0f7KxsmBZTcQNFzQ7OysiNQzMN';

Notiflix.Notify.init({
  width: '500px',
  position: 'center-top',
  timeout: '50000',
});

const refs = {
  breedOption: document.querySelector('.breed-select'),
  infoCatBlock: document.querySelector('div.cat-info'),
  loader: document.querySelector('.loader'),
  // error: document.querySelector('p.error'),
};

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      refs.loader.classList.add('visually-hidden');
      refs.breedOption.classList.remove('visually-hidden');
      const data = response.data;
      const markup = data
        .map(({ name, id }) => `<option value="${id}">${name}</option>`)
        .join('');

      refs.breedOption.insertAdjacentHTML('beforeend', markup);
    })
    .catch(error => {
      refs.loader.classList.add('visually-hidden');
      // refs.error.classList.remove('visually-hidden');
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      console.log(error);
    });
}

export function fetchCatByBreed(breedID) {
  refs.infoCatBlock.textContent = '';
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedID}`)
    .then(response => {
      refs.loader.classList.add('visually-hidden');
      const data = response.data;
      const catInfo = data[0];
      const { url, breeds } = catInfo;
      const breed = breeds[0];
      const {
        name,
        description,
        origin,
        temperament,
        wikipedia_url,
        alt_names,
      } = breed;

      const markup = `
        <div class="cat-container">
          <img src="${url}" alt="${alt_names} photo"/>
          <div class="info-container">
            <h1>${name}</h1>
            <h2>About cat!</h2>
              <p>${description}</p>
            <h2>Origin Country</h2>
              <p>${origin}</p>
            <h2>Temperament</h2>
              <p>${temperament}</p>
            <p><a href="${wikipedia_url}" target="_blank">More about ${name}!</a></p>
          </div>
        </div>
      `;
      refs.infoCatBlock.innerHTML = markup;
    })
    .catch(error => {
      refs.loader.classList.add('visually-hidden');
      // refs.error.classList.remove('visually-hidden');
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      console.log(error);
    });
}
