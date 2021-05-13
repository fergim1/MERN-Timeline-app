import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'

import { startLogin } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import './style-login.css'

export const LoginScreen = () => {


    const dispatch = useDispatch()
    let history = useHistory();


    const [ formValues , handleInputChange ] = useForm({
        email: 'fernando@gmail.com',
        password: '123456'
    })

    const { email, password } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch( startLogin( email, password ))
        history.push("/")
        // console.log(formValues)
    }


  return (
    <div className="container">
        <div className="row justify-content-center">
                <form 
                    className="form-login"
                    onSubmit={ handleSubmit }
                >
                    <h4 className="d-grid gap-2 col-12 mx-auto mt-4 mb-4 "> Login </h4>
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
                        placeholder="Password"
                        name='password'
                        value={ password }
                        onChange= { handleInputChange }
                    />
                    </div>
                    <div className="d-grid gap-2 col-12 mx-auto">
                    <button className="btn btn-primary" type="submit">
                        Login
                    </button>
                    </div>

                
                <div className="d-grid gap-2 col-12 mx-auto mt-3">

                <Link
                    to='/auth/register'
                    className='link'
                >
                    Crear cuenta
                </Link>
                </div>
                </form>

        </div>
    </div>
  );
};
