import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import GoogleLogin from 'react-google-login';

import { startLogin } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import './style-login.css'
import Swal from "sweetalert2";

export const LoginScreen = () => {


    const dispatch = useDispatch()
    let history = useHistory();


    const [ formValues , handleInputChange ] = useForm({
        email: '',
        password: ''
    })

    const { email, password } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        if ( email.trim().length === 0 || password.trim().length === 0 ){
            return Swal.fire('Error', 'Debes completar email y password', 'error');
        }
        dispatch( startLogin( email, password ))
        history.push("/")
        // console.log(formValues)
    }

    const responseGoogle = (resp) => {
        const email = resp.profileObj.email;
        const password = resp.googleId

        dispatch( startLogin( email, password ))
        history.push("/")
    }

  return (
    <div className="container">
        <div className="row justify-content-center">
                <form 
                    className="form-login"
                    onSubmit={ handleSubmit }
                >
                    <h4 className="d-grid gap-2 col-12 mx-auto mt-4 mb-4 text-center"> Bienvenidos </h4>
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
                    <div className="d-grid gap-2 col-12 mx-auto mt-3 mb-3 ">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password*"
                        name='password'
                        value={ password }
                        onChange= { handleInputChange }
                    />
                    </div>
                    <div className="d-grid gap-2 col-12 mx-auto">
                    <button className="buttonSubmit" type="submit">
                        Iniciar sesión
                    </button>
                    </div>
                <div className='googleLogin'>
                    <GoogleLogin
                        clientId="627245880489-14hgph4vte2g2fefvoc52nk0ilvmrnnh.apps.googleusercontent.com"
                        buttonText="Iniciar sesión con Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        className="form-control googleButton"
                    />
                </div>
                
                <div className="d-grid gap-2 col-12 mx-auto mt-3">

                <Link
                    to='/auth/register'
                    className='link text-center'
                >
                    ¿ Aún no tienes cuenta ? <p className='pENregister'>Regístrate</p>
                </Link>
                </div>
                </form>
        </div>
    </div>
  );
};
