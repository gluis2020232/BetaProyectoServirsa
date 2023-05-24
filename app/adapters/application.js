import JSONAPIAdapter from '@ember-data/adapter/json-api';
import config from 'poc-dashboard-proyectos/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = config.API.host;
  namespace = config.API.namespace;
}
