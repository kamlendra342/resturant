import { async } from 'regenerator-runtime';
import { API_URL, res_per_page,KEY } from './config.js';
import { sendJSON } from './helper.js';


export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: res_per_page,
        page:1,
    },
    bookmark:[],
};

const createrecipiesobject = function (data) {
    if (data.status=='fail') return;
    const { recipe } = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        servings: recipe.servings,
        image: recipe.image_url,
        sourceUrl: recipe.source_url,
        publisher: recipe.publisher,
        ...(recipe.key &&{key:recipe.key}),
    };
};

export const loadRecipe = async function (id) {
    try {
        const res = await fetch(`${API_URL}/recipes/${id}?key=${KEY}`);

        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} `);

        const { recipe } = data.data;

        state.recipe = createrecipiesobject(data);

        if (state.bookmark.some(bookmark => bookmark.id === id))
            state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;
    }
    catch (err) {
        alert(err);
    }
};

export const loadsearchresult = async function (query) {
    try {
        state.search.query = query;
        const data = await fetch(`${API_URL}/recipes?search=${query}&key=${KEY}`);
        const value = await data.json()
        state.search.results = value.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                image: rec.image_url,
                publisher: rec.publisher
            };
        });
        state.search.page = 1;
    }
    catch (err) {
        console.error('error in search');
    }
};

export const getSearchResultpage = function (page=state.search.page) {

    state.search.page = page;
    const start = (page-1)*state.search.resultsPerPage ;
    const end = page*state.search.resultsPerPage ;
    return state.search.results.slice(start, end)
};
/////////////////////////////////////////////////////////////////////////////
export const updateServing = function (newservings) {
    state.recipe.ingredients.forEach(ing => {
        
        ing.quantity = (ing.quantity * newservings) / state.recipe.servings
    });
    state.recipe.servings = newservings;
};


const persistBookmark = function () {
    localStorage.setItem('bookmark', JSON.stringify(state.bookmark));
}

export const addbookmark = function (recipe) {
    state.bookmark.push(recipe); 

    // mark current recipie as book mark
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    persistBookmark();
    
}
export const deletebookmark = function (id) {
    //////
    const index = state.bookmark.findIndex(el => el.id == id);
    state.bookmark.splice(index, 1);
    /////////
    if (id === state.recipe.id) state.recipe.bookmarked = false;
    persistBookmark();
};

const init = function () {
    const storage=localStorage.getItem('bookmark');
    if (storage) state.bookmark = JSON.parse(storage);
}
init();

const clearbookmark = function () {
    localStorage.clear('bookmark');
  };
// clearbookmark()

export const uploadRecipie = async function (newrecipie) {
try {
    const ingredients = Object.entries(newrecipie).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '').map(ele => {
        const eleArr = ele[1].replaceAll(" ", "").split(',');
        if (eleArr.length !== 3) throw new Error('Wrong format entry');
        const [quantity, unit, description] = eleArr;
        
        return { quantity: quantity? +quantity:null, unit, description };
    });

    const recipe = {
        title: newrecipie.title,
        cooking_time: +newrecipie.cookingTime,
        ingredients: ingredients,
        servings: +newrecipie.servings,
        image_url: newrecipie.image,
        source_url: newrecipie.sourceUrl,
        publisher: newrecipie.publisher,
    };

    const data = await sendJSON(`https://forkify-api.herokuapp.com/api/v2/recipes?key=${KEY}`, recipe);

    state.recipe = createrecipiesobject(data);
    addbookmark(state.recipe);


} catch (err) {
    console.error(err)
    throw Error(err);
    };
}









