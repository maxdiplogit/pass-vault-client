// React Hooks
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Custom Hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// Store Actions
import { authActions } from '../../store';

// Styles
import classes from './NewEntryForm.module.css';


const NewEntryForm = () => {
    const dispatch = useDispatch();

    const serviceRef = useRef();
    const passwordRef = useRef();

    const axiosPrivate = useAxiosPrivate();

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const loggedInUser = useSelector((state) => state.auth.loggedInUser);
    console.log(loggedInUser);

    const serviceFormSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            const userId = loggedInUser._id;
            const service = serviceRef.current.value;
            const password = passwordRef.current.value;
            const res = await axiosPrivate.post(`http://localhost:8081/service/${ userId }`, {
                service,
                password
            });
            console.log(res.data.foundUser);
            serviceRef.current.value = '';
            passwordRef.current.value = '';
            dispatch(authActions.changeLoggedInUser(res.data.foundUser));
        } catch (err){
            console.log('Oh no! Could not create a service!');
            console.log(err);
        }
    };

    return (
        <div>
            <form onSubmit={ serviceFormSubmitHandler } className={ classes.newServiceForm }>
                <div className={ classes.inputs }>
                    <input className={ classes.newServiceInput } ref={ serviceRef } type='text' id='service' name='service' placeholder='Service Name' />
                </div>
                <div className={ classes.inputs }>
                    <input className={ classes.newServiceInput } ref={ passwordRef } type='password' id='password' name='password' placeholder='Service Password' />
                </div>
                <div className={ classes.inputs }>
                    <button className={ classes.createButton }>Create</button>
                </div>
            </form>
        </div>
    );
};


export default NewEntryForm;