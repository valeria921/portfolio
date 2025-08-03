import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { AuthContext } from '../../AuthProvider';

const Header = () => {
	const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		setIsLoggedIn(false);
		navigate('/stocks/login');
	};

	return (
		<>
			<nav className='navbar container pt-3 pb-3 align-items-start '>
				<div className='d-flex align-items-center pb-3'>
					<Link
						className='navbar-brand d-flex align-items-center text-light'
						to='/'
					>
						<img
							src='/images/home-stocks.svg'
							alt='home'
							style={{ width: '20px', height: '20px' }}
						/>
						<span className='ms-1'>Home</span>
					</Link>
					&nbsp;
					<Link
						className='navbar-brand text-light me-3'
						to='/stocks/'
					>
						📈 Stock prediction portal
					</Link>
				</div>

				<div className='d-flex align-items-center pb-3'>
					{isLoggedIn ? (
						<>
							<Button
								text='Dashboard'
								class='btn-outline-info'
								url='/stocks/dashboard'
							/>
							&nbsp;
							<button
								className='btn btn-outline-danger'
								onClick={handleLogout}
							>
								Logout
							</button>
						</>
					) : (
						<>
							<Button
								text='Login'
								class='btn-outline-info'
								url='/stocks/login'
							/>
							&nbsp;
							<Button
								text='Register'
								class='btn-info'
								url='/stocks/register'
							/>
						</>
					)}
				</div>
			</nav>
		</>
	);
};

export default Header;

