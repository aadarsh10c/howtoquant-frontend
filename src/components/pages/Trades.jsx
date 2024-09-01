import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import GreenButton from '../primitives/GreenButton';
import GreenForm from '../containers/GreenForm';
import TableContainer from '../containers/TableContainer';
import TradeView from './subpages/TradeView';

import { getGenericRequest } from '../../utils/api_get';
import { postTrades } from '../../utils/api_post';

export default function Trades() {
  const [searchParams] = useSearchParams();
  const [subpage, setSubPage] = useState(searchParams.get('subpage'));

  const [bookId, setBookId] = useState('');
  const [bookName, setBookName] = useState('');
  const [bsIndicator, setBSIndicator] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [counterpartyId, setCounterpartyId] = useState('');
  const [counterpartyName, setCounterpartyName] = useState('');
  const [postResponse, setPostResponse] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [settleBaseXRate, setSettleBaseXRate] = useState('');
  const [settleCcy, setSettleCcy] = useState('');
  const [settleCcyId, setSettleCcyId] = useState('');
  const [strategyId, setStrategyId] = useState('');
  const [strategyName, setStrategyName] = useState('');
  const [ticker, setTicker] = useState('');
  const [tickerId, setTickerId] = useState('');
  const [tradeCcy, setTradeCcy] = useState('');
  const [tradeCcyId, setTradeCcyId] = useState('');
  const [tradeSettleXRate, setTradeSettleXRate] = useState('');

  const submitTradeData = () => {
    setButtonDisabled(true);
    setPostResponse('');
    const data = {
      'ticker': ticker,
      'direction': bsIndicator[0].toUpperCase(),
      'quantity': parseFloat(quantity),
      'price': parseFloat(price),
      'book_name': bookName,
      'strategy_name': strategyName,
      'counterparty': counterpartyName,
    };
    if (tradeCcy.length > 0) {
      data['trade_ccy'] = tradeCcy;
    }
    if (settleCcy.length > 0) {
      data['settle_ccy'] = settleCcy;
    }
    if (tradeSettleXRate.length > 0) {
      data['trade_settle_xrate'] = parseFloat(tradeSettleXRate);
    }
    if (settleBaseXRate.length > 0) {
      data['settle_base_xrate'] = parseFloat(settleBaseXRate);
    }

    postTrades(data)
      .then((data) => {
        if (data.status === 'OK') {
          setPostResponse('Saved successfully');
          setTickerId('');
          setBSIndicator('');
          setQuantity('');
          setPrice('');
          setTradeCcy('');
          setSettleCcy('');
          setTradeSettleXRate('');
          setSettleBaseXRate('');
          setBookId('');
          setStrategyId('');
          setCounterpartyId('');
        } else {
          setPostResponse(data.data);
        }
        setButtonDisabled(false);
      })
      .catch((error) => {
        setPostResponse(error);
      });
  };

  const tickerChangeController = (id, text) => {
    setTicker(text);
    setTickerId(id);
  };

  const tradeCcyChangeController = (id, text) => {
    setTradeCcy(text);
    setTradeCcyId(id);
  };

  const settleCcyChangeController = (id, text) => {
    setSettleCcy(text);
    setSettleCcyId(id);
  };

  const bookChangeController = (id, text) => {
    setBookName(text);
    setBookId(id);
  };

  const strategyChangeController = (id, text) => {
    setStrategyName(text);
    setStrategyId(id);
  };

  const counterpartyChangeController = (id, text) => {
    setCounterpartyName(text);
    setCounterpartyId(id);
  };

  const tradeForm = [
    {
      'type': 'textbox',
      'props': {
        'text': 'Status',
        'labelLocation': 'left-apart',
        'id': 'trade-status-input',
        'value': 'New',
      },
    },
    {
      'type': 'select',
      'props': {
        'text': 'Ticker',
        'labelLocation': 'left-apart',
        'id': 'ticker-select',
        'mandatory': true,
        'fetchFunction': getGenericRequest,
        'fetchKey': 'codes',
        'fetchParams': 'identifierCodes',
        'currentValue': tickerId,
        'onChange': tickerChangeController,
      },
    },
    {
      'type': 'select',
      'props': {
        'text': 'Buy/Sell Indicator',
        'labelLocation': 'left-apart',
        'id': 'buy-sell-select',
        'mandatory': true,
        'options': ['Buy', 'Sell'],
        'currentValue': bsIndicator,
        'onChange': setBSIndicator,
      },
    },
    {
      'type': 'textbox',
      'props': {
        'text': 'Quantity',
        'labelLocation': 'left-apart',
        'id': 'trade-quantity-input',
        'mandatory': true,
        'value': quantity,
        'onChange': setQuantity,
      },
    },
    {
      'type': 'textbox',
      'props': {
        'text': 'Price',
        'labelLocation': 'left-apart',
        'id': 'trade-price-input',
        'mandatory': true,
        'value': price,
        'onChange': setPrice,
      },
    },
    {
      'type': 'select',
      'props': {
        'text': 'Trade Currency',
        'labelLocation': 'left-apart',
        'id': 'trade-ccy-select',
        'fetchFunction': getGenericRequest,
        'fetchKey': 'ccy_codes',
        'fetchParams': 'ccy_codes',
        'currentValue': tradeCcyId,
        'onChange': tradeCcyChangeController,
      },
    },
    {
      'type': 'select',
      'props': {
        'text': 'Settlement Currency',
        'labelLocation': 'left-apart',
        'id': 'settlement-ccy-select',
        'fetchFunction': getGenericRequest,
        'fetchKey': 'ccy_codes',
        'fetchParams': 'ccy_codes',
        'currentValue': settleCcyId,
        'onChange': settleCcyChangeController,
      },
    },
    {
      'type': 'textbox',
      'props': {
        'text': 'Trade/Settlement XRate',
        'labelLocation': 'left-apart',
        'id': 'trade-settle-xrate-input',
        'value': tradeSettleXRate,
        'onChange': setTradeSettleXRate,
      },
    },
    {
      'type': 'textbox',
      'props': {
        'text': 'Settlement/Base XRate',
        'labelLocation': 'left-apart',
        'id': 'settle-base-xrate-input',
        'value': settleBaseXRate,
        'onChange': setSettleBaseXRate,
      },
    },
    {
      'type': 'select',
      'props': {
        'text': 'Book',
        'labelLocation': 'left-apart',
        'id': 'book-select',
        'mandatory': true,
        'fetchFunction': getGenericRequest,
        'fetchKey': 'book_names',
        'fetchParams': 'book_names',
        'currentValue': bookId,
        'onChange': bookChangeController,
      },
    },
    {
      'type': 'select',
      'props': {
        'text': 'Strategy',
        'labelLocation': 'left-apart',
        'id': 'strategy-select',
        'mandatory': true,
        'fetchFunction': getGenericRequest,
        'fetchKey': 'strategy_names',
        'fetchParams': 'strategy_names',
        'currentValue': strategyId,
        'onChange': strategyChangeController,
      },
    },
    {
      'type': 'select',
      'props': {
        'text': 'Counterparty',
        'labelLocation': 'left-apart',
        'id': 'counterparty-select',
        'mandatory': true,
        'fetchFunction': getGenericRequest,
        'fetchParams': 'counterparty_names',
        'fetchKey': 'counterparty_names',
        'currentValue': counterpartyId,
        'onChange': counterpartyChangeController,
      },
    },
    {
      'type': 'button',
      'props': {
        'text': 'Save',
        'id': 'trade-save-btn',
        'btntype': 'submit',
        'isDisabled': buttonDisabled,
      },
    },
  ];

  return (
    <main className='d-flex flex-column flex-fill p-5'>
      <h2>Trades</h2>
      <div className='d-flex justify-content-center spaced-div'>
        <GreenButton
          text={'View All'}
          clickFunction={() => {
            setSubPage('viewTrades');
            setPostResponse('');
          }}
        />
        <GreenButton
          text={'View Trade'}
          clickFunction={() => {
            setSubPage('viewTrade');
          }}
        />
        <GreenButton
          text={'New Trade'}
          clickFunction={() => {
            setSubPage('newTrade');
          }}
        />
      </div>
      <p className='pt-3 mb-0 small'>New trades can take up to 10 minutes to process into positions</p>
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
        ) : subpage === 'newTrade' ? (
          <GreenForm
            formTitle='New Trade'
            formList={tradeForm}
            onSubmit={submitTradeData}
            submitResult={postResponse}
          />
        ) : null}
      </section>
    </main>
  );
}
