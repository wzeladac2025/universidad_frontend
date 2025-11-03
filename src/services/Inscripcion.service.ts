import { BackendApiService } from "./BackendApi.service";

export class InscripcionService extends BackendApiService {
  constructor() {
    super();
  }

  registrar(data: any) {
    let url = "/inscripcion/create";
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
    let url = "/inscripcion/" + id;

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

    obtenerPorCurso(carnet: string) {
    let url = "/inscripcion/estudiante/" + carnet;

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
    let url = "/inscripcion/";

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
    let url = "/inscripcion/update/" + id;

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
