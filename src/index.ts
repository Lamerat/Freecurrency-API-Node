import { statusResponse, currencyObject, currencyCode, latestObject } from './types.js';

export default class CurrencyApi {
  private readonly API: string = 'https://api.freecurrencyapi.com/v1';
  private headers: { apikey: string };


  constructor(apiKey: string) {
    this.headers = { apikey: apiKey };
  }


  /** Returns your current quota */
  public async status(): Promise<statusResponse> {
    try {
      const result = await fetch(`${this.API}/status`, { headers: this.headers });
      const obj = await result.json();

      if (result.status > 400) this.CError(result.status, obj);

      return Promise.resolve(obj);
    } catch (error) {
      return Promise.reject(error);
    }
  }


  /** Returns all our supported currencies */
  public async currencies(selected?: currencyCode | currencyCode[]): Promise<currencyObject[]> {
    try {
      const queryParams = selected
        ? Array.isArray(selected) ? selected.map((x) => x.trim()).join(',') : selected.trim()
        : '';

      const query = queryParams ? `?currencies=${queryParams}` : '';
      const result = await fetch(`${this.API}/currencies${query}`, { headers: this.headers });
      const obj = await result.json();

      if (result.status > 400) this.CError(result.status, obj);
      
      return Object.values(obj.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }


  /** Returns the latest exchange rates. The default base currency is USD, selected is all available currencies will be shown */
  public async latest(base?: currencyCode, selected?: currencyCode | currencyCode[]): Promise<latestObject> {
    try {
      const baseQuery = base ? base.trim() : '';
      const currencyQuery = selected
        ? Array.isArray(selected) ? selected.map((x) => x.trim()).join(',') : selected.trim()
        : '';        

      const result = await fetch(`${this.API}/latest?currencies=${currencyQuery}&base_currency=${baseQuery}`, { headers: this.headers });
      const obj = await result.json();
  
      if (result.status > 400) this.CError(result.status, obj);
      
      return obj.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }


  public async historical(date: string, base?: currencyCode, selected?: currencyCode | currencyCode[]): Promise<{ date: string, rates: latestObject }> {
    try {
      const dateReg = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
      if (!dateReg.test(date)) this.CError(422, { message: 'Invalid date. Format is YYYY-MM-DD' });

      const baseQuery = base ? base.trim() : '';
      const currencyQuery = selected
        ? Array.isArray(selected) ? selected.map((x) => x.trim()).join(',') : selected.trim()
        : '';        

      const result = await fetch(`${this.API}/historical?date=${date}&currencies=${currencyQuery}&base_currency=${baseQuery}`, { headers: this.headers });
      const obj = await result.json();
  
      if (result.status > 400) this.CError(result.status, obj);
      
      return { date, rates: obj.data[date] };
    } catch (error) {
      return Promise.reject(error);
    }
  }


  private CError(code: number, result: any): void {
    throw new CError(code, result?.message || 'Free currency api unknow error');
  }
}


class CError extends Error {
  private code: number;

  constructor (code: number, ...params: any) {
    super(...params);
    this.code = code;
  }
}
