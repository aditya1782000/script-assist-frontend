import {
  ADD_FILMS_URL,
  FILM_VIEW_URL,
  FILMS_LIST_URL,
  VIEW_CHARACTERS_URL,
} from "../../config/apiEndPoints";
import { ICharacter } from "../../utils/helpers/CharacterInterface";
import apiClient from "../client/api-client";

export const filmsList = async (data: any) => {
  return apiClient({ url: FILMS_LIST_URL, method: "POST", data });
};

export const viewFilms = (id: string) => {
  return apiClient({ url: FILM_VIEW_URL(id), method: "GET" });
};

export const viewCharacter = async (id: string) => {
  return apiClient({ url: VIEW_CHARACTERS_URL(id), method: "GET" });
};

export const addFilms = async (data: {
  title: string;
  description: string;
  director: string;
  producer: string;
  releaseDate: Date | null;
  characters: ICharacter[];
}) => {
  return apiClient({ url: ADD_FILMS_URL, method: "POST", data });
};
