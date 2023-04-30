import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
  refs.search.elements[1].disabled = true; // дезактивація пошуку
  try {
    const cardImage = await getImages(refs.search.elements.searchQuery.value);
    refs.search.elements[1].disabled = false; // активація пошуку
    gallery.refresh(); // Метод SimpleLightbox
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
    gallery.refresh(); // Метод SimpleLightbox
    return addImages;
  } catch (error) {
    console.log(error);
  }
}

const list = document.querySelector('.scroll-container');
list.scrollTop = 1;
list.addEventListener('scroll', function(ev) {
  let items = this.querySelectorAll('.gallery');
  if (parseInt(this.scrollTop) == 0) {
    this.scrollTop = items[items.length - 1].clientHeight;
    this.prepend(items[items.length - 1]);
    this.scrollTop = 1;
  } else if (this.scrollTop > this.scrollHeight - this.clientHeight - 1) {
    this.append(items[0]);
  }
  return false;
});