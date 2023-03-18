import Editor,{OnMount} from "@monaco-editor/react"
import { useRef } from "react";
import prettier from "prettier"
import parser from "prettier/parser-babel" 
import './code-editor.css' 
import codeShift from "jscodeshift"
import Highlighter from "monaco-jsx-highlighter"




interface CodeEditorProps{
    initialValue:string;
    onChange(value:string):void
}

const CodeEditor:React.FC<CodeEditorProps>=({initialValue,onChange})=>{

  

    const editorRef = useRef<any>(null);

    const handleMount:OnMount=async(editor,monaco)=> {
      const { default: traverse } = await import("@babel/traverse");
const { parse } = await import("@babel/parser");

      editorRef.current = editor;
      // const highlighter=new Highlighter(
      //   //@ts-ignore
      //   monaco,
      //   parse,
      //   traverse,
      //   editor
        
       
        
      // );
      // highlighter.highLighterOnDidChangeModelContent(
      //   ()=>{},
      //   ()=>{},
      //   undefined,
      //   ()=>{}
      // )
     
    }

    function showValue() {
        if(editorRef!==null){
            onChange(editorRef.current.getValue()) 
        }
      }
      const onFormatClick=()=>{
         const unformatted=editorRef.current.getValue()
         const formatted=prettier.format(unformatted,{parser:'babel',plugins:[parser],useTabs:false,semi:true,singleQuote:true}).replace(/\n$/,"");
         editorRef.current.setValue(formatted)
      }
    

return <div className="editor-wrapper">
<button className="button button-format is-primary is-small" onClick={onFormatClick}>Format</button>
<Editor
onChange={showValue}
value={initialValue}
onMount={handleMount}
 theme="vs-dark" 
 language="javascript" 
 height={500}
 options={{
    wordWrap:"on",
    minimap:{enabled:false},
    showUnused:false,
    folding:false,
    lineNumbersMinChars:3,
    fontSize:16,
    scrollBeyondLastLine:false,
    automaticLayout:true,
 }}
 />
</div>


}

export default CodeEditor