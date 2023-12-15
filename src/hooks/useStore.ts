 
 import { useReducer } from 'react';
import { type State, type Action, type Language, fromLanguage } from '../types.d';
import { AUTO_LANGUAGE } from '../constant';

 /* PASO 1 - CREAR EL ESTADO */
  const initalState : State = {
    "fromLanguage" : "es",
    "toLanguage" : "en",
    "fromText" : "",
    "result" : "",
    "loading" : false
  }



  /* PASO 2 - CREAR EL REDUCER */
  function reducer (state : State, action : Action){

    const { type } = action;

    switch (type) {
      case "INTERCHANGE_LANGUAGES":
      if(state.fromLanguage === AUTO_LANGUAGE) return state
      
        return {
          ...state,
          fromLanguage: state.toLanguage,
          toLanguage: state.fromLanguage,
        };
  
      case "SET_FROM_LANGUAGE":
        return {
          ...state,
          fromLanguage: action.payload,
        };
  
      case "SET_TO_LANGUAGE":
        return {
          ...state,
          toLanguage: action.payload,
        };
  
      case "SET_FROM_TEXT":
        return {
          ...state,
          loading: true,
          fromText: action.payload,
          result: "",
        };
  
      case "SET_RESULT":
        return {
          ...state,
          loading: false,
          result: action.payload,
        };
  
      default:
        return state;
    }
    }


    export function useStore(){

        const [{
            fromLanguage,
            toLanguage,
            fromText,
            result,
            loading
        }, dispatch] = useReducer(reducer, initalState); 
         

        function interchangeLanguage(){
            dispatch({type: "INTERCHANGE_LANGUAGES"})
        }

        function setFromLanguage(payload : fromLanguage){
            dispatch({type: "SET_FROM_LANGUAGE", payload})
        }

        function setToLanguage(payload : Language){
            dispatch({type:"SET_TO_LANGUAGE", payload})
        }

        function setFromText(payload:string){
            dispatch({type: "SET_FROM_TEXT", payload})
        }

        function setResult(payload : string){
            dispatch({type: "SET_RESULT", payload})
        }

        return {
            fromLanguage,
            toLanguage,
            fromText,
            loading,
            result,
            interchangeLanguage,
            setFromLanguage,
            setToLanguage,
            setFromText,
            setResult
        }
    }



