import axios from "axios";

// React Hooks
import { useDispatch } from "react-redux";

// Store Actions
import { authActions } from '../store/index';


const useRefreshToken = () => {
    const dispatch = useDispatch();

    const refresh = async () => {
        const res = await axios.get('http://localhost:8081/users/refreshToken', { withCredentials: true });
        console.log(res);
        
        dispatch(authActions.changeLoggedInUserAccessToken(res.data.newAccessToken));
        
        return res.data.newAccessToken;
    }

    return refresh;
};


export default useRefreshToken;