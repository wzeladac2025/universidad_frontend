import { BackendApiService } from "./BackendApi.service";

export class ActividadEstudianteService extends BackendApiService {
  constructor() {
    super();
  }

  registrar(data: any) {
    let url = "/tarea_estudiante/create";
    return new Promise((resolve, error) => {
      this.postSecurity(url, data)
        .then((respuesta: any) => {
          resolve(respuesta);
        })
        .catch((e) => {
          error(e);
        });
    });
  }

  obtenerPorId(id: number) {
    let url = "/tarea_estudiante/" + id;

    return new Promise((resolve, error) => {
      this.get(url)
        .then((respuesta: any) => {
          resolve(respuesta); 
        })
        .catch((e) => {
          error(e);
        });
    });
  }

    obtenerPorTareaEstudiante(id_tarea: number, carnet_estudiante: string) {
    let url = "/tarea_estudiante/encontrarTareaEstudiante/" + id_tarea + carnet_estudiante;

    return new Promise((resolve, error) => {
      this.get(url)
        .then((respuesta: any) => {
          resolve(respuesta); 
        })
        .catch((e) => {
          error(e);
        });
    });
  }

  obtener() {
    let url = "/tarea_estudiante/";

    return new Promise((resolve, error) => {
      this.get(url)
        .then((respuesta: any) => {
          resolve(respuesta);
        })
        .catch((e) => {
          error(e);
        });
    });
  }

  actualizar(id: number, data: any) {
    let url = "/tarea_estudiante/update/" + id;

    return new Promise((resolve, error) => {
      this.put(url, data)
        .then((respuesta: any) => {
          resolve(respuesta);
        })
        .catch((e) => {
          error(e);
        });
    });
  }
}
