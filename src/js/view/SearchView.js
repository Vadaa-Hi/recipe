import { elements } from './base';

const renderRecipe = (recipe) => {
  const markup = `
                     <li>
                        <a class="results__link" href="#${recipe.recipe_id}">
                            <figure class="results__fig">
                                <img src="${recipe.image_url}" alt="Test">
                            </figure>
                            <div class="results__data">
                                <h4 class="results__name">${recipe.title}</h4>
                                <p class="results__author">${recipe.publisher}</p>
                            </div>
                        </a>
                    </li>
                `;
  // ul ruugee нэмнэ
  elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};
export const clearSearchQuery = () => {
  elements.searchInput.value = '';
};
export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = '';
  elements.pageButtons.innerHTML = '';
};
export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
  // Хайлтын үр дүнг хуудаслаж үзүүлэх
  // page = 2, start = 10, end = 20
  const start = (currentPage - 1) * resPerPage;
  const end = currentPage * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);

  //хуудаслалтын товчуудыг гаргах
  const totalPages = Math.ceil(recipes.length / resPerPage);
  renderButttons(currentPage, totalPages);
};
// type ===> 'prev' , 'next'
const createButton = (
  page,
  type,
  direction
) => `<button class="btn-inline results__btn--${type}" data-goto=${page}>
<span>Хуудас ${page}</span>
  <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${direction}"></use>
  </svg>
  </button>`;

const renderButttons = (currentPage, totalPages) => {
  let buttonHtml;
  if (currentPage === 1 && totalPages > 1) {
    //1-r huudsan dr baina, 2-r huudas gdg tovchiig garga
    buttonHtml = createButton(2, 'next', 'right');
  } else if (currentPage < totalPages) {
    // omnoh bln daraachiiin huudas ruu shiljih tovchiig uzuul
    buttonHtml = createButton(currentPage - 1, 'prev', 'left');
    buttonHtml += createButton(currentPage + 1, 'next', 'right');
  } else if (currentPage === totalPages) {
    // Hamgiin suuliin huudas dr baina. Omnoh ruu shiljuuleh tovchiig l uzuulne.
    buttonHtml = createButton(currentPage - 1, ' prev', 'left');
  }
  elements.pageButtons.insertAdjacentHTML('afterbegin', buttonHtml);
};
