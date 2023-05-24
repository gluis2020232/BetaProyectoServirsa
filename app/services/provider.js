import Service from "@ember/service";
import GSheetReader from "g-sheets-api";
import config from "../config/environment";

export default class ProviderService extends Service {
  readerOptionsSheetClientesProyectos = {
    apiKey: config.apiKey,
    sheetId: config.sheetId,
    sheetNumber: 1,
  };

  readerOptionsSheetProyectosData = {
    apiKey: config.apiKey,
    sheetId: config.sheetId,
    sheetNumber: 2,
  };

  getClientesProyectosData() {
    return new Promise((resolve, reject) => {
      GSheetReader(this.readerOptionsSheetClientesProyectos, (results) => {
        results.forEach((project) => {
          project.porcentaje_avance = parseFloat(project.porcentaje_avance);

          if (project.fecha_arranque) {
            project.fecha_arranque = new Date(project.fecha_arranque);
          }

          if (project.fecha_completamiento) {
            project.fecha_completamiento = new Date(project.fecha_completamiento);
          }
        });

        return resolve(results);
      }, (error) => {
        return reject(error);
      });
    });
  }

  getProyectoData(projectId){
    return new Promise((resolve, reject) => {
      GSheetReader(this.readerOptionsSheetProyectosData, (results) => {
        let projectData = results.filter(data => data.proyecto_id === projectId);

        projectData.forEach((tasks) => {
          console.log(tasks);
          // tasks.porcentaje_avance = parseFloat(tasks.porcentaje_avance);

          // if (tasks.fecha_arranque) {
          //   tasks.fecha_arranque = new Date(tasks.fecha_arranque);
          // }

          // if (tasks.fecha_completamiento) {
          //   tasks.fecha_completamiento = new Date(tasks.fecha_completamiento);
          // }
        });

        return resolve(projectData);
      }, (error) => {
        return reject(error);
      });
    });
  }
}

