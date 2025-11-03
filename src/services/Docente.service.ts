import { BackendApiService } from "./BackendApi.service";

export class DocenteService extends BackendApiService {
  constructor() {
    super();
  }

  registrar(data: any) {
    let url = "/docente/create";
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

obtenerPorCarnet(carnet: string) {
  let url = "/docente/" + carnet;

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
    let url = "/docente/";

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
    let url = "/docente/update/" + id;

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
