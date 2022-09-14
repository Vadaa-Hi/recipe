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
};
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);
