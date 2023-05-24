import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service provider;

  //Parametro de consulta
  queryParams = {
    sortBy: {
      as: 's'
    },
    searchTerm: {
      as: 'q'
    }
  }

  model() {
    this.store.query('proyecto', {})
      .then((proyectos) => {
        proyectos.forEach((proyecto) => {
          console.log('Proyecto:', proyecto.get('id', 'nombre', 'cliente'));
        });
      })
      .catch((error) => {
        console.log('HUBO UNA CAGADA');

        throw error;
      });

    return this.provider.getClientesProyectosData();
  }

  // setupController(controller) {
  //   super.setupController(...arguments);

  //   controller.set('data', controller.model);
  // }
}
