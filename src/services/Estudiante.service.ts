import { BackendApiService } from "./BackendApi.service";

export class EstudianteService extends BackendApiService {
  constructor() {
    super();
  }

  registrar(data: any) {
    let url = "/estudiante/create";
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

  obtenerPorId(id: any) {
    let url = "/estudiante/" + id;

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
    let url = "/estudiante/";

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

  actualizar(carnet: any, data: any) {
    let url = "/estudiante/update/" + carnet;

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
