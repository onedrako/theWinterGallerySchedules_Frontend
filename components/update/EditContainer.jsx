import React from 'react'
import ListOfItemsToEdit from './ListOfItemsToEdit'
import ListOfDays from './ListOfDays'

const EditDataContainer = () => {
  return (
    <section className="container">
      <h2 className="title">Actualizar Datos</h2>
      <h3>Horarios</h3>
      <ListOfItemsToEdit type={'schedule'} />
      <h3>Notas</h3>
      <ListOfItemsToEdit type={'note'}/>
      <h3>Semana</h3>
      <ListOfDays/>

      <style jsx>{`
          .container{
            padding: 25px;
            max-width: 750px;
            margin: 0 auto;
          }
          .title{
            border-bottom: 3px solid #e4a548;
            padding-bottom: 10px;
            color: #e28c29;
            width: 50%;
          }
          h2{
            font-size: 2.5rem;
            margin-bottom: 25px;
          }
          h3{
            font-size: 1.8rem;
            margin-bottom: 10px;
          }
      `}</style>
    </section>
  )
}

export default EditDataContainer
