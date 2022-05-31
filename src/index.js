import './sass/main.scss';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";
const axios = require('axios');
let page = 0;
let query = "";
let rootUrl = 'https://pixabay.com/api/?key=27763232-d5fad278e4d8773c17239879d&image_type=photo&pretty=true&orientation=horizontal&safesearch=true';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBt = document.querySelector('.load-more');
loadMoreBt.addEventListener('click', onLoadMore);

searchForm.addEventListener('submit', onSearchFormSubmit);

function onLoadMore(){
page = page+1;
getPictures(query,page).then(data => {        
  if (data.totalHits === 0) {
      
      return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  };       
  
  renderData (data.hits);  
})
  .catch(error => errorHandling());  
}

function onSearchFormSubmit(event) {
    event.preventDefault();
    query = event.target.elements["searchQuery"].value;
  
    onLoadMore();
}

function renderData (data){
    console.log(data);
    data.forEach(function(element){
      
      let item =`<div class="photo-card">
        <img src="${element.webformatURL}" alt="" loading="lazy" class='gallery__image' />
        <div class="info">
          <p class="info-item">
            <b>Likes -"${element.likes}"</b>
          </p>
          <p class="info-item">
            <b>Views - ${element.views}</b>
          </p>
          <p class="info-item">
            <b>Comments - ${element.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads - ${element.downloads}</b>
          </p>
        </div>
      </div>`;
      gallery.insertAdjacentHTML("beforeend", item);
    });
    
      
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