import './App.css';
import { Routes, Route } from "react-router-dom"
import Toolbar from './Toolbar';
import AddItems from './AddItems';
import TakeOrders from "./TakeOrders"
import AllOrders from './AllOrders';
import Milkshakes from './Milkshakes';
import SpringRoll from './SpringRoll';
import Noodle from './Noodle';

function App() {
  return (
    <div className="App">
      <Toolbar />
        <Routes>
            <Route exact path="/" element={<AllOrders />} />
            <Route exact path="/add-items" element={<AddItems />} />
            <Route exact path="/take-orders" element={<TakeOrders />} />
            <Route exact path="/milkshakes" element={<Milkshakes />} />
            <Route exact path="/spring-roll" element={<SpringRoll />} />
            <Route exact path="/noodles" element={<Noodle />} />
        </Routes>
    </div>
  );
}

export default App;
