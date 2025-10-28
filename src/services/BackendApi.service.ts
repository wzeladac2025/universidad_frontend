import { Axios } from "axios";

export class BackendApiService {

    public baseUrl: string;
    private axios: Axios = new Axios;

    constructor() {
        this.baseUrl = 'http://localhost:8081/api';
    }

    post(url: string, data: any) {
        let endpoint = this.baseUrl + url;
        return new Promise(resolve => {
            this.axios.post(endpoint, data).then(response => {
                resolve(response);
            }).catch(error => {
                resolve(error);
            });
        });
    }
}