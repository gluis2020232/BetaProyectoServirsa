import EmberRouter from '@ember/routing/router';
import config from 'poc-dashboard-proyectos/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('projects', { path: '/' }, function() {
  });
  this.route('project', { path: 'project/:project_id' }, function() {
  });
  this.route('ejemplo');
});

