import React from 'react'

const CountryAndFlag = ({ country, color }) => {
  let imageSrc = ''
  let textForCountry = ''
  switch (country) {
    case 'Argentina':
      imageSrc = 'https://i.imgur.com/JWqPPUH.png'
      textForCountry = 'Argentina'
      break
    case 'España':
      imageSrc = 'https://i.imgur.com/zZgUXwJ.png'
      textForCountry = 'España Peninsular'
      break
    case 'México':
      imageSrc = 'https://i.imgur.com/bKtXJmQ.png'
      textForCountry = 'México (CDMX)'
      break
    default:
      imageSrc = ''
  }
  return (
    <>
      <div className='countryContainer'>
        <img src={imageSrc} alt={country} width={60} height={60}/>
        <div className='countryContaine__countryInfo'>
          <h3>Hora de {textForCountry}</h3>
        </div>
      </div>

      <style jsx>{`
        .countryContainer{
          display: flex;
          align-items: center;
          margin-left: 115px;
        }
        .countryContaine__countryInfo{
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
          margin-left: 15px;
          width: 250px;
          height: 40px;
          border-radius: 15px;
        }
        h3{
          font-size: 1.8rem;
          color: ${color};
        }
      `}</style>
    </>
  )
}

export default CountryAndFlag
