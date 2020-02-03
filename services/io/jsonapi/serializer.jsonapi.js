import JSONAPISerializer from 'json-api-serializer';
import schemas from './schemas';

const Serializer = new JSONAPISerializer({
  convertCase: 'snake_case',
  unconvertCase: 'camelCase',
});

Serializer.register('bankidauth', schemas.bankidAuth);

export default Serializer;
