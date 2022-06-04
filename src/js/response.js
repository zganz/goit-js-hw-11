const axios = require('axios');

export default async function getPictures(query,page) {
    let rootUrl = 'https://pixabay.com/api/?key=27763232-d5fad278e4d8773c17239879d&image_type=photo&pretty=true&orientation=horizontal&safesearch=true';

    let request = rootUrl + '&q='+query+'&page='+ page;
    console.log(request);

      try {
        const response = await axios.get(request);
        console.log(response);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
