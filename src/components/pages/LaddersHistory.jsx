import { useState, useEffect } from 'react';

import DatePicker from 'react-multi-date-picker';
import GreenButton from '../primitives/GreenButton';
import TableContainer from '../containers/TableContainer';

import { getCashLadder, getAssetLadder } from '../../utils/api_get';

export default function LaddersHistory(props) {
  const { ladder } = props;

  const [APIKey, setAPIKey] = useState('');
  const [dateFrom, setDateFrom] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  const [dateTo, setDateTo] = useState(new Date());
  const [gotDates, setGotDates] = useState(false);
  const [subpage, setSubPage] = useState('');
  const [title, setTitle] = useState('Cash Ladder');

  useEffect(() => {
    let pageTitle = ladder.charAt(0).toUpperCase() + ladder.slice(1);
    setGotDates(false);
    setTitle(`${pageTitle} Ladder`);
    setAPIKey(`${ladder}_ladder`);
    if (ladder === 'cash') {setDateTo(new Date(new Date().setDate(new Date().getDate() +2)))}
    else {setDateTo(new Date())};
  }, [ladder]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setGotDates(true);
    setSubPage('showLadder');
  };

  return (
    <main className='d-flex flex-column flex-fill p-5'>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <div className='d-flex d-inline-flex flex-column flex-shrink'>
          <fieldset className='align-self-center'>
            <div className='left-aligned-input'>
              <label htmlFor='datefrom-input'> Date from:</label>
              <DatePicker
                inputClass='custom-datepicker'
                className='custom-datepicker'
                value={dateFrom}
                id='datefrom-input'
                format='YYYY-MM-DD'
                onChange={(newDate) => {
                  setGotDates(false);
                  newDate ? setDateFrom(newDate.toDate()) : setDateFrom(null);
                }}
              />
            </div>
            <div className='left-aligned-input'>
              <label htmlFor='dateto-input'> Date to:</label>
              <DatePicker
                inputClass='custom-datepicker'
                value={dateTo}
                id='dateto-input'
                format='YYYY-MM-DD'
                onChange={(newDate) => {
                  setGotDates(false);
                  newDate ? setDateTo(newDate.toDate()) : setDateTo(null);
                }}
              />
            </div>
          </fieldset>
          <div>
            <fieldset className='text-end pt-3 pe-2'>
              <GreenButton text='View Ladder' btntype='submit' />
            </fieldset>
          </div>
        </div>
      </form>

      <section className='d-flex justify-content-center top-split mt-4 py-5'>
        {subpage === 'showLadder' && gotDates ? (
          <TableContainer
            fetchFunction={ladder === 'cash' ? getCashLadder : getAssetLadder}
            fetchParams={[
              dateFrom.toISOString().split('T')[0],
              dateTo.toISOString().split('T')[0],
            ]}
            fetchKey={APIKey}
          />
        ) : null}
      </section>
    </main>
  );
}
