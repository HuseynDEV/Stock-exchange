import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { StockDetailPage } from './pages/StockDetailPage';
import { StockOverviewPage } from './pages/StockOverviewPage';
import './index.css'
import { WatchListContextProvider } from './context/watchListContext';
function App() {
  return (
  <main className=''>
    <WatchListContextProvider>
    <Router>
      <Routes>
        <Route path='/' element={<StockOverviewPage/>}/>
        <Route path='/detail/:symbol' element={<StockDetailPage/>}/>
      </Routes>
    </Router>
    </WatchListContextProvider>
  </main>
  );
}

export default App;
