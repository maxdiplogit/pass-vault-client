import axios from 'axios';

// React Hooks
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Components
import NewEntryForm from '../NewEntryForm/NewEntryForm';
import PasswordsList from '../Passwords/PasswordsList/PasswordsList';

// Custom Hooks
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

// Store actions
import { authActions } from '../../store';

// Styles
import classes from './Home.module.css';


const Home = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const axiosPrivate = useAxiosPrivate();

    const homePageClickHandler = (event) => {
        navigate('/');
    };

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const loggedInUser = useSelector((state) => state.auth.loggedInUser);

    if (!loggedInUser) {
        dispatch(authActions.changeIsLoggedIn(false));
    }

    console.log(isLoggedIn);
    console.log(loggedInUser);

    let logoutSubmitHandler = () => {};

    if (isLoggedIn) {
        logoutSubmitHandler = async (event) => {
            event.preventDefault();
    
            try {
                const res = await axios.post('http://localhost:8081/users/logout', { accessToken: loggedInUser.accessToken }, { withCredentials: true });
                console.log(res.data.message);
                dispatch(authActions.changeIsLoggedIn(false));
                dispatch(authActions.changeLoggedInUser({}));
            } catch (err) {
                console.log('Oh no! Could not logout!');
                console.log(err);
            }
        };   
    }

    let navContent = <></>;
    let content = <></>;

    if (!isLoggedIn) {
        navContent = <>
            <Link to={ '/login' } className={ classes.link }>Login</Link>
            <Link to={ '/register' } className={ classes.link }>Register</Link>
        </>;

        content = <h2>Register/Login first!</h2>;
    } else {
        navContent = <>
            <Link to={ '#0' } className={ classes.link } onClick={ logoutSubmitHandler }>Logout</Link>
        </>;

        if (loggedInUser.passwordsList.length === 0) {
            content = <>
                <NewEntryForm />
                <div className={ classes.passwordsList }>
                    <h2>No passwords for <span className={ classes.highlightUsername }>{ loggedInUser.username }</span>. Create a new entry/entries.</h2>
                </div>
            </>;
        } else {
            content = <>
                <NewEntryForm />
                <div className={ classes.passwordsList }>
                    <PasswordsList />
                </div>
            </>;
        }
    }

    return (
        <div className={ classes.home }>
            <header>
                <h1 onClick={ homePageClickHandler }>
                    PassVault
                </h1>
                <nav>
                    { navContent }
                </nav>
            </header>
            <main>
                { content }
            </main>
            <footer>
                <a href='https://www.google.com' target="_blank">
                    <i className='fa fa-github fa-2x'></i> 
                </a>
                <p>
                    &#169;Copyrights 2022
                </p>
            </footer>
        </div>
    );
};


export default Home;