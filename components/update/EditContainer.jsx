import React from 'react'
import ListOfItemsToEdit from './ListOfItemsToEdit'

const EditDataContainer = () => {
  return (
    <section className="container">
      <h2 >Gestionar Datos</h2>
      <h3>Horarios</h3>
      <ListOfItemsToEdit type={'schedule'} />
      <h3>Notas</h3>
      <ListOfItemsToEdit type={'note'} />

      <style jsx>{`
          .container{
            padding: 25px;
            max-width: 750px;
            margin: 0 auto;
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
