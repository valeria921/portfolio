import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
	const { isLoggedIn } = useContext(AuthContext);
	return !isLoggedIn ? children : <Navigate to='/stocks/dashboard' />;
};

export default PublicRoute;
