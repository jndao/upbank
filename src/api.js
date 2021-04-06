/**
 * Given a path and options, will fetch api response
 * @param {string} path Path to execute fetch for
 * @param {JSON} options Options for the request via path
 * @returns json response
 */
async function getJSON(path, options) {
}   
    
/**
 * Default API object class for upbank API
 * Made by John
 * Converted from original python to create web app
 * used for this URL https://api.up.com.au
 */
export default class API {
    constructor() {
        this.url = 'https://api.up.com.au/api/v1';
        this.status = 'undefined';
        this.data = 'undefined';
        this.loading = false;
    }

    async getJSON(path, options) {
        this.loading = true;
        const response = await fetch(path, options);

        this.status = response.status;
        this.data = await response.json();
        this.loading = false;
    }

    /**
     * Pings token and returns a promise
     */
    async pingToken() {
        const data = {
            'method': 'GET',
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': "application/x-www-form-urlencoded"
            }
        }
        await this.getJSON(`${this.url}/util/ping`, data);
        return {'status': this.status, 'data': this.data};
    }
    /**
     * Gets all bank account data
     * @returns promise
     */
    async getAccounts() {
        const data = {
            'method': 'GET',
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': "application/x-www-form-urlencoded"
            }
        }
        await this.getJSON(`${this.url}/util/ping`, data);
        return getJSON(`${this.url}/accounts`, data);
    }
    /**
     * Given an id, will return a promise 
     * @param {string} id account id
     * @returns promise
     */
    async getIdAccount(id) {
        const data = {
            'method': 'GET',
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': "application/x-www-form-urlencoded"
            }
        }
        await this.getJSON(`${this.url}/util/ping`, data);
        return getJSON(`${this.url}/accounts/${id}`, data);
    }
}