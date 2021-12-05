import debounce from 'lodash.debounce';
import countryCard from '../templates/countries.hbs';
import listCountries from '../templates/listcountries';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  countryInform: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
};

refs.input.addEventListener('input', debounce(onInputClick, DEBOUNCE_DELAY));

function onInputClick(evt) {
  const searchCountry = evt.target.value;
  fetchCountry(searchCountry)
    .then(renderInform)
    .catch(error => console.log('error'));
}

function fetchCountry(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
    return response.json();
  });
}

function renderInform(countryInfo) {
  if (countryInfo.length === 1) {
    return renderCountry(countryInfo);
  }
  renderListCountries(countryInfo);
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
