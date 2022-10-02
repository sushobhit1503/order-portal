import './App.css';
import { Routes, Route } from "react-router-dom"
import Toolbar from './Toolbar';
import AddItems from './AddItems';
import TakeOrders from "./TakeOrders"
import AllOrders from './AllOrders';
import Drinks from "./Drinks"
import Burger from './Burger';
import Samosa from "./Samosa";
import Chaat from "./Chaat"

function App() {
  return (
    <div className="App">
      <Toolbar />
        <Routes>
            <Route exact path="/" element={<AllOrders />} />
            <Route exact path="/add-items" element={<AddItems />} />
            <Route exact path="/take-orders" element={<TakeOrders />} />
            <Route exact path="/drinks" element={<Drinks />} />
            <Route exact path="/burger" element={<Burger />} />
            <Route exact path="/samosa" element={<Samosa />} />
            <Route exact path="/chaat" element={<Chaat />} />
        </Routes>
    </div>
  );
}

export default App;
