// Auth Endpoints
export const USER_LOGIN_URL = "/user/login";
export const SIGNUP_URL = "/register/user";
export const USER_LOGOUT_URL = "/user/logout";

// Films Endpoints
export const FILMS_LIST_URL = "/user/films/list";
export const FILM_VIEW_URL = (id: string) => `/user/film/${id}/view`;
export const VIEW_CHARACTERS_URL = (id: string) =>
  `/user/film/${id}/view/character`;
export const ADD_FILMS_URL = "/user/films/add";
