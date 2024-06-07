# FREECURRENCY-API-NODE
Library for requests to https://freecurrencyapi.com/

### Installation
```bash
npm i freecurrency-api-node
```

### Usage
```JS
import CurrencyApi from "freecurrency-api-node";

const currencies = new CurrencyApi('YOUR_API_KEY')

// Status endpoint
currencies.status()
  .then(res => console.log(res))
  .catch(error => console.log(error))

// Currencies endpoint
currencies.currencies()
  .then(res => console.log(res))
  .catch(error => console.log(error))

currencies.currencies('BGN')
  .then(res => console.log(res))
  .catch(error => console.log(error))

currencies.currencies(['BGN', 'RUB'])
  .then(res => console.log(res))
  .catch(error => console.log(error))

// Latest exchange rates endpoint
currencies.latest()
  .then(res => console.log(res))
  .catch(error => console.log(error))

currencies.latest('BGN')
  .then(res => console.log(res))
  .catch(error => console.log(error))

currencies.latest('BGN', 'EUR')
  .then(res => console.log(res))
  .catch(error => console.log(error))

currencies.latest('BGN', ['EUR', 'RUB'])
  .then(res => console.log(res))
  .catch(error => console.log(error))

// Historical exchange rates endpoint
// First argument (date) is required. Must be date in format YYYY-MM-DD
currencies.historical('2022-10-10')
  .then(res => console.log(res))
  .catch(error => console.log(error))

currencies.historical('2022-10-10', 'BGN')
  .then(res => console.log(res))
  .catch(error => console.log(error))

currencies.historical('2022-10-10', 'BGN', 'RUB')
  .then(res => console.log(res))
  .catch(error => console.log(error))

currencies.historical('2022-10-10', 'BGN', ['RUB', 'CAD'])
  .then(res => console.log(res))
  .catch(error => console.log(error))
```

### License

The MIT License (MIT). Please see [License File](LICENSE) for more information