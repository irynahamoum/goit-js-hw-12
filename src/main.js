import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const galleryGrid = document.querySelector('.gallery-grid');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.js-load-more-btn');

let gallery = new SimpleLightbox('.gallery-grid a', {
  captionsData: 'alt',
});

form.addEventListener('submit', handleFormSubmit);
loadMoreBtn.addEventListener('click', handleLoadBtnClick);

let page = 1;
let inputValue;
let totalPages = 0;

async function handleFormSubmit(event) {
  event.preventDefault();
  hideLoadMoreBtn();

  galleryGrid.innerHTML = '';

  inputValue = event.target.elements.query.value.trim();

  showLoader();

  if (!inputValue) {
    galleryGrid.innerHTML = '';
    iziToast.error({
      message: 'Search field is empty',
      position: 'topRight',
    });

    hideLoader();
    return;
  }

  try {
    page = 1;
    const data = await getImagesByInputValue();
    if (data?.hits?.length) {
      hideLoader();
      totalPages = Math.ceil(data.totalHits / 15);
      checkLoadBtnStatus();
      createMarkupByHits(data.hits);

      return;
    }
    throw Error(
      'Sorry, there are no images matching your search query. Please try again!'
    );
  } catch (error) {
    iziToast.info({
      message:
        typeof error === 'string' ? error : 'Something went wrong, sorry!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }

  event.target.reset();
}

async function handleLoadBtnClick(event) {
  showLoader();
  hideLoadMoreBtn();

  try {
    page += 1;

    const data = await getImagesByInputValue();
    if (data?.hits?.length) {
      hideLoader();
      checkLoadBtnStatus();
      createMarkupByHits(data.hits);
      const cardHeight = document
        .querySelector('.gallery-card')
        .getBoundingClientRect().height;
      scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
      return;
    }
    throw Error(
      'Sorry, there are no images matching your search query. Please try again!'
    );
  } catch (error) {
    iziToast.info({
      message:
        typeof error === 'string' ? error : 'Something went wrong, sorry!',
      position: 'topRight',
    });
  }
  event.target.reset();
}

function checkLoadBtnStatus() {
  if (totalPages !== page) {
    showLoadMoreBtn();
  } else {
    hideLoadMoreBtn();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  }
}

function showLoader() {
  loader.style.display = 'inline-block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('hidden');
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('hidden');
}

async function getImagesByInputValue() {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '42157668-d969611c6fdd34526589fe987',
      q: inputValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safeSearch: true,
      page: page,
      per_page: 15,
    },
  });
  return response.data;
}

function createMarkupByHits(hits) {
  const galleryItem = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a href="${largeImageURL}" class="gallery-card">
      <img src="${webformatURL}" alt="${tags}" >
      <div class="img-details-box">
      <p class="detail-item"><b>Likes:</b> ${likes}</p>
      <p class="detail-item"><b>Views:</b> ${views}</p>
      <p class="detail-item"><b>Comments:</b> ${comments}</p>
      <p class="detail-item"><b>Downloads:</b> ${downloads}</p></div>
      </a>`;
      }
    )
    .join('');

  galleryGrid.insertAdjacentHTML('beforeend', galleryItem);

  gallery.refresh();
}
