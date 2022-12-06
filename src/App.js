// React Hooks
import { Routes, Route } from 'react-router-dom';

// Components
import Home from './components/Home/Home';
import Register from './components/Auth/Register/Register';
import Login from './components/Auth/Login/Login';

import './App.css';


const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={ <Home /> } />
				<Route path='/register' element={ <Register /> } />
				<Route path='/login' element={ <Login /> } />
			</Routes>
		</>
	);
};


export default App;