import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'

import { startGuestLogin } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import './style-login.css'
import Swal from "sweetalert2";

export const GuestLoginScreen = () => {

    const dispatch = useDispatch()
    let history = useHistory();


    const [ formValues , handleInputChange ] = useForm({
        email: '',
    })

    const { email } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        if ( email.trim().length === 0 ){
            return Swal.fire('Error', 'Debes ingresar el email', 'error');
        }
        dispatch( startGuestLogin( email ))
        history.push("/")
    }

  return (
    <div className="container">
        <div className="row justify-content-center">
                <form 
                    className="form-login"
                    onSubmit={ handleSubmit }
                >
                    <h4 className="d-grid gap-2 col-12 mx-auto mt-4 mb-4 text-center"> Invitado </h4>
                    <div className="d-grid gap-2 col-12 mx-auto mt-3 mb-3 ">
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Email*"
                        name='email'
                        value={ email }
                        onChange= { handleInputChange }
                    />
                    </div>
                    
                    <div className="d-grid gap-2 col-12 mx-auto">
                    <button className="buttonSubmit" type="submit">
                        Ingresar como invitado
                    </button>
                    </div>
                
                <div className="d-grid gap-2 col-12 mx-auto mt-3">

                <Link
                    to='/auth/register'
                    className='link text-center'
                >
                    ¿ Queres tener una línea de tiempo ? <p className='pENregister'>Regístrate</p>
                </Link>
                </div>
                </form>
        </div>
    </div>
  );
};
