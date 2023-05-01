import refs from "./refs";
export async function onSearch(event) {
  event.preventDefault();
  refs.card.innerHTML = ``;
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