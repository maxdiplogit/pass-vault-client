import axios from 'axios';

// React Hooks
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Store Actions
import { authActions } from '../../../store/index';

// Styles
import classes from './Login.module.css';


const Login = (props) => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const usernameRef = useRef();
    const passwordRef = useRef();

    const onBackButtonClick = (event) => {
        navigate(-1);
    };

    const loginFormSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            const username = usernameRef.current.value;
            const password = passwordRef.current.value;
            const res = await axios.post('http://localhost:8081/users/login', {
                username,
                password
            }, { withCredentials: true });
            console.log(res.data);
            dispatch(authActions.changeIsLoggedIn(true));
            dispatch(authActions.changeLoggedInUser(res.data));
            navigate('/');
        } catch (err) {
            console.log('Oh no! Could not login!');
            console.log(err);
        }
    };
    
    return (
        <div className={ classes.login }>
            <i onClick={ onBackButtonClick } className="material-icons" style={{ fontSize: '2.3rem', alignSelf: 'flex-start' }}>arrow_back</i>
            <h3>Login</h3>
            <form className={ classes.loginForm } onSubmit={ loginFormSubmitHandler }>
                <div className={ classes.inputs }>
                    <label htmlFor='username'>Username</label>
                    <input ref={ usernameRef } type='text' name='username' id='username' className={ classes.loginInput } />
                </div>
                <div className={ classes.inputs }>
                    <label htmlFor='password'>Password</label>
                    <input ref={ passwordRef } type='password' name='password' id='password' className={ classes.loginInput } />
                </div>
                <button className={ classes.loginButton }>Login</button>
            </form>
        </div>
    );
};


export default Login;