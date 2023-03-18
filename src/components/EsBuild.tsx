import React, { useState, useEffect, useRef } from 'react'
import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';
import Preview from './preview';
import { CodeEditor } from './CodeEditor';



const EsBuild = () => {
    const ref=useRef<any>();
    const [input, setInput] = useState('');
    const [code, setCode] = useState('')

    useEffect(() => {
        startServices()
    }, [])


    const startServices = async () => {
        ref.current= await esbuild.initialize({
            worker:true,
            wasmURL: '/esbuild.wasm',
          })
  
    }

    const onChange=((newValue:any) => {
        setInput(newValue)  
    })


    return (
        <div>
            <CodeEditor input={input} onChange={onChange}/>
            <div>  
                <button onClick={async() => {
                //    let result1 = await esbuild.transform(input,{
                //         loader:'jsx',
                //         target:'es2015'
                //     })
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

                // console.log(result1);
                
                    // if(!ref.current){
                    //     alert("error")
                    //     return;
                    // }
                    setCode(result1.outputFiles[0].text);
                }}> 
                    Submit
                </button>
            </div>
            <Preview code={code}/>
            
        </div>
    )
}

export default EsBuild