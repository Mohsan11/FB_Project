import "./App.css";
import Nav from "./Component/Nav/Nav";
import Controller from "./Component/Container/Controller";
import { data } from "./data/AllInOne";
function App() {
  return (
    <div className="App">
      <Nav />
      <Controller data={data} />
    </div>
  );
}

export default App;
