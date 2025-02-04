import { useState, useEffect } from 'react';

import GreenButton from '../../primitives/GreenButton';
import GreenRadioButtons from '../../primitives/GreenRadioButtons';
import GreenTextBox from '../../primitives/GreenTextBox';
import TableContainer from '../../containers/TableContainer';

import { getPriceDownload } from '../../../utils/api_get';
import { putSavePriceDownload } from '../../../utils/api_put';

export default function DownloadView(props) {
  const { initDownloadId, initIsLoading = false } = props;

  const [downloadId, setDownloadId] = useState(initDownloadId);
  const [isLoading, setIsLoading] = useState(initIsLoading);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveResult, setSaveResult] = useState('');
  const [saveType, setSaveType] = useState('missing');
  const [textbox, setTextbox] = useState('');

  useEffect(() => {
    initDownloadId ? setTextbox(initDownloadId) : null;
  }, [isLoading]);

  const handleDownloadRequest = (event) => {
    event.preventDefault();
    if (textbox.length > 0) {
      setDownloadId(textbox);
    }
  };

  const handlePriceSave = (event) => {
    event.preventDefault();
    const saveDownload = {
      'download_id': parseInt(downloadId),
      'options': saveType,
    };
    setIsSaving(true);
    setSaveResult('');
    setSaveError('');
    putSavePriceDownload(saveDownload)
      .then((data) => {
        setSaveResult(data.result);
        setIsSaving(false);
      })
      .catch((error) => {
        setSaveError(error.message);
        setIsSaving(false);
      });
  };

  const handleRadioBtn = (event) => {
    setSaveType(event.target.value);
  };

  const radioBtnConfig = {
    'name': 'save-type',
    'onChange': handleRadioBtn,
    'buttons': [
      {
        'id': 'save-missing',
        'value': 'missing',
        'checked': saveType === 'missing' ? true : false,
        'label': 'Save Missing Only',
      },
      {
        'id': 'save-overrideall',
        'value': 'overrideall',
        'checked': saveType === 'overrideall' ? true : false,
        'label': 'Save All and Override',
      },
    ],
  };

  return (
    <>
      <div className='d-flex flex-column'>
        <div>
          <form onSubmit={handleDownloadRequest}>
            <fieldset className='pb-5 text-center'>
              <GreenTextBox
                text='Download Id'
                labelLocation='left'
                id='downloadid-input'
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
        {downloadId && (
          <TableContainer
            title={'Downloaded data'}
            fetchFunction={getPriceDownload}
            fetchParams={downloadId}
            fetchKey={'prices'}
            signalLoading={setIsLoading}
            signalError={setIsLoadingError}
          />
        )}
        {!isLoading && !isLoadingError && downloadId && (
          <div>
            <form onSubmit={handlePriceSave}>
              <fieldset className='pt-4 pb-2 text-end'>
                <GreenRadioButtons radioProps={radioBtnConfig} />
              </fieldset>
              <fieldset className='text-end'>
                <GreenButton
                  text='Save'
                  btntype='submit'
                  isDisabled={isSaving}
                />
                {saveResult && (
                  <p className='text-end pe-2 py-2'>{saveResult}</p>
                )}
                {saveError && (
                  <p className='error-class text-end pe-2 py-2'>{saveError}</p>
                )}
              </fieldset>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
