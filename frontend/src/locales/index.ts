import { id } from "./id";
import { en } from "./en";

export type Language = "id" | "en";

export const translations = {
  id,
  en,
};

export type TranslationsType = typeof id;

export { id, en };
