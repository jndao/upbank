/**
 * Given a path and options, will fetch api response
 * @param {string} path Path to execute fetch for
 * @param {JSON} options Options for the request via path
 * @returns json response
 */
const getJSON = (path, options) => {
    return(fetch(path, options)).catch(err => console.log("err.message"));
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
    }
    /**
     * Pings token and returns a promise
     */
    pingToken() {
        const data = {
            'method': 'GET',
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': "application/x-www-form-urlencoded"
            }
        }
        return getJSON(`${this.url}/util/ping`, data);
    }
    /**
     * Gets all bank account data
     * @returns promise
     */
    getAccounts() {
        const data = {
            'method': 'GET',
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': "application/x-www-form-urlencoded"
            }
        }
        return getJSON(`${this.url}/accounts`, data);
    }
    /**
     * Given an id, will return a promise 
     * @param {string} id account id
     * @returns promise
     */
    getIdAccount(id) {
        const data = {
            'method': 'GET',
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': "application/x-www-form-urlencoded"
            }
        }
        return getJSON(`${this.url}/accounts/${id}`, data);
    }
}