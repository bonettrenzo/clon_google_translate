import { AUTO_LANGUAGE, SOPPORTED_LANGUAGES } from "./constant";

export type Language = keyof typeof SOPPORTED_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;     
export type fromLanguage = Language | AutoLanguage;

export interface State {
    "fromLanguage" : fromLanguage,
    "toLanguage" : Language,
    "fromText" : string,
    "result" : string,
    "loading" : boolean
}

export type Action =
  | { type: "INTERCHANGE_LANGUAGES" }
  | { type: "SET_FROM_LANGUAGE"; payload: fromLanguage }
  | { type: "SET_TO_LANGUAGE"; payload: Language }
  | { type: "SET_FROM_TEXT"; payload: string }
  | { type: "SET_RESULT"; payload: string };

  export enum SectionType  {
    From="from",
    To="to"
  }