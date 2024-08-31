import './assets/css/App.css';
import './assets/css/DatePicker.css';

import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Books from './components/pages/Books';
import Equities from './components/pages/Equities';
import Funds from './components/pages/Funds';
import LaddersToday from './components/pages/LaddersToday';
import MainArea from './components/pages/MainArea';
import NavPane from './components/layout/NavPane';
import NewInstrument from './components/pages/NewInstrument';
import PBAccount from './components/pages/PBAccounts';
import Prices from './components/pages/Prices';
import Strategies from './components/pages/Strategies';
import TableContainer from './components/containers/TableContainer';
import TitleBar from './components/layout/TitleBar';
import Trades from './components/pages/Trades';

import { getGenericRequest } from './utils/api_get';

function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  /* THIS WILL BE RETURNED FROM BACKEND CONFIG APP, DEPENDING ON USER PERMISSIONS  */
  const [categories, setCategories] = useState([
    { 'instruments': ['equities', 'new instrument'] },
    { 'market data': ['identifiers', 'prices'] },
    { 'organizations': ['funds', 'books', 'strategies', 'PB accounts'] },
    {
      'accounting': [
        'trades',
        'positions today',
      ],
    },
  ]);

  const [routes, setRoutes] = useState([]);

  function getAllRoutes(categories) {
    let sections = [];
    for (let i = 0; i < categories.length; i++) {
      let section = Object.keys(categories[i])[0];
      if (categories[i][section].length > 0) {
        sections.push(...categories[i][section]);
      } else {
        sections.push(Object.keys(categories[i])[0]);
      }
    }
    return sections;
  }

  const detectSreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    setRoutes(getAllRoutes(categories));
    window.addEventListener('resize', detectSreenWidth);

    return () => {
      window.removeEventListener('resize', detectSreenWidth);
    };
  }, [screenWidth]);

  let content = (
    <>
      <TitleBar />
      <section className='d-flex max-height'>
        <NavPane categories={categories} />
        <Routes>
          <Route path='/' element={<MainArea />} />
          {routes.includes('equities') && (
            <Route path='/equities' element={<Equities />} />
          )}
          {routes.includes('new instrument') && (
            <Route path='/new instrument' element={<NewInstrument />} />
          )}
          {routes.includes('identifiers') && (
            <Route
              path='/identifiers'
              element={
                <section className='d-flex flex-column flex-fill p-5'>
                  <TableContainer
                    title={'All Identifiers'}
                    fetchFunction={getGenericRequest}
                    fetchParams={'identifiers'}
                    fetchKey={'identifiers'}
                  />
                </section>
              }
            />
          )}
          {routes.includes('funds') && (
            <Route path='/funds' element={<Funds />} />
          )}
          {routes.includes('books') && (
            <Route path='/books' element={<Books />} />
          )}
          {routes.includes('strategies') && (
            <Route path='/strategies' element={<Strategies />} />
          )}
          {routes.includes('PB accounts') && (
            <Route path='/pb accounts' element={<PBAccount />} />
          )}
          {routes.includes('prices') && (
            <Route path='/prices' element={<Prices />} />
          )}
          {routes.includes('trades') && (
            <Route path='/trades' element={<Trades />} />
          )}
          {routes.includes('positions today') && (
            <Route path='/positions today' element={<LaddersToday />} />
          )}
        </Routes>
      </section>
    </>
  );

  // 992 is Bootstrap's large brekapoint
  if (screenWidth <= 992) {
    content = (
      <>
        <p>
          This website is not optimized for mobile viewing. Please use a device
          with a larger screen.
        </p>
      </>
    );
  }

  return <>{content}</>;
}

export default App;
