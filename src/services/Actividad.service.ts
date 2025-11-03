import { BackendApiService } from "./BackendApi.service";

export class ActividadService extends BackendApiService {
  constructor() {
    super();
  }

  registrar(data: any) {
    let url = "/tarea/create";
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
    let url = "/tarea/" + id;

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

    obtenerPorCurso(id_curso: number) {
    let url = "/tarea/cursos/" + id_curso;

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
    let url = "/tarea/";

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
    let url = "/tarea/update/" + id;

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
