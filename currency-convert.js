const axios = require('axios')

const getExchangeRate = (from, to) => {
  return axios.get(`https://free.currencyconverterapi.com/api/v5/convert?q=${from}_${to}&compact=y`).then((response) => {
    return response.data.USD_INR.val
  })
}

const getCountries = (currencyCode) => {
  return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
    return response.data.map((counrty) => counrty.name)
  })
}

const convertCurrency = (from, to, amount) => {
  let countries
  return getCountries(to).then((tempCountries) => {
    countries = tempCountries
    return getExchangeRate(from, to)
  }).then((rate) => {
    const exchangedAmount = amount * rate

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`
  }) 
}

const convertCurrencyAlt = async (from, to, amount) => {
  const countries = await getCountries(to)
  const rate = await getExchangeRate(from, to)
  const exchangedAmount = amount * rate

  return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`
}

convertCurrencyAlt('USD', 'INR', 1).then((status) => {
  console.log(status)
})