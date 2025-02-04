import { useEffect, useState } from 'react';

import DownloadView from './subpages/DownloadView';
import GreenButton from '../primitives/GreenButton';
import PriceDownload from './subpages/PriceDownload';
import TableContainer from '../containers/TableContainer';

import { getGenericRequest } from '../../utils/api_get';

export default function Prices() {
  const [downloadId, setDownloadId] = useState(undefined);
  const [showDownload, setShowDownload] = useState(false);
  const [subpage, setSubPage] = useState(null);

  useEffect(() => {}, [subpage]);

  const returnPrices = (newDownloadId) => {
    setDownloadId(newDownloadId);
    setShowDownload(true);
    setSubPage('viewDownload');
  };

  return (
    <main className='d-flex flex-column flex-fill p-5'>
      <h2>Market Prices</h2>
      <div className='d-flex justify-content-center spaced-div'>
        <GreenButton
          text={'View Prices'}
          clickFunction={() => {
            setSubPage('viewPrices');
          }}
        />
        <GreenButton
          text={'New Download'}
          clickFunction={() => {
            setSubPage('newDownload');
          }}
        />
        <GreenButton
          text={'View Download'}
          clickFunction={() => {
            setSubPage('viewDownload');
          }}
        />
      </div>
      <section className='d-flex justify-content-center top-split mt-4 py-5'>
        {subpage === 'viewPrices' ? (
          <TableContainer
            title={'Price data'}
            fetchFunction={getGenericRequest}
            fetchParams={'prices'}
            fetchKey={'prices'}
          />
        ) : subpage === 'newDownload' ? (
          <PriceDownload callbackFunc={returnPrices} />
        ) : subpage === 'viewDownload' ? (
          <DownloadView
            initDownloadId={downloadId}
            initIsLoading={showDownload}
          />
        ) : null}
      </section>
    </main>
  );
}
