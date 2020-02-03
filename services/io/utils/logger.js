import pino from 'pino';

const { LOG_LEVEL } = process.env;

export default pino({ level: LOG_LEVEL });
