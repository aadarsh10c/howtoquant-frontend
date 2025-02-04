import { useEffect, useState } from 'react';

import GreenButton from '../../primitives/GreenButton';
import GreenForm from '../../containers/GreenForm';
import GreenTextBox from '../../primitives/GreenTextBox';

import Loading from '../../static/Loading';
import Error from '../../static/Error';

import { getInstrumentByTicker } from '../../../utils/api_get';

export default function EquityView(props) {
  const { contentTitle, initTicker, labelText } = props;

  const [error, setError] = useState(null);
  const [instData, setInstData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [textbox, setTextbox] = useState(initTicker);

  useEffect(() => {
    initTicker ? processRequest() : null;
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (textbox.length > 0) {
      processRequest();
    }
  };

  const processRequest = () => {
    setInstData(null);
    setError(null);
    setIsLoading(true);
    getInstrumentByTicker(textbox)
      .then((data) => {
        const processedResponse = Object.entries(data['instrument_data']).map(
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
        setInstData(processedResponse);
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
                id='ticker-input'
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
        {instData && <GreenForm formTitle={contentTitle} formList={instData} />}
      </div>
    </>
  );
}
