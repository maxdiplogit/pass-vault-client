// React Hooks
import { useSelector } from 'react-redux';

// Components
import Password from '../Password/Password';

// Styles
import classes from './PasswordsList.module.css';


const PasswordsList = (props) => {
    const loggedInUser = useSelector((state) => state.auth.loggedInUser);
    const passwordsList = loggedInUser.passwordsList;

    return (
        <>
            <ul>
                { passwordsList.map((service) => (
                    <Password service={ service } key={ service._id } />
                )) }
            </ul>
        </>
    );
};


export default PasswordsList;