import { useEffect, useState } from 'react';

import GreenButton from '../../primitives/GreenButton';
import GreenTextBox from '../../primitives/GreenTextBox';
import GreenForm from '../../containers/GreenForm';

import Loading from '../../static/Loading';
import Error from '../../static/Error';

import { getTradeById } from '../../../utils/api_get';

export default function TradeView(props) {
  const { contentTitle, initId, labelText } = props;

  const [textbox, setTextbox] = useState(initId);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tradeData, setTradeData] = useState(null);

  useEffect(() => {
    initId ? processRequest() : null;
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (textbox.length > 0) {
      processRequest();
    }
  };

  const processRequest = () => {
    setTradeData(null);
    setError(null);
    setIsLoading(true);
    getTradeById(textbox)
      .then((data) => {
        const processedResponse = Object.entries(data['trade_data']).map(
          ([key, value]) => {
            return {
              'type': 'textbox',
              'props': {
                'text': key,
                'labelLocation': 'left-apart',
                'id': key,
                'readOnly': true,
                'value': value,
              },
            };
          }
        );
        setTradeData(processedResponse);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className='d-flex flex-column'>
        <div>
          <form onSubmit={handleSubmit}>
            <fieldset className='pb-5 text-center'>
              <GreenTextBox
                text={labelText}
                labelLocation='left'
                id='id-input'
                value={textbox}
                onChange={setTextbox}
              />
              <GreenButton
                text='View'
                btntype='submit'
                isDisabled={isLoading}
              />
            </fieldset>
          </form>
        </div>
        {isLoading && <Loading />}
        {error && <Error errorCode={error.response.status} />}
        {tradeData && <GreenForm formTitle={contentTitle} formList={tradeData} />}
      </div>
    </>
  );
}
