import {Form} from "react-bootstrap"
import { SectionType } from "../types.d"
 
type Props = {
  loading?: boolean,
  autoFocus: boolean
  onChange: (value: string) => void, 
  value: string,
  type: SectionType
}

const getPlaceholder = ({type, loading} : {type:string, loading?:boolean}) => {
  if(type === SectionType.From) return "Introducir texto"
  if(loading === true) return "Cargando..."
  return "Traducción"
}


export const TextArea = ({ type, autoFocus, loading, value, onChange }: Props) => { 
  
  const handleChange = (event : React.ChangeEvent<HTMLTextAreaElement>) =>{
    onChange(event.target.value)
  }

  return(<Form.Control
    as='textarea'
    autoFocus={autoFocus && type === SectionType.From}  
    placeholder={getPlaceholder({type, loading})}
    style={{ height: "150px", border:"0", resize: "none" }}
    value={value} 
    onChange={handleChange}  
    disabled={type === SectionType.To ? true : false}
  />)
};