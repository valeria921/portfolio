import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home from './pages/stocks/Home';
import Register from './pages/stocks/Register';
import Login from './pages/stocks/Login';
import Dashboard from './pages/stocks/dashboard/Dashboard';
import AuthProvider from './AuthProvider';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/start/StartPage';
import NoLayout from './components/NoLayout';
import StocksLayout from './components/StocksLayout';
import SnapFactPage from './pages/snapfact/SnapFactPage';
import { Provider } from './components/ui/Provider';

import './App.css';

const PROJECT_URLS = {
	STOCK: '/stock',
	SNAP_FACT: '/snapfact',
	START: '/'
};

function BodyClassController() {
	const location = useLocation();

	useEffect(() => {
		// Clear previous body classes
		document.body.className = '';

		// Set based on pathname
		if (location.pathname.startsWith(PROJECT_URLS.STOCK)) {
			document.body.classList.add('stock-body');
		} else if (location.pathname.startsWith(PROJECT_URLS.SNAP_FACT)) {
			document.body.classList.add('snapfact-body');
		} else if (location.pathname.startsWith(PROJECT_URLS.START)) {
			document.body.classList.add('start-body');
		}
	}, [location]);

	return null;
}

function App() {
	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					{/* Listen to route changes and update body class */}
					<BodyClassController />
					<Routes>
						<Route
							path='/'
							element={
								<NoLayout>
									<StartPage />
								</NoLayout>
							}
						/>
						<Route
							path='/snapfact'
							element={
								<Provider>
									<SnapFactPage />
								</Provider>
							}
						/>
						<Route
							path='/stocks/'
							element={
								<StocksLayout>
									<Home />
								</StocksLayout>
							}
						/>
						<Route
							path='/stocks/register'
							element={
								<StocksLayout>
									<PublicRoute>
										<Register />
									</PublicRoute>
								</StocksLayout>
							}
						/>
						<Route
							path='/stocks/login'
							element={
								<StocksLayout>
									<PublicRoute>
										<Login />
									</PublicRoute>
								</StocksLayout>
							}
						/>
						<Route
							path='/stocks/dashboard'
							element={
								<StocksLayout>
									<PrivateRoute>
										<Dashboard />
									</PrivateRoute>
								</StocksLayout>
							}
						/>
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</>
	);
}

export default App;
