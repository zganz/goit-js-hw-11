import './sass/main.scss';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";
import renderData from './js/render';
const axios = require('axios');
let page = 0;
let query = "";
let rootUrl = 'https://pixabay.com/api/?key=27763232-d5fad278e4d8773c17239879d&image_type=photo&pretty=true&orientation=horizontal&safesearch=true';

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
    
    renderData (data.hits,gallery);  
})
  .catch(error => errorHandling());  
}

function onSearchFormSubmit(event) {
    event.preventDefault();
    query = event.target.elements["searchQuery"].value;
    if (query.trim() === '') {
      gallery.innerHTML = '';
      Notiflix.Notify.failure("Не корректный ввод");
      return false;
  }; 
    loadMoreBt.style.display = 'block';
    onLoadMore();
}



async function getPictures(query,page) {
  let request = rootUrl + '&q='+query+'&page='+ page;
    try {
      const response = await axios.get(request);
    //   console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }