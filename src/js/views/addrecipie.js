import view from "./View";
import {icons} from '../controller.js';



class addrecipieView extends view {
    _message="Recipie is succesfully uploaded"
    _parentElement = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnopen = document.querySelector('.nav__btn--add-recipe');
    _btnclose = document.querySelector('.btn--close-modal');

    constructor() {
        super();
        this._addHandlershowwindow();
        this._addhandlerhidewindow();
    };

    toggelwindows() {
        this._overlay.classList.toggle('hidden')
        this._window.classList.toggle('hidden');
    };

    _addHandlershowwindow() {
        this._btnopen.addEventListener('click', this.toggelwindows.bind(this))
    };
    _addhandlerhidewindow() {
        this._btnclose.addEventListener('click', this.toggelwindows.bind(this));
        this._overlay.addEventListener('click',this.toggelwindows.bind(this))
    };

    addhandlerupload(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)]
            const data = Object.fromEntries(dataArr);
            handler(data)
        });
    };

    //////////
    _generatemarkup() {
        
    }

}

export default new addrecipieView();