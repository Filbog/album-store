// API request setup
const APIKEY = "89f20445788ab5ad5af51b3231833937"; // my Last.fm API key
const artist = "Led%20Zeppelin"; //for simplicity
const limit = 30;
const url = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${APIKEY}&format=json&limit=${limit}`;

// Fetch albums from API
export function fetchAlbums() {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      let albums = albumsValidation(data.topalbums.album);
      return albums;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//some entries come empty from the API, we don't want those displayed
function albumsValidation(albums) {
  //starting from the end of the array so that deleting the el won't make the loop skip any els
  for (let i = albums.length - 1; i >= 0; i--) {
    if (albums[i].name === "(null)") {
      albums.splice(i, 1);
    }
  }
  return albums;
}
