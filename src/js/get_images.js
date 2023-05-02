import refs from './refs';
import { createMarkup } from './markup';
import Notiflix from 'notiflix';
import axios from 'axios';
Notiflix.Notify.init({
  width: '280px',
  position: 'center-top',
  opacity: 1,
  timeout: 2000,
  distance: '40px',
});
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35837972-e713b2afc244ad183858051af';
export let currentPage = 1;
export let currentQuery = '';
export async function getImages(name) {
  if (currentQuery !== name) {
    currentPage = 1;
    currentQuery = name;
  }
  const params = new URLSearchParams({
    key: API_KEY,
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: currentPage,
  });
  const response = await axios.get(`${BASE_URL}?${params}`);
  const datas = response.data;
  refs.loadmore.hidden = false;
  if (currentPage === 1 && datas.totalHits !== 0) {
    Notiflix.Notify.info(`Hooray! We found ${datas.totalHits} images.`);
    refs.header.classList.add('opac');
  }
  refs.card.insertAdjacentHTML('beforeend', createMarkup(datas.hits));
  if (
    refs.card.childNodes.length + 1 > datas.totalHits &&
    datas.totalHits !== 0
  ) {
    refs.loadmore.hidden = true;
    refs.header.classList.remove('opac');
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
  if (!datas.hits.length) {
    refs.loadmore.hidden = true;
    refs.header.classList.remove('opac');
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  if (name !== currentQuery) {
    currentQuery = name;
    currentPage = 1;
  } else {
    currentPage += 1;
  }
  return datas;
}