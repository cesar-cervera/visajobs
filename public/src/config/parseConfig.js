import Parse from 'parse';
import * as env from './environments.js';

Parse.initialize(env.APPLICATION_ID, env.JAVASXRIPT_KET);
Parse.serverURL = env.SERVER_URL;

export default Parse;