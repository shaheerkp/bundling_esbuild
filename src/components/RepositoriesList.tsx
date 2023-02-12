import { useState } from "react"

import { useActions } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";



const RepositoriesList: React.FC = () => {
    const [term, setTerm] = useState("")
    const {searchRepositories}=useActions()
    const {data,error,loading}=useTypedSelector((state)=>state.repositories)

    


    const onSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        searchRepositories(term)

    }
 
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={term} onChange={(e)=>setTerm(e.target.value)} />
                <button>Search</button>
                {error&&<h1>{error}</h1>}
                {loading&&<h1>loading....</h1>}
                {!error&&!loading&&data.map(name=><div key={name}>{name}</div>)}
            </form>
        </div>
    )
}

export default RepositoriesList