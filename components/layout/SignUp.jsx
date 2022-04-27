import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

import ErrorMessageForForms from './ErrorMessageForForms'

import safeHTML from '../../utils/sanitizeObject'
import objectPrepared from '../../utils/prepareObject'

const SignUp = () => {
  return (
  <>
    <Formik
      initialValues = {{
        nickName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        role: undefined,
        api: ''
      }}
      validationSchema = {
        yup.object({
          nickName: yup.string().required('El nombre de usuario es requerido'),
          email: yup.string().email('Invalid email').required('El email es requerido '),
          password: yup.string().min(8, 'la contraseña debe tener mínimo 8 dígitos').required('La contraseña es requerida'),
          passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'La contraseña no coincide'),
          role: yup.string().required('El rol es requerido'),
          api: yup.string().required('La API Key es requerida')
        })
      }
      onSubmit = {(values) => {
        const { api } = values
        delete values.passwordConfirm
        delete values.api
        const data = objectPrepared(values)
        const safeData = safeHTML(data)
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, safeData, {
          headers: {
            'Content-Type': 'application/json',
            api: api
          }
        })
          .then(res => {
            if (res.status === 201) {
              console.log('Usuario creado')
            }
          })
      }}
    >

      <div className='container'>
        <h2>Registrarse</h2>
        <Form >
          <div className='form'>
          <div className="inputContainer">
            <label htmlFor='nickName'>Nombre de Usuario</label>
            <Field name="nickName" type="text"/>
            <ErrorMessage name='nickName' component={ErrorMessageForForms} />
          </div>
          <div className="inputContainer">
            <label htmlFor='email'>Correo Electrónico</label>
            <Field name="email" type="text"/>

            <ErrorMessage name='email' component={ErrorMessageForForms}/>

          </div>
          <div className="inputContainer">
            <label htmlFor='password'>Contraseña</label>
            <Field name="password" type="password"/>
            <ErrorMessage name='password' component={ErrorMessageForForms}/>

          </div>
          <div className="inputContainer">
            <label htmlFor='password'>Confirmar Contraseña</label>
            <Field name="passwordConfirm" type="password"/>
            <ErrorMessage name='passwordConfirm' component={ErrorMessageForForms}/>
          </div>

          <div className="inputContainer">
            <label htmlFor='role'>Rol</label>

            <Field name="role" as="select" >
              <option value={null}>Selecciona una opción</option>
              <option value='admin'>Admin</option>
            </Field>
          </div>

          <div className="inputContainer">
            <label htmlFor='api'>APIKey</label>
            <Field name="api" type="text"/>
            <ErrorMessage name='api' component={ErrorMessageForForms}/>
          </div>

          <button type='submit'>Registrarse</button>
          </div>
        </Form>
      </div>
    </Formik>

    <style jsx>{`
      .container{
        display: flex;
        width: 100%;
        height: 100vh;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 25px;
      }
      .form{
        border-radius: 10px;
        border: 1px solid #ccc;
        padding: 25px;
        width: 450px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .inputContainer{
        display: grid;
        gap: 5px;
        font-size: 3rem;
        margin-bottom: 30px;
      }
      h2{
        font-size: 2.5rem;
        margin-bottom: 25px;
      }
      button{
        width: 110px;
        height: 30px;
        font-size: 1.8rem;
        border-radius: 10px;
        border: 1px solid #ccc;
        height: 40px;
        cursor: pointer;
      }
    `}</style>
  </>
  )
}

export default SignUp
