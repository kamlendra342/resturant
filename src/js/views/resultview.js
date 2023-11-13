import view from "./View";
import { icons } from '../controller.js';
import previewView from "./previewView.js";


class resultviews extends view {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'NO recipie found for your search';
  _message = '';

  _generateMarkup() {
    // this._clear()
    if (!this._data) return; // i added 

    return this._data.map(result => previewView.render(result,false)).join("");
  }

  // _generateMarkupPreview(result) {
  //   const id = window.location.hash.slice(1);
  //     return `
  //     <li class="preview">
  //         <a class="preview__link ${result.id===id ?'preview__link--active':""}" href="#${result.id}">
  //           <figure class="preview__fig">
  //             <img src="${result.image}" alt="${result.title}" />
  //           </figure>
  //           <div class="preview__data">
  //             <h4 class="preview__title">${result.title}</h4>
  //             <p class="preview__publisher">${result.publisher}</p>
  //           </div>
  //         </a>
  //     </li>
  //     `
  //   }

}

export default new resultviews();