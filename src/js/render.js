export default function renderData (data,gallery){
    // console.log(data);
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