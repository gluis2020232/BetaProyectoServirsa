import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from "@ember/service";
import { set } from "@ember/object";

export default class ProjectController extends Controller {
  @tracked nombre_tarea;
  @tracked link;
  @tracked searchTerm = "";
  @tracked sorts = [
    {valuePath: "nombre_tarea", isAscending: true },
  ];
  @tracked modal = false;

	get columns() {
    return [
      { name: "Nombre tarea", valuePath: "nombre_tarea" },
      { name: "Enlace", valuePath: "link" },
    ]
  }

  @action
    updateNameWork(event) {
      this.nombre_tarea = event.target.value;
      console.log(nombre_tarea, 'Add work');
    }

  @action
    updateLink(event) {
      this.link = event.target.value;
      console.log(link, 'Add link');
    }

  //Submit Add Work
  @action
  submit() {

    this.model.push({
      nombre_tarea: this.nombre_tarea,
      link: this.link,
    });

    this.searchTerm = "";
  }

   //Ordenamiento con Ember table
  @action
  twoStateSorting(sorts) {
    if (sorts.length > 1) {
      // multi-column sort, default behavior
      this.set('sorts', sorts);
      return;
    }
    let hasExistingSort = this.sorts && this.sorts.length;
    let isDefaultSort = !sorts.length;

    if (hasExistingSort && isDefaultSort) {
      // override empty sorts with reversed previous sort
      let newSorts = [
        {
          valuePath: this.sorts[0].valuePath,
          isAscending: !this.sorts[0].isAscending,
        },
      ];
      this.set('sorts', newSorts);
      return;
    }
    this.set('sorts', sorts);
  }

  @action
  updateSearchTerm(event) {
    this.searchTerm = event.target.value;
  }

}


