import React from 'react';
import './styles/index.css';
import './styles/introduction.css';
import './styles/projects.css';
import './styles/footer.css';
import { useState } from 'react';
import Swal from 'sweetalert2';

const StartPage = () => {
	const [copied, setCopied] = useState(false);
	const email = 'valeria.kruk921@gmail.com';

		const copyEmail = () => {
		navigator.clipboard.writeText(email).then(() => {
			Swal.fire({
				icon: 'success',
				title: 'Email copied!',
				text: email,
				timer: 1000,
				showConfirmButton: false,
				showClass: {
					popup: 'swal2-show swal2-animate-fade-in',
				},
				hideClass: {
					popup: 'swal2-hide swal2-animate-fade-out',
				},
			});
		});
	}

	return (
		<>
			<div>
				<section class='introduction'>
					<div class='container'>
						<div class='introduction-block'>
							<div class='introduction-block__photo'>
								<div />
								<img
									src='/images/me-start.jpg'
									alt='photo - me'
								/>
							</div>
							<div class='introduction-block__description'>
								<div class='intro-heading'>
									<h1>Who am I</h1>
									<h2>Hello</h2>
								</div>
								<p>
									I'm Valeria — a junior developer with a
									strong focus on backend development using{' '}
									<span class='bold-text'>
										Python, Django, and Django REST
										Framework
									</span>
									. I love building full-stack applications
									that solve real problems, and I enjoy the
									process of turning complex ideas into
									working systems.
								</p>
								<p>
									I specialize in backend development with
									Django and Django REST Framework, but I also
									build full-stack applications using{' '}
									<span class='medium-text'>
										React.js, HTML, CSS, Bootstrap
									</span>{' '}
									and deploy them using{' '}
									<span class='medium-text'>Docker</span>.
								</p>
								<p>
									I'm currently{' '}
									<span class='bold-text'>
										looking for a junior developer role
									</span>{' '}
									where I can grow alongside a team, take on
									meaningful challenges, and contribute with
									curiosity and persistence.
								</p>
								<div class='introduction-block__contact'>
									<a
										href='https://www.linkedin.com/in/valeria-kruk'
										target='_blank'
										rel='noopener noreferrer'
									>
										🔗 Find me on LinkedIn
									</a>
									<a
										href='https://github.com/valeria921/'
										target='_blank'
										rel='noopener noreferrer'
									>
										🛠 GitHub
									</a>
									<p
										onClick={copyEmail}
										title='Click to copy'
									>
										📧 valeria.kruk921@gmail.com
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section class='projects'>
					<div class='container'>
						<div class='projects-title'>
							<h2>My projects</h2>
						</div>
						<div class='projects-wrapper'>
							<div class='projects-block__project'>
								<h3>SnapFact 📚</h3>
								<p>
									A full-stack web application for discovering
									random facts by category. Features a Django
									REST API with custom data seeding and a
									fully deployed, secure setup using HTTPS.
								</p>
								<h4>Tech stack:</h4>
								<ul>
									<li>Django & Django REST Framework</li>
									<li>React.js + Chakra UI</li>
									<li>PostgreSQL</li>
									<li>Docker, Nginx, Certbot</li>
									<li>Deployed on DigitalOcean</li>
								</ul>
								<a class='button' href='/snapfact'>
									Check project
								</a>
							</div>
							<div class='projects-block__project'>
								<h3>Stock Prediction App 📈</h3>
								<p>
									A full-stack web app for forecasting and
									visualizing stock prices using historical
									data and LSTM-based machine learning.
								</p>
								<h4>Tech stack:</h4>
								<ul>
									<li>Django & Django REST Framework</li>
									<li>React.js, HTML, CSS, Bootsrap</li>
									<li>
										Pandas, NumPy for data preprocessing
									</li>
									<li>Matplotlib for data visualization</li>
									<li>
										Jupyter Notebook for building the LSTM
										model
									</li>
									<li>Docker, Nginx, Certbot</li>
									<li>Deployed on DigitalOcean</li>
								</ul>
								<a class='button' href='/stocks'>
									Check project
								</a>
							</div>
							<div class='projects-block__project'>
								<h3>Telegram Bot 🤖</h3>
								<p>
									A Telegram bot that delivers random fun
									facts by category — directly to your chat.
									It connects to the SnapFact web app via a
									REST API and responds with interactive
									messages using inline keyboards.
								</p>
								<h4>Tech stack:</h4>
								<ul>
									<li>Python</li>
									<li>pyTelegramBotAP</li>
									<li>Docker</li>
									<li>Deployed on DigitalOcean</li>
								</ul>
								<ul></ul>
								<a
									class='button'
									href='https://t.me/snapfact_bot'
									target='_blank'
									rel='noopener noreferrer'
								>
									Check project
								</a>
							</div>
							<div class='projects-block__project'>
								<h3>Car Wash Manager 🚘</h3>
								<p>
									A Django-based web app to manage and
									automate car wash business operations —
									replacing spreadsheets with a custom system
									for tracking orders, employee salaries,
									expenses, and reports.
								</p>
								<h4>Tech stack:</h4>
								<ul>
									<li>Django & Django REST Framework</li>
									<li>React.js, HTML, CSS, Bootstrap</li>
									<li>
										JWT-based authentication with role-based
										permissions
									</li>
								</ul>
								<a
									class='button'
									href='https://github.com/valeria921/'
									target='_blank'
									rel='noopener noreferrer'
								>
									Check project
								</a>
							</div>
							<div class='projects-block__project'>
								<h3>Portfolio Website 💼</h3>
								<p>
									This website — the one you're on right now —
									was built with React and custom HTML/CSS to
									showcase my projects. The codebase includes
									the full frontend plus the deployed backend
									for both SnapFact and the Stock Prediction
									App. All components are containerized and
									deployed together using Docker.
								</p>
								<a
									class='button'
									href='https://github.com/valeria921/'
									target='_blank'
									rel='noopener noreferrer'
								>
									View code on GitHub
								</a>
							</div>
						</div>
					</div>
				</section>
				<footer class='footer-start'>
					<div class='container'>
						<div class='footer-title'>
							<h2>Let's Connect 📩</h2>
						</div>
						<div class='footer-contact'>
							<a
								href='https://www.linkedin.com/in/valeria-kruk'
								target='_blank'
								rel='noopener noreferrer'
							>
								🔗 Find me on LinkedIn
							</a>
							<a
								href='https://github.com/valeria921/'
								target='_blank'
								rel='noopener noreferrer'
							>
								🛠 GitHub
							</a>
							<p
								onClick={copyEmail}
								title='Click to copy'
							>
								📧 valeria.kruk921@gmail.com
							</p>
						</div>
					</div>
				</footer>
			</div>
		</>
	);
};

export default StartPage;
