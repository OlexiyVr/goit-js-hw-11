import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import OnlyScroll from 'only-scrollbar';
const scroll = new OnlyScroll(document.querySelector('.scroll-container'));

import './css/styles.css';
import refs from './js/refs';
import { getImages } from './js/get_images';

let currentPage = 1;

const gallery = new SimpleLightbox('.gallery a');

refs.search.addEventListener('submit', onSearch);
refs.loadmore.addEventListener('click', onLoad);

async function onSearch(event) {
  event.preventDefault();
  refs.card.innerHTML = '';
  refs.loadmore.hidden = true;
  if (!refs.search.elements.searchQuery.value) {
    return;
  }
  refs.search.elements[1].disabled = true;
  try {
    const cardImage = await getImages(refs.search.elements.searchQuery.value);
    refs.search.elements[1].disabled = false; 
    gallery.refresh(); 
    return cardImage;
  } catch (error) {
    console.log(error);
  }
}

async function onLoad() {
  currentPage += 1;
  try {
    const addImages = await getImages(
      refs.search.elements.searchQuery.value,
      currentPage
    );
    gallery.refresh(); 
    return addImages;
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('scroll', scrollFunction);

function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    refs.btnUpWrapper.style.display = 'flex';
  } else {
    refs.btnUpWrapper.style.display = 'none';
  }
}
refs.btnUp.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});