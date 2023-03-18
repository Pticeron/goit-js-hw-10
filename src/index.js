import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import countryInfoTpl from './templates/country-info.hbs';
import countryListTpl from './templates/country-list.hbs';
import API from "./fetchCountries.js";

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
    clearCountryList();
    const countryName = e.target.value.trim();

    if (countryName === '') {
        return;
    }

API.fetchCountries(cantryName)
.then(cantryCards => {
    const numberOfCountries = cantryCards.length;

    if (numberOfCountries > 10) Notify.info("Too many matches found. Please enter a more specific name.");

    else if (numberOfCountries >= 2 && numberOfCountries <= 10) {
        renderCountryList(countryCards);
    } 
    else if (numberOfCountries === 1) {
        renderCountryInfo(countryCards);
    }
})
.catch(onFetchError)
}
