import axios from 'axios';

const APIroot = 'http://127.0.0.1:8000/';
const paths = {
  'accounting_method_names': 'classifiers/api/accounting_methods/names',
  'account_names': 'accounting/api/pbaccounts/names',
  'books': 'accounting/api/books',
  'book_names': 'accounting/api/books/names',
  'ccies': 'classifiers/api/currencies',
  'ccy_codes': 'classifiers/api/currencies/codes',
  'counterparty_names': 'staticdata/api/organizations/counterparty_names',
  'country_names': 'classifiers/api/countries/names',
  'equities': 'staticdata/api/equities',
  'fund_names': 'staticdata/api/organizations/fund_names',
  'identifierCodes': 'staticdata/api/identifiers/codes',
  'identifiers': 'staticdata/api/identifiers',
  'inst_class_names': 'classifiers/api/inst_classes/class_names',
  'issuer_names': 'staticdata/api/organizations/issuer_names',
  'pbaccounts': 'accounting/api/pbaccounts',
  'broker_names': 'staticdata/api/organizations/broker_names',
  'parent_org_names': 'staticdata/api/organizations/parent_org_names',
  'prices': 'marketdata/api/prices',
  'sector_names': 'classifiers/api/sectors/names',
  'subsector_names': 'classifiers/api/subsectors/names',
  'strategies': 'accounting/api/strategies',
  'strategy_names': 'accounting/api/strategies/names',
  'ticker_types': 'classifiers/api/ticker_types',
  'ticker_type_names': 'classifiers/api/ticker_types/names',
  'trades': 'accounting/api/trades',
};

export const getGenericRequest = (path) => {
  let URL = APIroot + paths[path];

  return axios
    .get(URL)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getAssetLadder = (dates) => {
  let URL = APIroot + 'accounting/api/asset_ladder';
  const start_date = dates[0];
  const end_date = dates[1];
  start_date
    ? end_date
      ? (URL += `?start_date=${start_date}&end_date=${end_date}`)
      : (URL += `?start_date=${start_date}`)
    : end_date
    ? (URL += `?end_date=${end_date}`)
    : null;
  return axios
    .get(URL)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getCashLadder = (dates) => {
  let URL = APIroot + 'accounting/api/cash_ladder';
  const start_date = dates[0];
  const end_date = dates[1];
  start_date
    ? end_date
      ? (URL += `?start_date=${start_date}&end_date=${end_date}`)
      : (URL += `?start_date=${start_date}`)
    : end_date
    ? (URL += `?end_date=${end_date}`)
    : null;
  return axios
    .get(URL)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getInstrumentByTicker = (ticker) => {
  let URL = APIroot + 'staticdata/api/equities/' + ticker;
  return axios
    .get(URL)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getOrganizations = (org_type) => {
  let URL = APIroot + 'staticdata/api/organizations';
  org_type ? (URL += `?org_type=${org_type}`) : null;
  return axios
    .get(URL)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getPBAccountNames = (fund_name) => {
  let URL = APIroot + 'accounting/api/pbaccounts/names?fund_name=' + fund_name;
  return axios
    .get(URL)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getPriceDownload = (id) => {
  let URL = APIroot + 'marketdata/api/prices/download/' + id;
  return axios
    .get(URL)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getPrices = () => {
  let URL = APIroot + 'marketdata/api/prices';
  return axios
    .get(URL)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getTradeById = (id) => {
  let URL = APIroot + 'accounting/api/trades/' + id;
  return axios
    .get(URL)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw error;
    });
};
