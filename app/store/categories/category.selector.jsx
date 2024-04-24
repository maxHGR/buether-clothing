import { createSelector } from 'reselect';


const selectCategoryReducer = (state) => state.categories;

// 2 Selectors

// gets categories from the state
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// transforms categories into object where each key
// is a category title and the value is the items of that category
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

