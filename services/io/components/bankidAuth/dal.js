import axios from 'axios';
import https from 'https';
import jwt from 'jsonwebtoken';

import { throwCustomDomainError } from '../../utils/error';
import logger from '../../utils/logger';
import jsonapi from '../../jsonapi';

const axiosClient = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    cert: process.env.CERT,
    key: process.env.KEY,
  }),
  headers: {
    'Content-Type': 'application/json',
  },
});

const createErrorResponse = async (error, res) => {
  logger.info(error.status);
  logger.info(error.data);
  console.log(error);
  const serializedData = await jsonapi.serializer.serializeError(error);
  return res.status(error.status).json(serializedData);
};

const createSuccessResponse = async (
  data,
  res,
  jsonapiType,
  converter = undefined,
) => {
  let dataToSerialize = data;
  if (converter) {
    dataToSerialize = await jsonapi.convert[converter](dataToSerialize);
  }

  const serializedData = await jsonapi.serializer.serialize(
    jsonapiType,
    dataToSerialize,
  );
  return res.json(serializedData);
};

const tryAxiosRequest = async (callback) => {
  try {
    const response = await callback();
    return response;
  } catch (error) {
    throwCustomDomainError(error.response.status);
    return undefined;
  }
};

const auth = async (req, res) => {
  try {
    const { personalNumber, endUserIp } = req.body;
    const endpoint = `${process.env.BANKIDURL}/api/v1/bankid/auth`;
    const token = jwt.sign(
      { pno: personalNumber },
      `${process.env.BANKIDURL}/api/v1/bankid/auth`,
      {
        expiresIn: '24h',
      },
    );

    const data = {
      personalNumber,
      endUserIp,
      userVisibleData: 'Helsingborg stad',
    };

    const jsonapiResponse = await tryAxiosRequest(() =>
      axiosClient.post(endpoint, data),
    );

    const deserializedJsonapiResponse = jsonapi.serializer.deserialize(
      'bankidauth',
      jsonapiResponse.data,
    );
    deserializedJsonapiResponse.token = token;

    return await createSuccessResponse(
      deserializedJsonapiResponse,
      res,
      'bankidauth',
    );
  } catch (error) {
    return createErrorResponse(error, res);
  }
};

const collect = async (req, res) => {
  try {
    const { orderRef } = req.body;
    const endpoint = `${process.env.BANKIDURL}/api/v1/bankid/collect`;

    const data = {
      orderRef,
    };

    const response = await tryAxiosRequest(() =>
      axiosClient.post(endpoint, data),
    );

    return res.json(response.data);
  } catch (error) {
    return createErrorResponse(error, res);
  }
};

const cancel = async (req, res) => {
  try {
    const { orderRef } = req.body;
    const endpoint = `${process.env.BANKIDURL}/api/v1/bankid/cancel`;

    const data = {
      orderRef,
    };

    const response = await tryAxiosRequest(() =>
      axiosClient.delete(endpoint, { data }),
    );

    return res.json(response.data);
  } catch (error) {
    return createErrorResponse(error, res);
  }
};

const sign = async (req, res) => {
  try {
    const { personalNumber, endUserIp, userVisibleData } = req.body;
    const endpoint = `${process.env.BANKIDURL}/api/v1/bankid/sign`;

    const data = {
      personalNumber,
      endUserIp,
      userVisibleData,
    };
    const response = await tryAxiosRequest(() =>
      axiosClient.post(endpoint, data),
    );

    return res.json(response.data);
  } catch (error) {
    return createErrorResponse(error, res);
  }
};

const bankid = {
  auth,
  sign,
  cancel,
  collect,
};

export default bankid;
