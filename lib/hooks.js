import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'


export const useGetContext = () => useContext(GetContextCupcake)
const GetContextCupcake = React.createContext(undefined, undefined)

export function GetDataOperator({ children }) {
  const enquiries = ['first', 'second', 'third']
  const initSigns = ['Pair name/market', 'First', 'Second', 'Third']
  const divExrates = ['RUB/CUPCAKE', 'USD/CUPCAKE', 'EUR/CUPCAKE', 'RUB/USD', 'RUB/EUR', 'EUR/USD']


  const [exrates, setExrates] = useState()
  const [signs, setSigns] = useState(initSigns)
  const value = {
    signs,
    exrates
  }

  const getExrates = () => {
    const enquiry = enquiries.map(request => axios.get(`https://cupcake-task.herokuapp.com/api/v1/${request}`))
    return axios.all(enquiry)
  }

  const formExrates = () => {
    const newExrates = [];
    setSigns(initSigns)

    getExrates().then(res => {
      divExrates.forEach(attr => {
        fillNewExrates(newExrates, res, attr)
      });

      // data 
      newExrates.forEach(exrate => {
        const exrateValues = []
        enquiries.map(attribute => {
          exrateValues.push(exrate[attribute].value)
          return attribute;
        }).forEach(attribute => {
          exrate[attribute]['lowest'] = exrate[attribute].value === lowestExrate(exrateValues);
        })
      })
      setExrates(newExrates)

    }).finally(() => {
      setTimeout(() => {
        formExrates()
      }, 0)

    }).catch(error => {
      setExrates([])
      setSigns(signs => {
        return signs.map(() => 'Error')
      })
      console.error('error', error)
    })
  }
  useEffect(() => {
    formExrates();
  }, []);
  // exrates
  const fillNewExrates = (newExrates, res, attr) => {
    const [numerator, denominator] = attr.split('/')

    const preparedRow = {}
    res.forEach(resItem => {
      // url
      const splitUrl = resItem.config.url.split('/')
      const row = splitUrl[splitUrl.length - 1]

      const numeratorVal = resItem.data.rates[numerator],
        denominatorVal = resItem.data.rates[denominator]

      if (!numeratorVal || !denominatorVal) return;
      preparedRow['name'] = attr;
      preparedRow[row] = { value: pairExrate(numeratorVal, denominatorVal) };
    });

    if (!Object.keys(preparedRow).length) return;
    newExrates.push(preparedRow);
  }

  const lowestExrate = arr => arr.reduce((p, v) => (p < v ? p : v));

  const pairExrate = (numerator, denominator) => Number((numerator / denominator).toFixed(2));

  return (
    <GetContextCupcake.Provider value={value}>
      {children}
    </GetContextCupcake.Provider>
  )
}


