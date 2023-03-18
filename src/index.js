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
console.log(onInput);
API.fetchCountries(countryName)
.then(countryCards => {
    const numberOfCountries = countryCards.length;

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

function renderCountryInfo(card) {
    const markup = countryInfoTpl(card);
    refs.countryInfo.innerHTML = markup;
}

function renderCountryList(card) {
    const markup = countryListTpl(card);
    refs.countryList.innerHTML = markup;
}

function clearCountryList() {
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
}

function onFetchError(error) {
    console.log('error :>> ', error);
    Notify.failure("Oops, there is no country with that name")
}
