require('@babel/polyfill');
import Search from './model/Search';
import { elements, renderLoader, clearLoader } from './view/base';
import * as searchView from './view/SearchView';

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
