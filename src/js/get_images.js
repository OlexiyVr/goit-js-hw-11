import refs from './refs';
import { createMarcup } from './markup';
import Notiflix from 'notiflix';

// Налагоджування NOTIFLIX
Notiflix.Notify.init({
    width: '290px',
    opacity: 1,
    timeout: 2000,
    position: 'center-top',
    distance: '30px',
});

const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35837972-e713b2afc244ad183858051af';

export async function getImages(name, page = 1) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: name,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
    });

    const response = await axios.get(`${BASE_URL}?${params}&page=${page}`);
    const datas = response.data;
    refs.loadmore.hidden = false;

    if (page === 1 && datas.totalHits !== 0) {
        Notiflix.Notify.info(`Hooray! We found ${datas.totalHits} images.`);
        refs.header.classList.add('opac');
    }

    // Додавання карток
    refs.card.insertAdjacentHTML('beforend', createMarcup(datas.hits));

    // Прибирання "Load more" по закінченню на сервері карток
    if (refs.card.childNodes.length + 1 > datas.totalHits && datas.totalHits !== 0) {
        refs.loadmore.hidden = true;
        refs.header.classList.remove('opac');
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    }

    // перевірка за пошуком який відсутній на сервері
    if (!datas.hits.length) {
        refs.loadmore.hidden = true;
        refs.header.classList.remove('opac');
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
    }
}