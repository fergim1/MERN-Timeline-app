import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc'

import { startLogin } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
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
        history.push("/timeline")
    }

    const responseGoogle = (resp) => {
        const email = resp.profileObj.email;
        const password = resp.googleId

        dispatch( startLogin( email, password ))
        history.push("/timeline")
    }

  return (
    <div className="wrapper animate__animated animate__fadeIn">
        <div className='div-up loginDivUp'>
            <h4>
                Bienvenidos
            </h4>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320"><path fill="#ffffff" fillOpacity="1" d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,208C672,235,768,245,864,240C960,235,1056,213,1152,218.7C1248,224,1344,256,1392,272L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </div>
        <div className='div-form loginForm' >

                <form 
                    className="form"
                    onSubmit={ handleSubmit }
                >
                    <input 
                        type="email" 
                        className="input" 
                        placeholder="&#xf0e0;   Email*"
                        name='email'
                        value={ email }
                        onChange= { handleInputChange }
                    />
        
                    <input
                        type="password"
                        className="input"
                        placeholder="&#xf084;   Contraseña*"                  
                        name='password'
                        value={ password }
                        onChange= { handleInputChange }
                    />

                    <button className="button-login-register" type="submit">
                        Iniciar sesión
                    </button>

                    <GoogleLogin
                        clientId="627245880489-14hgph4vte2g2fefvoc52nk0ilvmrnnh.apps.googleusercontent.com"
                        render={renderProps => (
                            <button 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled}
                                className="button-google"
                            >
                                <FcGoogle
                                    className='icon-google'
                                />
                                Iniciar sesión
                            </button>
                          )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                <Link
                    to='/auth/register'
                    className='link text-center'
                >
                    <div
                        className='link-register'
                    >

                    </div>
                    ¿ Aún no tienes cuenta ? <p className='pENregister'>Regístrate</p>
                </Link>
                </form>

        </div>
    </div>
  );
};
