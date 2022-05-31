import './sass/main.scss';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";
const axios = require('axios');
let request = '';
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSearchFormSubmit);


function onSearchFormSubmit(event) {
    event.preventDefault();
    let query = event.target.elements["searchQuery"].value;
    request = 'https://pixabay.com/api/?key=27763232-d5fad278e4d8773c17239879d&image_type=photo&pretty=true&q='+query;
console.log(request);

getUser().then(data => {        
    if (data.totalHits === 0) {
        
        return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    };       
    
    renderData (data.hits)  
})
    .catch(error => errorHandling());    


}

function renderData (data){
    console.log(data);
    let item =`<div class="photo-card">
    <img src="" alt="" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
      </p>
      <p class="info-item">
        <b>Views</b>
      </p>
      <p class="info-item">
        <b>Comments</b>
      </p>
      <p class="info-item">
        <b>Downloads</b>
      </p>
    </div>
  </div>`;

}

async function getUser() {
    try {
      const response = await axios.get(request);
    //   console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }