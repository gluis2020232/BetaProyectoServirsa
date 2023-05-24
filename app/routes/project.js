import Route from "@ember/routing/route";
import { inject as service } from '@ember/service';

export default class ProjectRoute extends Route {
  @service provider;

  model(params) {
    return this.provider.getProyectoData(params.project_id);
  }
}
