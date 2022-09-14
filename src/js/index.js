require('@babel/polyfill');
import Search from './model/Search';
import { elements, renderLoader, clearLoader } from './view/base';
import * as searchView from './view/SearchView';
import Recipe from './model/Recipe';
import {
  renderRecipe,
  clearRecipe,
  highlightSelectedRecipe,
} from './view/recipeView';
import List from './model/List';
import * as listView from './view/listView';

const state = {};

const controlSearch = async () => {
  // 1. Web search key gargaj avna
  const query = searchView.getInput();
  if (query) {
    // 2. Create New search obj
    state.search = new Search(query);
    // 3. Hailt hiihed zoriulj delgetsiig UI beltgene
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);
    // 4. Hailtiig guitsetgene
    await state.search.doSearch();
    // 5. Hailtiin result delgetsend uzuulne
    clearLoader();
    if (state.search.result === undefined) alert('Хайлтаар илэрцгүй ...');
    else searchView.renderRecipes(state.search.result);
  }
};

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});
elements.pageButtons.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const gotoPageNumber = parseInt(btn.dataset.goto, 10);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, gotoPageNumber);
  }
});

// Жорын контроллер

const controlRecipe = async () => {
  // 1. URL-aas ID-g salgah
  const id = window.location.hash.replace('#', '');
  // URL deer ID bgaa esehiig shalgana
  if (id) {
    // 2. Joriin modeliig uusgeh
    state.recipe = new Recipe(id);
    // 3. UI delgetsiig beltgene.
    clearRecipe();
    renderLoader(elements.recipeDiv);
    highlightSelectedRecipe(id);
    // 4. Joroo tataj avchirna
    await state.recipe.getRecipe();
    // 5. Joriig guitsetgeh hugatsaa bln ortsiig tootsoolno
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();

    // 6. Joroo delgetsend gargana.
    renderRecipe(state.recipe);
  }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

// deerh codiiin bichigleliig hemnej bn
['hashchange', 'load'].forEach((e) =>
  window.addEventListener(e, controlRecipe)
);

// Nairlaganii controller

const controlList = () => {
  // 1. nairlaganii modeliig uusgene
  state.list = new List();
  //Omno haragdaj bsn nairlaguudiig delgetsees zailuulna
  listView.clearItems();
  // 2. ug model ruu odoo haragdaj bgaa jornii buh nairlagiig avch hiine.
  state.recipe.ingredients.forEach((n) => {
    // Tuhain nairlagiig model ruu hiine
    const item = state.list.addItem(n);
    // Tuhain nairlagiig delgetsend gargana.
    listView.renderItem(item);
  });
};
elements.recipeDiv.addEventListener('click', (e) => {
  if (e.target.matches('.recipe__btn, .recipe__btn *')) {
    controlList();
  }
});

elements.shoppingList.addEventListener('click', (e) => {
  //click hiisen li elementiin data-itemid attribute iig shuuj gargaj avah
  const id = e.target.closest('.shopping__item').dataset.itemid;
  // oldson ID-tei ortsiig modeloos ustgana
  state.list.deleteItem(id);
  //Delgetsnees iim ID-tei ortsiig olj bas ustgana
  listView.deleteItem(id);
});
