import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import GreenButton from '../primitives/GreenButton';
import TableContainer from '../containers/TableContainer';

import { getCashLadder, getInstrumentLadder } from '../../utils/api_get';

export default function LaddersToday() {
  const [searchParams] = useSearchParams();
  const [subpage, setSubPage] = useState(searchParams.get('subpage'));

  let today = new Date();
  today = today.toISOString().split('T')[0];

  return (
    <main className='d-flex flex-column flex-fill p-5'>
      <h2>Positions Today</h2>
      <div className='d-flex justify-content-center spaced-div'>
        <GreenButton
          text={'Currencies'}
          clickFunction={() => {
            setSubPage('cashLadder');
          }}
        />
        <GreenButton
          text={'Instruments'}
          clickFunction={() => {
            setSubPage('instLadder');
          }}
        />
      </div>
      <section className='d-flex justify-content-center top-split mt-4 py-5'>
        {subpage === 'cashLadder' ? (
          <TableContainer
            title={'Cash Positions'}
            fetchFunction={getCashLadder}
            fetchParams={[today]}
            fetchKey={'cash_ladder'}
          />
        ) : subpage === 'instLadder' ? (
          <TableContainer
            title={'Instrument Positions'}
            fetchFunction={getInstrumentLadder}
            fetchParams={[today]}
            fetchKey={'instrument_ladder'}
          />
        ) : null}
      </section>
    </main>
  );
}
