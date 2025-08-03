import Footer from '../pages/stocks/Footer';
import Header from '../pages/stocks/Header';

const StocksLayout = ({ children }) => {
	return (
		<div className='d-flex flex-column min-vh-100'>
			<Header />
			<main className='flex-fill'>{children}</main>
			<Footer />
		</div>
	);
};

export default StocksLayout;
