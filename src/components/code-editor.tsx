import Editor,{OnMount} from "@monaco-editor/react"
import { useRef } from "react";


interface CodeEditorProps{
    initialValue:string;
    onChange(value:string):void
}

const CodeEditor:React.FC<CodeEditorProps>=({initialValue,onChange})=>{

    const editorRef = useRef<any>(null);

    const handleMount:OnMount=(editor,monaco)=> {
      editorRef.current = editor;
    }

    function showValue() {
        if(editorRef!==null){
            onChange(editorRef.current.getValue()) 
        }
      }
    

return <Editor
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


}

export default CodeEditor