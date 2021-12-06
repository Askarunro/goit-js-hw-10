import debounce from 'lodash.debounce';
import countryCard from '../templates/countries.hbs';
import listCountries from '../templates/listcountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  countryInform: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
};

refs.input.addEventListener('input', debounce(onInputClick, DEBOUNCE_DELAY));

function onInputClick(evt) {
  const searchCountry = evt.target.value;
  fetchCountry(searchCountry).then(renderInform).catch(onFetchError);
}

function fetchCountry(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function renderInform(countryInfo) {
  if (countryInfo.length === 1) {
    viewContry();
    return renderCountry(countryInfo);
  }
  viewContries();
  return renderListCountries(countryInfo);
}

function onFetchError(error) {
  // alert('fuck');
  Notiflix.Notify.failure('Oops, there is no country with that name');
  // Notiflix.Report.warning('Oops, there is no country with that name');
  // Notiflix.Notify.warning('Oops, there is no country with that name');
}

function renderListCountries(countries) {
  console.log(countries);
  const markup = listCountries(countries);
  refs.countryList.innerHTML = markup;
}

function renderCountry(country) {
  const markup = countryCard(...country);
  refs.countryInform.innerHTML = markup;
}

function viewContry() {
  refs.countryInform.classList.remove('hidden');
  refs.countryList.classList.add('hidden');
}

function viewContries() {
  refs.countryInform.classList.add('hidden');
  refs.countryList.classList.remove('hidden');
}
