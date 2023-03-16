import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

// Notiflix.Notify.success('Too many matches found. Please enter a more specific name.');
// Notiflix.Notify.failure('Oops, there is no country with that name');

const refs = {
    input: document.querySelector(`#search-box`),
    countryList: document.querySelector(`.country-list`),
    countryInfo: document.querySelector(`.country-info`),
}

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))

function onInput(e) {
    e.preventDefault();

    fetchCountries()
    .then(renderCountryList)
    .catch(error => console.log(error))
}