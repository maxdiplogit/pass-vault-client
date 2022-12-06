import axios from 'axios';

// React Hooks
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Styles
import classes from './Register.module.css';


const Register = (props) => {
    const navigate = useNavigate();

    const usernameRef = useRef();
    const passwordRef = useRef();

    const onBackButtonClick = (event) => {
        navigate(-1);
    };

    const registerFormSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            const username = usernameRef.current.value;
            const password = passwordRef.current.value;
            const res = await axios.post('http://localhost:8081/users/register', {
                username,
                password
            }, { withCredentials: true });
            console.log(res);
            navigate('/');
        } catch (err) {
            console.log('Oh no! Could not register!');
            console.log(err);
        }
    };
    
    return (
        <div className={ classes.register }>
            <i onClick={ onBackButtonClick } className="material-icons" style={{ fontSize: '2.3rem', alignSelf: 'flex-start' }}>arrow_back</i>
            <h3>Register</h3>
            <form className={ classes.registerForm } onSubmit={ registerFormSubmitHandler }>
                <div className={ classes.inputs }>
                    <label htmlFor='username'>Username</label>
                    <input ref={ usernameRef } type='text' name='username' id='username' className={ classes.registerInput } />
                </div>
                <div className={ classes.inputs }>
                    <label htmlFor='password'>Password</label>
                    <input ref={ passwordRef } type='password' name='password' id='password' className={ classes.registerInput } />
                </div>
                <button className={ classes.registerButton }>Register</button>
            </form>
        </div>
    );
};


export default Register;