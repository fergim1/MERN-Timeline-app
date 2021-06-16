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
    <div className="wrapper-guest">
        <h1> Seción invitados </h1>
               
                <form 
                    className="form"
                    onSubmit={ handleSubmit }
                >
                    <input 
                        type="email" 
                        className="inputGuest" 
                        placeholder="&#xf0e0;   Email*"
                        name='email'
                        value={ email }
                        onChange= { handleInputChange }
                    />
                    
                    <button className="button-guest" type="submit">
                        Ingresar 
                    </button>
                <div 
                    className='div-bottom'
                >
                    <Link
                        to='/auth/register'
                        className='register-link-guest'
                    >
                        ¿ Querés tener una línea de tiempo ? <p className='link-word-register'>Regístrate</p>
                    </Link>

                </div>
                </form>
    </div>
  );
};
