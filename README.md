# Cryptocurrency Converter

A basic cryptocurrency app that can be used to convert between different currencies and view current exchange rates.

## Deployment (local)

- Clone repo
- Change into crypto-converter directory `cd crypto-converter`
- Provide env variables. A sample is included in **.env.example** file. To use this one, rename file to .env
- Install dependencies `yarn`
- Start server `yarn start`

## Note

[CoinAPI](https://docs.coinapi.io/#md-rest-api) has a rate limit of 100 requests per day for an API key. Only one API key has been provided in **.env.examples** file
