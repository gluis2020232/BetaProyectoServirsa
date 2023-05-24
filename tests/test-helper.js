import Application from 'poc-dashboard-proyectos/app';
import config from 'poc-dashboard-proyectos/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
