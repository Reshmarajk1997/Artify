
//fetching data

// document.addEventListener('DOMContentLoaded',()=>{

  

// })

//https://api.unsplash.com/photos/random?query=classic-art&count=15&orientation=portrait&client_id='n-CAkac-2IA_WHksB-Rqf-R1NXuMD4iJ-fO-9CtnohY'

const accessKey = 'n-CAkac-2IA_WHksB-Rqf-R1NXuMD4iJ-fO-9CtnohY';

const fetchPhotos = async (urlOfArt)=>{

  const cacheKey = 'cachedPhotos';
  const cachedData = localStorage.getItem(cacheKey)

  // if(cachedData){
  //   const data = JSON.parse(cachedData);
  //   displayPhotos(data);
  // }else{

    const url = urlOfArt;

  try {

    const response = await fetch(url);
    const data = await response.json()

    // console.log(data)

    // localStorage.setItem(cacheKey,JSON.stringify(data));
    displayPhotos(data);

  } catch (error) {
    console.log('Error is ',error)
  // }
  }
  
}




const displayPhotos = (data)=>{
  const imgContainer = document.getElementById('photoContainer');
  imgContainer.innerHTML = ''; 
  data.forEach(photo => {
    const imgElement = document.createElement('img');
    imgElement.src = photo.urls.small;
    imgElement.alt = photo.alt_description || 'Art Image'
    imgElement.style.cursor = 'pointer';
    imgContainer.appendChild(imgElement);


    imgElement.addEventListener('click',()=>{
      showModal(photo);
    })
  });
}

      let currentPhoto;

const showModal = (photo)=>{
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const artistName = document.getElementById('artistName');
  const description = document.getElementById('description');

 
  modal.style.display = 'block';

  modalImg.src = photo.urls.regular;
  // imageDetails.innerHTML = `
 
  artistName.innerHTML = `Artist: ${photo.user.name}`;
  description.innerHTML = `Description : ${photo.alt_description}`

  currentPhoto = photo;
 

  // let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  // const isAlreadyFavourite = favourites.some(fav => fav.id === currentPhoto.id);
  

};


const addToFavourites = document.getElementById('addToFavourites');
addToFavourites.addEventListener('click', ()=>{
  let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

  const isAlreadyFavourite = favourites.some(fav=> fav.id === currentPhoto.id);

  if(!isAlreadyFavourite){
    favourites.push(currentPhoto);
    localStorage.setItem('favourites', JSON.stringify(favourites));
    alert('Added to favourites!');
  }else {
    alert('This item is already in your favourites!');
  }

})


const closeModal = ()=>{
  const modal = document.getElementById('imageModal');
  modal.style.display = 'none';
}

document.querySelector('.close').addEventListener('click',closeModal)


//displaying favourites

const displayFavourites = ()=>{
  const favourites  = JSON.parse(localStorage.getItem('favourites'))|| [];
  const imgContainer = document.getElementById('photoContainer');
  imgContainer.innerHTML = '';
  
  if(favourites.length == 0){
    imgContainer.innerHTML = `<p>No favourites yet!</p>`;
  }else{
    favourites.forEach(photo=>{
      const imgElement = document.createElement('img');
      imgElement.src = photo.urls.small;
      imgElement.alt = photo.alt_description || 'Favourite Image';
      imgElement.style.cursor = 'pointer';
      imgContainer.appendChild(imgElement);

      imgElement.addEventListener('click', () => {
        showModal(photo);
      });
    })
  }
}

const favouritesBtn  = document.getElementById('favourites');
favouritesBtn.addEventListener('click',displayFavourites);

 //classicArts

 const urlOfClassicArt = `https://api.unsplash.com/photos/random?query=classic-art&count=15&orientation=portrait&client_id=${accessKey}`

  fetchPhotos(urlOfClassicArt)


 const classicArt = document.getElementById('classicArts');
 classicArt.addEventListener('click',()=>fetchPhotos(urlOfClassicArt))



//Modern Arts

const urlOfModernArt = `https://api.unsplash.com/photos/random?query=modern-art&count=15&orientation=portrait&client_id=${accessKey}`

const modernArt = document.getElementById('modernArts');

modernArt.addEventListener('click',()=>fetchPhotos(urlOfModernArt));


//Sculptures
 
const urlOfSculptureArt = `https://api.unsplash.com/photos/random?query=sculpture&count=15&orientation=portrait&client_id=${accessKey}`

const sculptureArt = document.getElementById('sculptures');

sculptureArt.addEventListener('click',()=>fetchPhotos(urlOfSculptureArt));


//Traditional Arts

const urlOfTraditionalArt = `https://api.unsplash.com/photos/random?query=traditional-art&count=15&orientation=portrait&client_id=${accessKey}`

const traditionalArt = document.getElementById('traditionalArts');

traditionalArt.addEventListener('click',()=>fetchPhotos(urlOfTraditionalArt));



