import 'dotenv/config';
import axios from 'axios';
import * as urlHelper from './urlHelper';

const { NODE_ENV } = process.env;
const { reactUrl, defaultUrl } = urlHelper.backend;

export default (data = {}) => {
  const { token, URL, header, options = {} } = data;
  const { onUploadProgress } = options;
  const baseURL = URL || (reactUrl && `${reactUrl}/api`) || (defaultUrl && `${defaultUrl}/api`);
  const headers = { token: token || localStorage.token || undefined, 'Content-Type': 'application/json' || header, 'Access-Control-Allow-Origin': reactUrl, 'Access-Control-Allow-Credentials': true, crossdomain: true };
  if (onUploadProgress) {
    return (NODE_ENV === 'test' && axios) || axios.create({ baseURL, headers, onUploadProgress });
  }
  return (NODE_ENV === 'test' && axios) || axios.create({ baseURL, headers });
};
