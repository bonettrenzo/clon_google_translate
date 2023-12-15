/* import { useState, useReducer } from 'react' */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Button, Stack} from "react-bootstrap";
import { useStore } from './hooks/useStore';
import { AUTO_LANGUAGE } from './constant';
import { ArrowIcon, ClipboardIcon} from './components/Icone';
import LanguageSelector from './components/LanguageSelector';
import { SectionType } from './types.d';
import { TextArea } from './components/TextArea';
import { useEffect } from 'react';
import { translate } from './services/translate';
import { useDebounce } from './hooks/useDebounce';

  function App() {

    const {
      loading,
      fromLanguage, 
      toLanguage, 
      interchangeLanguage,
      setFromLanguage, 
      setToLanguage, 
      fromText, 
      result,
      setFromText, 
      setResult
     } = useStore();

     const debouncedValue = useDebounce(fromText, 500)

     useEffect(() => {
      if(debouncedValue === "") return
      
      translate({fromLanguage, toLanguage, text: debouncedValue})
      .then(result => {
        setResult(result)
      }).catch((error) => console.log(error))
     }, [debouncedValue, fromLanguage, toLanguage])
     

     const handleClipboard = (text : string) =>{
      navigator.clipboard.writeText(text)
     }

     
    return (
      <>
       
      <Container fluid>
        <h1>Google Translate</h1> 
        <Row>

          <Col xs="auto" style={{textAlign:"center"}}>
            <Stack gap={2}>
              <LanguageSelector 
                value={fromLanguage}
                onChange={setFromLanguage}
              />
              <div style={{position:"relative"}}>
                <TextArea
                  autoFocus={true}
                  type={SectionType.From}
                  value={fromText}
                  onChange={setFromText}
                />
                {
                  fromText.length > 0 ? 
                  (<>
                  <Button variant='link' onClick={() => {navigator.clipboard.writeText(fromText)}} style={{position: "absolute", bottom: "0", right:"0"}}>
                  <ClipboardIcon/>
                </Button>
                  </>) : ""
                }

              </div>

            </Stack>
          </Col>

          <Col xs="auto" style={{alignItems:"center"}}>
          <Button variant='link' disabled={AUTO_LANGUAGE == fromLanguage} onClick={interchangeLanguage}><ArrowIcon/></Button>
          </Col>

          <Col style={{textAlign:"center"}}>
            <Stack gap={2}>

              <LanguageSelector onChange={setToLanguage} 
                value={toLanguage}
              />

              <div style={{position:"relative"}}>
                <TextArea
                  loading={loading}
                  autoFocus={false}
                  type={SectionType.To}
                  value={result}
                  onChange={setResult}
                />
                {
                  result.length > 0 ?
                  <Button onClick={() => handleClipboard(result)} style={{position:"absolute", bottom:"0", right:"0"}} variant='link'><ClipboardIcon/></Button>
                  : ""
                }
              </div>

            </Stack>

          </Col>
        </Row>

      </Container>
      </>
    )
}

export default App

