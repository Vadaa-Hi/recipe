export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchResultDiv: document.querySelector('.results'),
  searchResultList: document.querySelector('.results__list'),
  pageButtons: document.querySelector('.results__pages'),
  recipeDiv: document.querySelector('.recipe'),
};

export const elementStrings = {
  loader: 'loader',
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  // loader dotor utaga bga esehiig shalgaj bn. Дараа parentiig n olj bn. Tgd parentaasee loader classtai diviig ustgaj bn.
  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};
export const renderLoader = (parent) => {
  const loader = `
      <div class = '${elementStrings.loader}' >
        <svg>
          <use href = 'img/icons.svg#icon-cw'></use>
        </svg>
      </div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);
};
