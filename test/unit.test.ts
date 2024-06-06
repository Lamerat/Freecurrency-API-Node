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

describe('Status', function() {
  it('Normal request', async function() {
    const currency = new CurrencyApi(apiKey);
    const res = await currency.status();
    expect(res).property('quotas');
    expect(res).property('account_id');
    expect(res.quotas).property('month');
    expect(res.quotas).property('grace');
    expect(res.account_id).to.be.a('number');
    expect(res.quotas.month.remaining).to.be.a('number');
  });
});


