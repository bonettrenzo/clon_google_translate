import Form from 'react-bootstrap/Form';
import { SOPPORTED_LANGUAGES } from '../constant';
import {type FC} from "react";
import { fromLanguage, type Language } from '../types.d';


type Props = 
| {value: fromLanguage, onChange: (Language : fromLanguage) => void}
| {value: Language, onChange: (Language: Language) => void}


const LanguageSelector: FC<Props> = ({onChange, value }) => {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        onChange(event.target.value as Language)
    }
    
  return (
    <Form.Select aria-label="Selecciona el idioma" onChange={handleChange} value={value}>
        {
            Object.entries(SOPPORTED_LANGUAGES).map(([key, literal]) =>(
                <option key={key} value={key}>{literal}</option>
            ))
        }
    </Form.Select>
  );
}

export default LanguageSelector;