import * as UI from './interfaz.js';
import { API } from './api.js';

//event Listeners
UI.formSearch.addEventListener('submit', (e) => {
  e.preventDefault();
  
  //Get data
  const artista = document.querySelector('#artista').value,
        cancion = document.querySelector('#cancion').value;

  if (artista === '' || cancion === '') {
    //Se muestra mensaje de error
    UI.divMessages.innerHTML = 'Error... Todos los campos son obligatorios';
    UI.divMessages.classList.add('error');
    setTimeout(() => {
      UI.divMessages.innerHTML = '';
      UI.divMessages.classList.remove('error');
    }, 3000);
  } else {
    //El formulario se completó, hacer consulta a la api
    const api = new API(artista, cancion);
    api.queryAPI()
      .then(data => {

        if (data.response.lyrics) {

          const lyrics = data.response.lyrics;
          UI.divResults.textContent = lyrics;
          
        } else {
          //mostrar mensaje de error, no se encontró la canción
          UI.divMessages.innerHTML = 'Error... La canción no existe';
          UI.divMessages.classList.add('error');
          
          setTimeout(() => {
            UI.divMessages.innerHTML = '';
            UI.divMessages.classList.remove('error');
          }, 3000);

          UI.formSearch.reset();
        }
        
      })
  }
  
})

