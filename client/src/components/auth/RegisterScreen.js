import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2';
import GoogleLogin from 'react-google-login';
import { startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import './style-login.css'

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
    <div className="container">
        <div className="row justify-content-center">
                <form 
                    className="form-login"
                    onSubmit={ handleSubmit }
                    >
                    <h4 className="d-grid gap-2 col-12 mx-auto mt-4 mb-4 text-center"> Registrarse </h4>

                    <div className="d-grid gap-2 col-12 mx-auto mt-3 mb-3 ">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nombre*"
                        name='name'
                        value={ name }
                        onChange= { handleInputChange }
                        autoComplete='off'
                    />
                    </div>

                    <div className="d-grid gap-2 col-12 mx-auto mt-3 mb-3 ">
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Email*"
                        name='email'
                        value={ email }
                        onChange= { handleInputChange }
                        autoComplete='off'
                    />
                    </div>
                    <div className="d-grid gap-2 col-12 mx-auto mt-3 mb-3 ">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña*"
                        name='password'
                        value={ password }
                        onChange= { handleInputChange }
                    />
                    </div>

                    <div className="d-grid gap-2 col-12 mx-auto mt-3 mb-3 ">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirmar contraseña*"
                        name='password2'
                        value={ password2 }
                        onChange= { handleInputChange }
                    />
                    </div>


                    <div className="d-grid gap-2 col-12 mx-auto">
                    <button className="buttonSubmit" type="submit">
                        Registrarse
                    </button>
                    </div>
                    <div className='googleLogin'>
                        <GoogleLogin
                            clientId="627245880489-14hgph4vte2g2fefvoc52nk0ilvmrnnh.apps.googleusercontent.com"
                            buttonText="Registrate con Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            className="form-control googleButton"
                        />
                     </div>

            <div className="d-grid gap-2 col-12 mx-auto mt-3">
                <Link
                    to='/auth/login'
                    className='link text-center'
                >
                 ¿ Ya tienes una cuenta ? <p className='pENregister'>iniciar sesión</p>
                </Link>
            </div>
                </form>

        </div>
    </div>
  );
};
