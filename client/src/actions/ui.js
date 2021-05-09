import { types } from "../types/types";

//Letter
export const uiOpenModalAddLetter = () => ({ type: types.uiAddLetterOpenModal})
export const uiCloseModalAddLetter = () => ({ type: types.uiAddLetterCloseModal})
export const uiOpenModalShowLetter = () => ({ type: types.uiOpenModalShowLetter})
export const uiCloseModalShowLetter = () => ({ type: types.uiCloseModalShowLetter})

//Photos
export const uiOpenModalAddPhotos = () => ({ type: types.uiOpenModalAddPhotos})
export const uiCloseModalAddPhotos = () => ({ type: types.uiCloseModalAddPhotos})
export const uiOpenModalShowPhotos = () => ({ type: types.uiOpenModalShowPhotos})
export const uiCloseModalShowPhotos = () => ({ type: types.uiCloseModalShowPhotos})