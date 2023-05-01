import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import './css/styles.css';
import refs from './js/refs';
import { getImages } from './js/get_images';
import { onSearch } from './js/onSearch';
import { onLoad } from './js/onLoad';


let currentPage = 1;

const gallery = new SimpleLightbox('.gallery a');

refs.search.addEventListener('submit', onSearch);
refs.loadmore.addEventListener('click', onLoad);




