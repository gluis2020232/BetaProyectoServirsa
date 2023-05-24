import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { set } from "@ember/object";

export default class IndexController extends Controller {
  @service provider;

  @tracked project = "";

  @tracked sortBy = "proyecto";

  @tracked searchTerm = "";

  @tracked option = "Activos";

  @tracked modalProyecto = false;

  @tracked modalFechaArranque = false;

  @tracked sorts = [];

  @tracked cliente;

  @tracked proyecto;

  @tracked responsableProyecto;

  @tracked fecha_arranque;

  @tracked fecha_completamiento;

  @tracked porcentaje_avance;

  @tracked fechaArranqueInicio;

  @tracked fechaArranqueFin;

  @tracked fechaCompletamientoInicio;

  @tracked fechaCompletamientoFin;

  @tracked data = [];

  // proyectos ordenados
  get sortedProjects() {
    return this.matchingSearch;
  }

  // Búsqueda coincidente
  get matchingSearch() {
    // toLowerCase devuelve valor minúscula
    let searchT = this.searchTerm.toLowerCase();

    let model = this.model.filter((proyecto) => {
      if (this.option === "Activos" && proyecto.fecha_completamiento) {
        return false;
      }

      if (this.option === "Completados" && !proyecto.fecha_completamiento) {
        return false;
      }

      if (this.fechaArranqueInicio) {
        if (!proyecto.fecha_arranque) {
          return false;
        }

        let fechaInicio = new Date(this.fechaArranqueInicio);

        if (proyecto.fecha_arranque < fechaInicio) {
          return false;
        }
      }

      if (this.fechaArranqueFin) {
        if (!proyecto.fecha_arranque) {
          return false;
        }

        let fechaFin = new Date(this.fechaArranqueFin);

        if (proyecto.fecha_arranque > fechaFin) {
          return false;
        }
      }

      if (this.fechaCompletamientoInicio) {
        if (!proyecto.fecha_completamiento) {
          return false;
        }

        let inicioFecha = new Date(this.fechaCompletamientoInicio);

        if (proyecto.fecha_completamiento < inicioFecha) {
          return false;
        }
      }
      
      if (this.fechaCompletamientoFin) {
        if (!proyecto.fecha_completamiento) {
          return false;
        }

        let finFecha = new Date(this.fechaCompletamientoFin);

        if (proyecto.fecha_completamiento > finFecha) {
          return false;
        }
      }

      let cliente = proyecto.cliente.toLowerCase();
      let nombreProyecto = proyecto.proyecto.toLowerCase();
      let encargado = proyecto.responsable_proyecto ? proyecto.responsable_proyecto.toLowerCase() : null;

      return nombreProyecto.includes(searchT)
        || cliente.includes(searchT)
        || (encargado && encargado.includes(searchT));
    }); 

    let count = 1;

    model.forEach((element, index) => {
      set(element, "count", count);
      count ++;
    });

    return model;
  }
  
  get filter() {
    let filter = this.proyecto.toLowerCase();

  }

  // Column Ember table
  get columns() {
    return [
      {
        name: "#",
        valuePath: "count",
        width: 10
      },
      {
        name: "Cliente",
        valuePath: "cliente",
        width: 80
      },
      {
        name: "Proyecto",
        valuePath: "proyecto",
        width: 220
      },
      {
        name: "Responsable",
        valuePath: "responsable_proyecto",
        width: 50
      },
      {
        name: "Fecha Arranque",
        valuePath: "fecha_arranque",
        width: 100
      },
      {
        name: "Fecha Completamiento",
        valuePath: "fecha_completamiento",
        width: 100,
      },
      {
        name: "Porcentaje Avance",
        valuePath: "porcentaje_avance",
        width: 50
      },
    ];
  }

// Save values
  @action
  updateOption(event) {
    this.option = event.target.value;
  }

  @action
  updateName(event) {
    this.cliente = event.target.value;
    console.log(cliente, 'Typiando');
  }

  @action
  updateProject(event) {
    this.proyecto = event.target.value;
    console.log(proyecto, 'Typiando');
  }

  @action
  updateFechaArranque(event) {
    this.fecha_arranque = event.target.value;
  }

  @action
  updateFechaCompletamiento(event) {
    this.fecha_completamiento = event.target.value;
  }

  @action
  updatePorcentaje(event) {
    this.porcentaje_avance = event.target.value;
  }

  @action
  updateSearchTerm(event) {
    this.searchTerm = event.target.value;
  }

  @action
  submit() {
    if (!this.proyecto || !this.cliente) {
      window.alert("Debe llenar todo los campos");

      return;
    }

    this.model.push({
      proyecto: this.proyecto,
      cliente: this.cliente,
      fecha_arranque: this.fecha_arranque,
      fecha_completamiento: this.fecha_completamiento,
      porcentaje_avance: "80%",
    });

    this.searchTerm = "";
    //Close modal
    this.modalProyecto = false;

    //Clear modal
    this.proyecto = null;
    this.cliente = null;
    this.fecha_arranque = null;
    this.fecha_completamiento = null;
  }

  @action
  limpiarFiltroFechas() {
    this.fechaArranqueInicio = null;
    this.fechaArranqueFin = null;
    this.fechaCompletamientoInicio = null;
    this.fechaCompletamientoFin = null;
    this.modalFechaArranque = false;
  }

  // Ordenamiento con Ember table
  @action
  twoStateSorting(organize) {
    if (organize.length > 1) {
      set(this, "sorts", organize);

      return;
    }

    let hasExistingSort = this.sorts && this.sorts.length;
    let isDefaultSort = !organize.length;

    if (hasExistingSort && isDefaultSort) {
      let newSorts = [
        {
          valuePath: this.sorts[0].valuePath,
          isAscending: !this.sorts[0].isAscending,
        },
      ];

      set(this, "sorts", newSorts);

      return;
    }

    set(this, "sorts", organize);
  }
}
