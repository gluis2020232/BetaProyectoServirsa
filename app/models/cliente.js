import Model, { attr } from '@ember-data/model';

export default class ClienteModel extends Model {
  codigo = attr('string');

  nombre = attr('string');
}
