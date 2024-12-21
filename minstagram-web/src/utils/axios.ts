import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import ApiEnv from 'src/config';
import storage from './storage';
import { handleLogout } from './auth';

const axiosInstance = axios.create({
  baseURL: ApiEnv.baseURL,
  timeout: ApiEnv.timeout
});

axiosInstance.interceptors.request.use(function(config) {
  let storageItem = storage.getItem('minstagram-web');

  if (storageItem) {
    let session = JSON.parse(storageItem);
    config.headers['Authorization'] = `Bearer ${session.accessToken}`;
    return config;
  } else {
    return config;
  }
});

interface IClientError {
  config: AxiosRequestConfig;
  request: XMLHttpRequest;
  response: undefined;
  message: string;
  stack: string;
}

interface IAxiosErrorData {
  statusCode: string;
  status: string;
  timestamp: string;
  message: string;
  debugMessage: string;
}

interface IParsedError {
  message: string;
  status: number;
}

function parseErrorMessage(error: AxiosResponse<IAxiosErrorData>): IParsedError {
  let parsedError = {
    message: 'Something is wrong in client end',
    status: error.status
  };
  if (error.status === 403) {
    handleLogout();
    parsedError.message = error.data.message;
  } else if (error.status === 400) {
    parsedError.message = error.data.message;
  } else if (error.status === 401) {
    handleLogout();
    parsedError.message = error.data.message;
  } else if (error.status === 404) {
    parsedError.message = error.data.message;
  }
  console.error(parsedError, error);
  return parsedError;
}

function parseClientError(error: IClientError) {
  let parsedError = {
    message: 'Something went wrong',
    status: 'CLIENT_ERROR'
  };
  if (error.message === 'Network Error') {
    parsedError = {
      message: 'There seems to be no internet connection',
      status: 'CLIENT_ERROR'
    };
  }
  return parsedError;
}

axiosInstance.interceptors.response.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error.response ? parseErrorMessage(error.response) : parseClientError(error));
  }
);

export default axiosInstance;