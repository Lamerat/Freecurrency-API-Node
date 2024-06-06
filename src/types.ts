type quota = {
  total: number,
  used: number,
  remaining: number
}

type quotas = { month: quota, grace: quota }

export type currencyCode = 'EUR' | 'USD' | 'JPY' | 'BGN' | 'CZK' | 'DKK' | 'GBP' | 'HUF' | 'PLN' | 'RON' | 'SEK' | 'CHF' | 'ISK' | 'NOK' | 'HRK' | 'RUB' | 'TRY' | 'AUD' | 'BRL' | 'CAD' | 'CNY' | 'HKD' | 'IDR' | 'ILS' | 'INR' | 'KRW' | 'MXN' | 'MYR' | 'NZD' | 'PHP' | 'SGD' | 'THB' | 'ZAR'

export type statusResponse = { account_id: number, quotas: quotas }

export type currencyObject = {
  symbol: string,
  name: string,
  symbol_native: string,
  decimal_digits: number,
  rounding: number,
  code: string,
  name_plural: string,
  type: string
}

export type latestObject = {
  AUD: number,
  BGN: number,
  BRL: number,
  CAD: number,
  CHF: number,
  CNY: number,
  CZK: number,
  DKK: number,
  EUR: number,
  GBP: number,
  HKD: number,
  HRK: number,
  HUF: number,
  IDR: number,
  ILS: number,
  INR: number,
  ISK: number,
  JPY: number,
  KRW: number,
  MXN: number,
  MYR: number,
  NOK: number,
  NZD: number,
  PHP: number,
  PLN: number,
  RON: number,
  RUB: number,
  SEK: number,
  SGD: number,
  THB: number,
  TRY: number,
  USD: number,
  ZAR: number
}
