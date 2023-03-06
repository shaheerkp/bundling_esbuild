import React, { useState, useEffect, useRef } from 'react'
import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';
import CodeEditor from './code-editor';
import "bulmaswatch/superhero/bulmaswatch.min.css";


const EsBuild = () => {
    const ref=useRef<any>();
    const [input, setInput] = useState('');
  
    const iframe=useRef<any>();

    useEffect(() => {
        startServices()
    
    }, [])


    const startServices = async () => {
        ref.current= await esbuild.initialize({
            worker:true,
            wasmURL: '/esbuild.wasm',
          })
  
    }

    const html=`
    <html>
    <head>
    </head>
    <body>
    <div id="root">
    </div>
    <script>
    window.addEventListener('message',(event)=>{
        try{
            eval(event.data);
        }catch(err){
            const root=document.querySelector('#root');
            console.log(root)
            root.innerHTML='<div style="color:red;"><h4>Runtime Error</h4>'
            +err+
             '</div>'

             console.error(err)
        }
     
    })
    </script>
    </body>
    </html>
    `; 



    return (
        <div>
            <CodeEditor onChange={(value:string)=>setInput(value)}  initialValue='const a=1;' />
            <textarea value={input} onChange={(e) => setInput(e.target.value)}>

            </textarea>
            <div>
                <button onClick={async() => {  
                      


                iframe.current.srcDoc=html;      
           
                let result1=await esbuild.build({
                    entryPoints:['index.js'],
                    bundle:true,
                    write:false,
                    plugins:[
                        unpkgPathPlugin(),
                        fetchPlugin(input)
                    ],
                    define:{
                        'process.env.NODE_ENV':'"production"',
                        global:'window'
                    }
                })

                iframe.current.contentWindow.postMessage(result1.outputFiles[0].text,'*');
                  
                      
                }}> 
                    Submit
                </button>
            </div> 
             <iframe title="code preview" ref={iframe}  sandbox='allow-scripts' srcDoc={html}/>
        </div>
    )
}

export default EsBuild