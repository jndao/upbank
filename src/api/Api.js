// backoff was recommended in the developer docs 
// so it is included and integrated
import { backOff } from "exponential-backoff";
    
/**
 * Default API object class for upbank API
 * Converted from original python to create web app
 * used for this URL https://api.up.com.au
 * Made by John
 */
export default class API {
  constructor() {
    this.url = 'https://api.up.com.au/api/v1';
    this.status = 'undefined';
    this.data = 'undefined';
    this.loading = false;
  }
  
  /**
   * Given a path and options, will fetch api response
   * @param {string} path Path to execute fetch for
   * @param {JSON} options Options for the request via path
   * @returns json response
   */ 
  async getJSON(path, options) {
    this.loading = true;
    try {
      const response = await backOff(() => fetch(path, options));
      this.status = response.status;
      this.data = await response.json();
      this.loading = false;
    } catch (e) {
        console.error(e);
    }

  }

  /**
   * Pings token and returns a promise
   * Used for authentication login
   */
  async pingToken() {
    const data = {
      'method': 'GET',
      'headers': {
        'Authorization': 'Bearer ' + document.getElementById('formBasicPassword').value,
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
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': "application/x-www-form-urlencoded"
      }
    }
    await this.getJSON(`${this.url}/accounts`, data);
    return {'status': this.status, 'data': this.data};
  }

  /**
   * Given an id, will return a promise of account  
   * @param {string} id account id
   * @returns promise
   */
  async getIdAccount(id) {
      const data = {
          'method': 'GET',
          'headers': {
              'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
              'Content-Type': "application/x-www-form-urlencoded"
          }
      }
      await this.getJSON(`${this.url}/accounts/${id}`, data);
      return {'status': this.status, 'data': this.data};
  }
  /**
   * Given an account's id, will return 
   * details to transactions of given account with id 
   * @param {string} id account id
   * @returns promise
   */
  async retrieveTransactions(id) {
    const data = {
      'method': 'GET',
      'headers': {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': "application/x-www-form-urlencoded"
      }
    }
    await this.getJSON(`${this.url}/accounts/${id}/transactions`, data);
    return {'status': this.status, 'data': this.data};
  }

  async getTransactions() {
    const data = {
      'method': 'GET',
      'headers': {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': "application/x-www-form-urlencoded"
      }
    }
    await this.getJSON(`${this.url}/transactions`, data);
    return {'status': this.status, 'data': this.data};
  }
  async getTransactionPage(link) {
    const data = {
      'method': 'GET',
      'headers': {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': "application/x-www-form-urlencoded"
      }
    }
    await this.getJSON(`${link}`, data);
    return {'status': this.status, 'data': this.data};
  }
}