import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2';
import { startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import './style-login.css'

export const RegisterScreen = () => {

    let history = useHistory()
    const dispatch = useDispatch()
    const [ formValues , handleInputChange ] = useForm({
        name: 'fer',
        email: 'fer@gmail.com',
        password: '123456',
        password2: '123456'
    })

    const { name, email, password, password2 } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim().length < 2){
            return Swal.fire('Error', 'El nombre debe contener más de 2 letras', 'error');
        }
        if (password !==password2){
            return Swal.fire('Error', 'Las contraseñas son distintas, intente nuevamente', 'error');
        }
        dispatch( startRegister( name, email, password))
        history.push('/')
        console.log(history)
        
    }

  return (
    <div className="container">
        <div className="row justify-content-center">
                <form 
                    className="form-login"
                    onSubmit={ handleSubmit }
                    >
                    <h4 className="d-grid gap-2 col-12 mx-auto mt-4 mb-4 "> Register </h4>

                    <div className="d-grid gap-2 col-12 mx-auto mt-3 mb-3 ">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nombre"
                        name='name'
                        value={ name }
                        onChange= { handleInputChange }
                    />
                    </div>

                    <div className="d-grid gap-2 col-12 mx-auto mt-3 mb-3 ">
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Email"
                        name='email'
                        value={ email }
                        onChange= { handleInputChange }
                    />
                    </div>
                    <div className="d-grid gap-2 col-12 mx-auto mt-3 mb-3 ">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        name='password'
                        value={ password }
                        onChange= { handleInputChange }
                    />
                    </div>

                    <div className="d-grid gap-2 col-12 mx-auto mt-3 mb-3 ">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirmar contraseña"
                        name='password2'
                        value={ password2 }
                        onChange= { handleInputChange }
                    />
                    </div>


                    <div className="d-grid gap-2 col-12 mx-auto">
                    <button className="btn btn-primary" type="submit">
                        Register
                    </button>
                    </div>

            <div className="d-grid gap-2 col-12 mx-auto mt-3">
                <Link
                    to='/auth/login'
                    className='link'
                >
                    Ya tienes una cuenta? click aquí
                </Link>
            </div>
                </form>

        </div>
    </div>
  );
};
