const axios = require('axios')

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(`https://free.currencyconverterapi.com/api/v5/convert?q=${from}_${to}&compact=y`)
    return response.data.USD_INR.val
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`)
  }
}

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
    return response.data.map((counrty) => counrty.name)
  } catch (e) {
      throw new Error(`Unable to get countries that user ${currencyCode}`)
  }
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
}).catch((e) => {
  console.log(e)
})
