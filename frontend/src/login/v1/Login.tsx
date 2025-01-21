import { Container, Card, Row, FormGroup, Button, Form } from 'react-bootstrap';
import InputField from '../../components/v1/InputField';
import { useRef, useState, useEffect } from 'react';
import { _LOGIN_URL } from '../../global/Global';
import api from '../../api/v1/api';

const Login = () => {
	const errorRef = useRef<HTMLParagraphElement>(null);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		setErrorMessage('');
	}, [email, password]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			const response = await api.post(
				_LOGIN_URL,
				JSON.stringify({
					email: email,
					password: password,
				}),
				{
					headers: { 'Content-Type': 'application/json' },
				}
			);

			const accessToken = response?.data?.token;

			setEmail('');
			setPassword('');
		} catch (error: any) {
			if (!error?.response) {
				setErrorMessage('No Server Response');
			} else if (error.response?.status === 400) {
				setErrorMessage('Incorrect Email or Password');
			} else if (error.response?.status === 401) {
				setErrorMessage('Unauthorized');
			} else {
				setErrorMessage('Login Failed');
			}

			errorRef.current?.focus();
		}
	};

	return (
		<section>
			<Container className="d-flex justify-content-center w-100">
				<p
					ref={errorRef}
					className={errorMessage ? '' : 'visually-hidden'}
					aria-live="assertive"
				>
					{errorMessage}
				</p>
				<Card className="w-50 m-5 shadow bg-light-subtle">
					<Card.Body>
						<Row>
							<h1>Login</h1>
						</Row>
						<Row>
							<Form onSubmit={handleSubmit}>
								<InputField
									id="email"
									label="Email: "
									placeholder="user@example.com"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
								/>
								<InputField
									id="password"
									label="Password: "
									type="password"
									placeholder="Password"
									onChange={(e) =>
										setPassword(e.target.value)
									}
									value={password}
								/>
								<FormGroup className="d-flex mt-3 justify-content-end">
									<Button
										id="login-submit-button"
										variant="success"
										type="submit"
									>
										Submit
									</Button>
								</FormGroup>
							</Form>
						</Row>
					</Card.Body>
					<Card.Footer className="d-flex justify-content-end">
						<p className="me-2">Need an account?</p>
						<a className="underline" href="/signup/">
							Sign Up
						</a>
					</Card.Footer>
				</Card>
			</Container>
		</section>
	);
};

export default Login;
