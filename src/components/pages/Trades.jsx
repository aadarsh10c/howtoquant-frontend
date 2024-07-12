import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import GreenButton from '../primitives/GreenButton';
import TableContainer from '../containers/TableContainer';
import TradeView from './subpages/TradeView';

import { getGenericRequest } from '../../utils/api_get';

export default function Trades() {
    const [searchParams] = useSearchParams();
    const [subpage, setSubPage] = useState(searchParams.get('subpage'));

    const [tradeData, setTradeData] = useState({});
    const [postResponse, setPostResponse] = useState('');

    return (
        <main className='d-flex flex-column flex-fill p-5'>
          <h2>Trades</h2>
          <div className='d-flex justify-content-center spaced-div'>
            <GreenButton
              text={'View All'}
              clickFunction={() => {
                setSubPage('viewTrades');
                setTradeData({});
                setPostResponse('');
              }}
            />
            <GreenButton
                text = {'View Trade'}
                clickFunction={() => {
                    setSubPage('viewTrade');
                  }}
            />
          </div>
          <section className='d-flex justify-content-center top-split mt-4 py-5'>
            {subpage === 'viewTrades' ? (
              <TableContainer
                title={'All Trades'}
                fetchFunction={getGenericRequest}
                fetchParams={'trades'}
                fetchKey={'trades'}
              />
            ) : subpage === 'viewTrade' ? (
              <TradeView
                labelText={'Trade Id'}
                contentTitle={'Trade details'}
                initId={searchParams.get('id')}
              />
            ) : null}
          </section>
        </main>
    );
}