import { Provider } from "react-redux";
import { store } from "../state"; 
import EsBuild from "./EsBuild";




const App = () => {

  
  // props for the BarGraph component

  

  return <div>
    <Provider store={store}>
     <EsBuild/>
    </Provider>

  </div>




}

export default App;
