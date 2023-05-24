import Route from '@ember/routing/route';

export default class EjemploRoute extends Route {
  model() {
    return [
      { A: "A", B: "B", C: "C", D: "D" },
      { A: "A", B: "B", C: "C", D: "D" },
      { A: "A", B: "B", C: "C", D: "D" },
      { A: "A", B: "B", C: "C", D: "D" },
      { A: "A", B: "B", C: "C", D: "D" },
      { A: "A", B: "B", C: "C", D: "D" },
      { A: "A", B: "B", C: "C", D: "D" },
      { A: "A", B: "B", C: "C", D: "D" },
      { A: "A", B: "B", C: "C", D: "D" },
      { A: "A", B: "B", C: "C", D: "D" },
      { A: "A", B: "B", C: "C", D: "D" },
    ];
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.set("columns", [
      { name: "prueba", valuePath: "A", width: 180 },
      { name: "B", valuePath: "B", width: 180 },
      { name: "C", valuePath: "C", width: 180 },
      { name: "D", valuePath: "D", width: 180 },
    ]);
  }
}
