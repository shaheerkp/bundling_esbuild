import { Provider } from "react-redux";
import { store } from "../state";
import EsBuild from "./EsBuild";
import Preview from "./preview";
import RepositoriesList from "./RepositoriesList";



const App = () => {

  return <div>
    <Provider store={store}>
<h1>Search for package</h1>
     <RepositoriesList/>
     <EsBuild/>
    
    </Provider>

  </div>




}

export default App;
