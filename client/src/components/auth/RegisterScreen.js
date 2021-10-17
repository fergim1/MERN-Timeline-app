import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc'
import { startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";


export const RegisterScreen = () => {

    let history = useHistory()
    const dispatch = useDispatch()
    const [ formValues , handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || password2.trim().length === 0){
            return Swal.fire('Error', 'Debes completar todos los campos', 'error');
        }
        if (name.trim().length < 2){
            return Swal.fire('Error', 'El nombre debe contener más de 2 letras', 'error');
        }
        if (password !==password2){
            return Swal.fire('Error', 'Las contraseñas son distintas, intente nuevamente', 'error');
        }
        dispatch( startRegister( name, email, password))
        history.push('/')        
    }

    
    const responseGoogle = (resp) => {
        console.log(resp)
        const email = resp.profileObj.email;
        const name = resp.profileObj.name
        const password = resp.googleId
        dispatch( startRegister(
            name,
            email,
            password
        ) )  
    }

  return (
    <div className="wrapper animate__animated animate__fadeIn">

        <div className='div-up registerDivUp'>
            <h4>
                Registrarse
            </h4>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320"><path fill="#ffffff" fillOpacity="1" d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,208C672,235,768,245,864,240C960,235,1056,213,1152,218.7C1248,224,1344,256,1392,272L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </div>
        <div className='div-form registerForm' >
                <form 
                    className="form"
                    onSubmit={ handleSubmit }
                    >
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="&#xf007;   Nombre*"
                        name='name'
                        value={ name }
                        onChange= { handleInputChange }
                        autoComplete='off'
                    />
                    <input 
                        type="email" 
                        className="input" 
                        placeholder="&#xf0e0;   Email*"
                        name='email'
                        value={ email }
                        onChange= { handleInputChange }
                        autoComplete='off'
                    />
                    <input
                        type="password"
                        className="input" 
                        placeholder="&#xf084;   Contraseña*"
                        name='password'
                        value={ password }
                        onChange= { handleInputChange }
                    />

                    <input
                        type="password"
                        className="input" 
                        placeholder="&#xf084;   Confirmar contraseña*"
                        name='password2'
                        value={ password2 }
                        onChange= { handleInputChange }
                    />

                    <button className="button-login-register" type="submit">
                        Registrarse
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
                                    Registrarse
                                </button>
                              )}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            className="form-control googleButton"
                        />
                <Link
                    to='/auth/login'
                    className='link text-center'
                >
                 ¿ Ya tienes una cuenta ? <p className='pENregister'>iniciar sesión</p>
                </Link>
                </form>

        </div>
    </div>
  );
};
