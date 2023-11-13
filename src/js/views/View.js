 import icons from '../controller.js';
export default class view{

  _data;
  render(data,render=true) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;



    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

  _clear() {
      this._parentElement.innerHTML = '';
  }

  update(data) {
    // if (data || (Array.isArray(data) && data.length === 0)) {
    //   console.log("yahi hai ")
    //   return this.renderError()
    // };
    
    this.data = data;
    const newmarkup = this._generateMarkup();
    const newdom = document.createRange().createContextualFragment(newmarkup);
    const newElement = newdom.querySelectorAll("*");
    const curElement = this._parentElement.querySelectorAll("*");
    // console.log(newElement);
    // console.log(curElement);
    newElement.forEach((newEL, i) => {
      const curEL = curElement[i];
      // important update change text
      if (!newEL.isEqualNode(curEL) && newEL.firstChild?.nodeValue.trim() !== "") {
        curEL.textContent = newEL.textContent;
      }

      // update change attribute

      if (!newEL.isEqualNode(curEL)) {
        Array.from(newEL.attributes).forEach(attr => curEL.setAttribute(attr.name, attr.value));
      };

    });
  }
    

  renderspinner = function () {
      const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
      this._parentElement.innerHTML = '';
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
  
    renderError(message = this._errorMessage) {
      const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  rendermessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
      

}