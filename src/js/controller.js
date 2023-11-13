import * as model from './model.js';
import recipieViews from './views/recipieViews.js';
import searchView from './views/searchView.js';
import resultview from './views/resultview.js';
import paginationView from "./views/paginationView.js"
import icons from 'url:../img/icons.svg';
import bookmarkview from './views/bookmarkview.js';
import addrecipie from './views/addrecipie.js';


import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

export default icons;


const controlRecipes = async function () {
  try {

    const id = window.location.hash.slice(1);

    if (!id) return;
    recipieViews.renderspinner();



    // 0) Update results view to mark selected search result
    // resultview.update(model.getSearchResultsPage());
    resultview.update(model.getSearchResultpage());
    bookmarkview.update(model.state.bookmark)


    // 2) Loading recipe
    await model.loadRecipe(id);

    
    // 3) Rendering recipe
    recipieViews.render(model.state.recipe);
    ////////////////////////////////////////

 
    

    
    
  } catch (err) {
    recipieViews.renderError();
    console.error(err);
  }

};

const controlSearchResults = async function () {
  try {
    resultview.renderspinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadsearchresult(query);

    // 3) Render results
    resultview.render(model.getSearchResultpage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (gotopage) {
  // 1) Render NEW results
  resultview.render(model.getSearchResultpage(gotopage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};
//////////////////////////////////////////////////////////////////
const controlserving = function (newservings) {
  // update the recipie serving in state

  model.updateServing(newservings);
  // update the recipie view
  // recipieViews.render(model.state.recipe);
  recipieViews.update(model.state.recipe);
}

const controlBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addbookmark(model.state.recipe)
  else model.deletebookmark(model.state.recipe.id);

  // model.addbookmark(model.state.recipe);

  recipieViews.update(model.state.recipe);
  
  //
  bookmarkview.render(model.state.bookmark);

}
const cntrlbookmark = function () {
  bookmarkview.render(model.state.bookmark)
  
};


const controladdrecipie = async function (newrecipie) {
  try {
    addrecipie.renderspinner();

    await model.uploadRecipie(newrecipie);
    

    // render the recipie
    recipieViews.render(model.state.recipe)

    //success message
    addrecipie.rendermessage()

    bookmarkview.render(model.state.bookmark)


    // close window
    setTimeout(function () {
      addrecipie.toggelwindows();
    }, 1500);

    addrecipie.addhandlerupload(controladdrecipie);
  }
  catch(err) {
    addrecipie.renderError(err.message);
  }
}

const init = function () {
  bookmarkview.addhandlerrender(cntrlbookmark);
  recipieViews.addHandlerRender(controlRecipes);
  recipieViews.addhandlerupdateserving(controlserving)
  recipieViews.addhandleraddbookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerclick(controlPagination);
  addrecipie.addhandlerupload(controladdrecipie);

};
init();

