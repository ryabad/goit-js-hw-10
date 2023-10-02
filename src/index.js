import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

Notiflix.Notify.init({
  width: '500px',
  position: 'center-top',
});

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  // error: document.querySelector('p.error'),
  catInfo: document.querySelector('div.cat-info'),
};

fetchBreeds()
  .then(response => {
    refs.loader.classList.add('visually-hidden');
    refs.select.classList.remove('visually-hidden');
    const data = response.data;

    // __________________first variant_____________________
    const markup = data
      .map(({ name, id }) => `<option value="${id}">${name}</option>`)
      .join('');

    refs.select.insertAdjacentHTML('beforeend', markup);
    new SlimSelect({
      select: '.breed-select',
    });

    //__________________second variant____________________
    // const option = data.map(({ name, id }) => {
    //   return {
    //     text: name,
    //     value: id,
    //   };
    // });
    // new SlimSelect({
    //   select: '.breed-select',
    //   data: option,
    // });
    //_____________________________________________________
  })
  .catch(error => {
    refs.loader.classList.add('visually-hidden');
    // refs.error.classList.remove('visually-hidden');
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    console.log(error);
  });

refs.select.addEventListener('change', handleOptionClick);

function handleOptionClick() {
  refs.loader.classList.remove('visually-hidden');
  // refs.error.classList.add('visually-hidden');
  const optionId = refs.select.value;
  fetchCatByBreed(optionId)
    .then(response => {
      refs.loader.classList.add('visually-hidden');
      createMarkup(response.data);
      // const data = response.data;
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

function createMarkup(data) {
  const catInfo = data[0];
  const { url, breeds } = catInfo;
  const breed = breeds[0];
  const { name, description, origin, temperament, wikipedia_url, alt_names } =
    breed;

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
  refs.catInfo.innerHTML = markup;
}
