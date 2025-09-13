import type { Axios } from "axios";

export class BackendApiService {

    baseUrl: string;

    constructor(private axios: Axios) {
        this.baseUrl = '';
    }

    post(url: string, data: any) {
        let endpoint = this.baseUrl + url;
        return new Promise(resolve => {
            this.axios.post(endpoint, data).then(response => {
                //lOGICA AQUI

                resolve(response);
            }).catch(error => {
                resolve(error);
            });
        });
    }
}