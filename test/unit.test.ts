import CurrencyApi from '../src/index.js';
import { expect } from 'chai';
import 'dotenv/config';

const apiKey = process.env.API_KEY || 'test';

describe('Authorization', function() {
  it('With wrong API KEY', async function() {
    const currency = new CurrencyApi('INVALID_API_KEY');
    try {
      await currency.status();
    } catch (error) {
      expect(error.message).equal('Invalid authentication credentials');
      expect(error.code).equal(401);
    }
  });
});

describe('Status endpoint', function() {
  it('Normal request', async function() {
    const currency = new CurrencyApi(apiKey);
    const res = await currency.status();
    expect(res).property('quotas');
    expect(res).property('account_id');
    expect(res.quotas).property('month');
    expect(res.quotas).property('grace');
    expect(res.account_id).to.be.a('number');
    expect(res.quotas.month.remaining).to.be.a('number');
    expect(res.quotas.month.total).to.be.a('number');
    expect(res.quotas.month.used).to.be.a('number');
    expect(res.quotas.grace.remaining).to.be.a('number');
    expect(res.quotas.grace.total).to.be.a('number');
    expect(res.quotas.grace.used).to.be.a('number');
  });
});

describe('Currencies endpoint', function() {
  const currency = new CurrencyApi(apiKey);

  it('Without query params', async function() {
    const res = await currency.currencies();
    expect(res).to.be.a('array');
  });

  it('For single currency', async function() {
    const res = await currency.currencies('BGN');
    expect(res).to.be.a('array');
    expect(res[0]).property('symbol');
    expect(res[0]).property('name');
    expect(res[0]).property('symbol_native');
    expect(res[0]).property('decimal_digits');
    expect(res[0]).property('rounding');
    expect(res[0]).property('code');
    expect(res[0]).property('name_plural');
    expect(res[0]).property('type');
    expect(res[0].code).to.be.equal('BGN');
  });

  it('For few currencies', async function() {
    const res = await currency.currencies(['BGN', 'RUB', 'EUR']);
    expect(res).to.be.a('array');
    expect(res).to.have.length(3);
  });
});


describe('Latest exchange rates endpoint', function() {
  const currency = new CurrencyApi(apiKey);

  it('Without query params', async function() {
    const res = await currency.latest();
    expect(res).to.be.a('object');
    expect(res).property('USD');
    expect(res.USD).to.be.equal(1);
  });

  it('With single currency', async function() {
    const res = await currency.latest('BGN', 'RUB');
    expect(res).to.be.a('object');
    expect(res).property('RUB');
    expect(res.RUB).to.be.a('number');
  });

  it('With few currencies', async function() {
    const res = await currency.latest('BGN', ['RUB', 'EUR', 'BGN']);
    expect(res).to.be.a('object');
    expect(res).property('RUB');
    expect(res).property('EUR');
    expect(res).property('BGN');
    expect(res.RUB).to.be.a('number');
    expect(res.EUR).to.be.a('number');
    expect(res.BGN).to.be.a('number');
    expect(res.BGN).to.be.equal(1);
  });
});


describe('Historical exchange rates endpoint', function() {
  const currency = new CurrencyApi(apiKey);

  it('With wrong date', async function() {
    try {
      await currency.historical('12-12-12');
    } catch (error) {
      expect(error.message).equal('Invalid date. Format is YYYY-MM-DD');
      expect(error.code).equal(422);
    }

    try {
      await currency.historical('1201-12-12');
    } catch (error) {
      expect(error.message).equal('Validation error');
      expect(error.code).equal(422);
    }
  });

  it('Without query params', async function() {
    const res = await currency.historical('2020-01-01');
    expect(res).to.be.a('object');
    expect(res).property('date');
    expect(res).property('rates');
    expect(res.date).to.be.equal('2020-01-01');
    expect(res.rates.USD).to.be.equal(1);
  });

  it('With single currency', async function() {
    const res = await currency.historical('2020-01-01', 'BGN', 'RUB');
    expect(res).to.be.a('object');
    expect(res).property('date');
    expect(res).property('rates');
    expect(res.rates).property('RUB');
    expect(res.date).to.be.equal('2020-01-01');
    expect(res.rates.RUB).to.be.a('number');
  });

  it('With few currencies', async function() {
    const res = await currency.historical('2020-01-01', 'BGN', ['RUB', 'EUR', 'BGN']);
    expect(res).to.be.a('object');
    expect(res).property('date');
    expect(res).property('rates');
    expect(res.rates).property('RUB');
    expect(res.rates).property('EUR');
    expect(res.rates).property('BGN');
    expect(res.rates.RUB).to.be.a('number');
    expect(res.rates.EUR).to.be.a('number');
    expect(res.rates.BGN).to.be.a('number');
    expect(res.rates.BGN).to.be.equal(1);
    expect(res.date).to.be.equal('2020-01-01');
  });
});
