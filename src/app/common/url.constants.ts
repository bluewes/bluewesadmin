import { environment } from "../../environments/environment";

export let apiBaseUrl = '';
if(environment.envName === 'dev'){
    apiBaseUrl = 'https://localhost:44382/api/';
}

export const API_BASE_URL = apiBaseUrl;