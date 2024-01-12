//import { useState } from 'react'
import './App.css'
import KanbanBoard from './components/KanbanBoard';
import Sumador from './components/Sumador';
import {useContadorStore} from "./stores/pruebaStore"


function App() {
  const {incrementarContador}=useContadorStore();
  
  return (
    <div>
<KanbanBoard/>
 <Sumador sumador={incrementarContador}/>
    </div>
  );
}

export default App
