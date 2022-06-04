import './sass/main.scss';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";
import renderData from './js/render';
import getPictures from './js/response';
let page = 0;
let query = "";

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBt = document.querySelector('.load-more');
loadMoreBt.style.display = 'none';
loadMoreBt.addEventListener('click', onLoadMore);

searchForm.addEventListener('submit', onSearchFormSubmit);

function onLoadMore(){
page = page+1;
  getPictures(query,page).then(data => {        
      if (data.totalHits === 0) {
      
      return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  };      
    if(data.hits.length){
    renderData (data.hits,gallery);
  }
  else{
    loadMoreBt.style.display = 'none';
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  }
})
  .catch(error => errorHandling());  
}

function onSearchFormSubmit(event) {
    event.preventDefault();
    page = 0;
    gallery.innerHTML = '';
    query = event.target.elements["searchQuery"].value;
    if (query.trim() === '') {
      gallery.innerHTML = '';
      Notiflix.Notify.failure("Не корректный ввод");
      return false;
  }; 
    loadMoreBt.style.display = 'block';
    onLoadMore();
}
