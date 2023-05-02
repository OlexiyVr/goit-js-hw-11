import refs from "./refs";
import { getImages } from "./get_images";
import simpleLightbox from "simplelightbox";

export async function onLoad() {
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