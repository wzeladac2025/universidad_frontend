import { BackendApiService } from './BackendApi.service'

export class LoginService {
  constructor(private backendApiService: BackendApiService) {}

  autenticarUsuario(data: any) {
    let url = "/usuario/autenticar";
    this.backendApiService.post(url, data).then((respuesta: any) => {});
  }

  registrarUsuario(data: any) {
    let url = "/usuario/registrar";
    this.backendApiService.post(url, data).then((respuesta: any) => {});
  }
}