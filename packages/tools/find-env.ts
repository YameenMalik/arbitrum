import * as findUp from 'find-up';
export const findEnv = () => findUp.sync(process.env.ENV_FILE || '.env');