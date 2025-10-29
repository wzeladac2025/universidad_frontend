import { Axios } from "axios";

export class BackendApiService {
  public baseUrl: string;

  public static access_token: string = "";
  private axios: Axios = new Axios();

  //HEADERS
  public headersSecurity = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Autorization: "Bearer " + BackendApiService.access_token,
  };

  constructor() {
    this.baseUrl = "http://localhost:8081/api";
  }

  post(url: string, data: any) {
    let endpoint = this.baseUrl + url;
    return new Promise((resolve, error) => {
      this.axios
        .post(endpoint, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          if (response.status == 200) {
            resolve(JSON.parse(response.data));
          } else {
            error(JSON.parse(response.data));
          }
        })
        .catch((e) => {
          error({
            mensaje: "Ocurrio un error",
            error: e.code + "<" + e.message + ">",
          });
        });
    });
  }

  postSecurity(url: string, data: any) {
    let endpoint = this.baseUrl + url;
    return new Promise((resolve, error) => {
      this.axios
        .post(endpoint, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          if (response.status == 200) {
            resolve(JSON.parse(response.data));
          } else {
            error(JSON.parse(response.data));
          }
        })
        .catch((e) => {
          error({
            mensaje: "Ocurrio un error",
            error: e.code + "<" + e.message + ">",
          });
        });
    });
  }  

  get(url: string) {
    let endpoint = this.baseUrl + url;
    return new Promise((resolve, error) => {
      this.axios
        .get(endpoint, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + BackendApiService.access_token,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            resolve(JSON.parse(response.data));
          } else {
            error(JSON.parse(response.data));
          }
        })
        .catch((e) => {
          error({
            mensaje: "Ocurrio un error",
            error: e.code + "<" + e.message + ">",
          });
        });
    });
  }
}
