import { BackendApiService } from './BackendApi.service'

export class LoginService extends BackendApiService {
  constructor() {
    super()
  }

  autenticarUsuario(data: any) {
    let url = this.baseUrl + "/usuario/login";

    return new Promise((resolve, error) => {
      this.post(url, data).then((respuesta: any) => {
        resolve(respuesta);
      }).catch((e) => {
        error(e);
      });
    });
  }

  registrarUsuario(data: any) {
    let url = this.baseUrl + "/usuario/register";
    return new Promise((resolve, error) => {
      this.post(url, data).then((respuesta: any) => {
        resolve(respuesta);
      }).catch((e) => {
        error(e);
      });
    });
  }
}