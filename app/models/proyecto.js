import Model, { attr, belongsTo } from '@ember-data/model';

export default class ProyectoModel extends Model {
  codigo = attr('string');

  nombre = attr('string');

  cliente = belongsTo('cliente');

  responsableProyecto = attr('string');

  fechaArranque = attr('date');

  fechaCompletamiento = attr('date');

  porcentajeAvance = attr('number');
}
