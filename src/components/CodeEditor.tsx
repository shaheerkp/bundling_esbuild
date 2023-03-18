import React from 'react'
import MonacoEditor from '@monaco-editor/react';
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import './CodeEditor.css'

interface CodeEditorProps{
  input:string;
  onChange(value:string):void;
}


export const CodeEditor:React.FC<CodeEditorProps> = ({input,onChange}) => {


  const onEditorChange=(value:any)=>{
onChange(value)
  }

  const onFormatClick=()=>{
     const formatted=prettier.format(input,{
      parser:"babel",
      plugins:[parser],
      useTabs:false,
      semi:true,
      singleQuote:true
     }).replace(/\n$/,""); 
    onChange(formatted)
  }

  return (
  <div  className='editor-wrapper'> 
    
    <button className='button button-format is-primary is-small' onClick={onFormatClick}>Format</button>
    <MonacoEditor 
            
    height="600px"
    language="javascript"
    theme="vs-dark"
    value={input}
    options={{
        wordWrap:'on',
        minimap:{enabled:false},
        showUnused:false,
        folding:false,
        lineNumbersMinChars:3,
        fontSize:16, 
        scrollBeyondLastLine:false,
        automaticLayout:true,

    }}
   onChange={onEditorChange}
    />


  </div>
  )
}
