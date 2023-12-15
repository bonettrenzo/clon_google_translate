/* import { SOPPORTED_LANGUAGES } from "../constant";
 */import { Language, fromLanguage } from "../types.d";


 interface RespuestaTraduccion {
  responseData: {
    translatedText: string;
  };
}

export async function translate({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: fromLanguage;
  toLanguage: Language;
  text: string;
}): Promise<string> {
  const linkApi = `https://api.mymemory.translated.net/get?q=${text}&langpair=${fromLanguage}|${toLanguage}`;

  try {
    const response = await fetch(linkApi);

    if (!response.ok) {
      throw new Error('Error al traducir el texto');
    }

    const json: RespuestaTraduccion = await response.json();
    
    return json.responseData.translatedText;
  } catch (error) {
    throw new Error('Hubo un error al procesar la traducción');
  }
}


