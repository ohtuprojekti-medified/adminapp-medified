import logo from './logo.svg';
import './App.css';

import Moods from './components/Moods'
import moodService from './services/moodService'
import { useEffect, useState } from 'react';

const App = () => {
  const [moods, setMoods] = useState([])

  useEffect(() => moodService.getAll().then(moodsAtBeginning => setMoods(moodsAtBeginning)), [])

  return (
    <div className="App">
      <h1>Adminsovellus mielialan seurantaan</h1>
      <Moods moods={moods} />
    </div>
  );
}

export default App;
