import view from "./View";
import icons from '../controller.js';


class paginationView extends view {
    _parentElement = document.querySelector('.pagination');

    addHandlerclick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return; // guard claus
            const gotopage = Number(btn.dataset.goto);
            handler(gotopage);

        });
    };

    _generateMarkup() {
        // this._clear()
        const curpage=this._data.page
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);


        //page 1, and other page
        if (curpage == 1 && numPages > 1) {

            return `
            <button data-goto="${curpage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${curpage + 1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>`;
        };

        // last page
        if (curpage == numPages && numPages > 1) {

            return `
            <button data-goto="${curpage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curpage - 1}</span>
            </button>`;
        };

        // other page
        if (curpage < numPages) {

            return `
            <button data-goto="${curpage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curpage - 1}</span>
            </button>
            <button data-goto="${curpage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${curpage + 1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
        };

        //page1, and there is no other page
        return '';
        
    }
}

export default new paginationView();