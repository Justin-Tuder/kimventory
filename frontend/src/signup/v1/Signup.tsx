import { useRef, useState, useEffect, ReactNode } from 'react';
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import InputField from '../../components/v1/InputField';
import api from '../../api/v1/api';
import { _REGISTER_URL } from '../../global/Global';

const _PASSWORD_REGEX =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');

	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);

	const [matchPassword, setMatchPassword] = useState('');
	const [validMatchPassword, setValidMatchPassword] = useState(false);

	const [errorMessage, setErrorMessage] = useState('');
	const [success, setSuccess] = useState(false);

	const errorRef = useRef<HTMLParagraphElement>(null);

	const fullNameHelperText: ReactNode = (
		<>
			<FontAwesomeIcon icon={faInfoCircle} /> 5 to 150 characters.
			<br />
			<FontAwesomeIcon icon={faInfoCircle} className="ps-2" /> Must begin
			with a letter.
		</>
	);

	const emailHelperText: ReactNode = (
		<>
			<FontAwesomeIcon icon={faInfoCircle} /> 5 to 150 characters. <br />
			<FontAwesomeIcon icon={faInfoCircle} className="ps-2" /> Must begin
			with a letter. <br />
			<FontAwesomeIcon icon={faInfoCircle} className="ps-2" /> Letters,
			numbers, underscores, hypens allowed.
		</>
	);

	const passwordHelperText: ReactNode = (
		<>
			<FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters. <br />
			<FontAwesomeIcon icon={faInfoCircle} className="ps-2" /> Must
			include uppercase and lowercase letters, a number, and a special
			character <br />
			<FontAwesomeIcon icon={faInfoCircle} className="ps-2" /> Allowed
			special characters: <span aria-label="exclamation mark">!</span>{' '}
			<span aria-label="at symbol">@</span>{' '}
			<span aria-label="hashtag">#</span>{' '}
			<span aria-label="dollar sign">$</span>{' '}
			<span aria-label="percent">%</span>
		</>
	);

	const matchPasswordHelperText: ReactNode = (
		<>
			<FontAwesomeIcon icon={faInfoCircle} /> Must match the first
			password input field.
		</>
	);

	useEffect(() => {
		const result = _PASSWORD_REGEX.test(password);
		setValidPassword(result);

		const match = password === matchPassword;
		setValidMatchPassword(match);
	}, [password, matchPassword]);

	useEffect(() => {
		setErrorMessage('');
	}, [password, matchPassword]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const passwordCheck = _PASSWORD_REGEX.test(password);

		if (!passwordCheck) {
			setErrorMessage('Invalid Entry');
			return;
		}

		try {
			const response = await api.post(
				_REGISTER_URL,
				JSON.stringify({
					name: fullName,
					email: email,
					password: password,
				}),
				{
					headers: { 'Content-Type': 'application/json' },
				}
			);

			console.log(response.data);
			setSuccess(true);
		} catch (error: any) {
			if (!error?.response) {
				setErrorMessage('No server response.');
			} else if (error?.response.status === 409) {
				setErrorMessage('Email Taken');
			} else {
				setErrorMessage('Registration Failed');
			}

			errorRef.current?.focus();
		}
	};

	return (
		<section>
			<Container className="d-flex justify-content-center w-100">
				<Card className="w-50 m-5 shadow bg-light-subtle">
					<Card.Body>
						{success ? (
							<Row>
								<h1>Success!</h1>
								<p>
									<a href="/login/">Login</a>
								</p>
							</Row>
						) : (
							<>
								<Row>
									<p
										ref={errorRef}
										className={
											errorMessage
												? 'error-message'
												: 'offscreen'
										}
										aria-live="assertive"
									>
										{errorMessage}
									</p>
									<h1>Signup</h1>
								</Row>
								<Row>
									<Form onSubmit={handleSubmit}>
										<InputField
											id="full-name"
											type="text"
											autoComplete="off"
											label="Full Name: "
											focus
											placeholder="John Doe, Jane Doe, etc."
											onChange={(e) =>
												setFullName(e.target.value)
											}
											value={fullName}
											helperText={fullNameHelperText}
											required
										/>
										<InputField
											id="email"
											type="text"
											autoComplete="off"
											label="Email: "
											placeholder="user@example.com"
											onChange={(e) =>
												setEmail(e.target.value)
											}
											value={email}
											helperText={emailHelperText}
											required
										/>
										<InputField
											id="password"
											type="password"
											autoComplete="off"
											invalid={
												validPassword ? false : true
											}
											label={
												<>
													Password:
													<span
														className={
															validPassword
																? 'valid'
																: 'visually-hidden'
														}
													>
														{' '}
														<FontAwesomeIcon
															icon={faCheck}
														/>{' '}
													</span>
													<span
														className={
															validPassword ||
															!password
																? 'visually-hidden'
																: 'invalid'
														}
													>
														{' '}
														<FontAwesomeIcon
															icon={faTimes}
														/>{' '}
													</span>
												</>
											}
											onChange={(e) =>
												setPassword(e.target.value)
											}
											value={password}
											helperText={passwordHelperText}
											required
										/>
										<InputField
											id="confirm-password"
											type="password"
											autoComplete="off"
											invalid={
												validMatchPassword
													? false
													: true
											}
											label={
												<>
													Confirm Password:{' '}
													<span
														className={
															validMatchPassword &&
															matchPassword
																? 'valid'
																: 'visually-hidden'
														}
													>
														{' '}
														<FontAwesomeIcon
															icon={faCheck}
														/>{' '}
													</span>
													<span
														className={
															validMatchPassword ||
															!matchPassword
																? 'visually-hidden'
																: 'invalid'
														}
													>
														{' '}
														<FontAwesomeIcon
															icon={faTimes}
														/>{' '}
													</span>
												</>
											}
											onChange={(e) =>
												setMatchPassword(e.target.value)
											}
											value={matchPassword}
											helperText={matchPasswordHelperText}
											required
										/>
										<Form.Group className="d-flex mt-3 justify-content-end">
											<Button
												id="signup-submit-button"
												type="submit"
												className="btn btn-success"
												disabled={
													!validPassword ||
													!validMatchPassword ||
													!fullName ||
													!email
														? true
														: false
												}
											>
												Submit
											</Button>
										</Form.Group>
									</Form>
								</Row>
							</>
						)}
					</Card.Body>
					{success ? (
						''
					) : (
						<Card.Footer className="d-flex justify-content-end">
							<p className="me-2">Already have an account?</p>
							<a className="underline" href="/login/">
								Login
							</a>
						</Card.Footer>
					)}
				</Card>
			</Container>
		</section>
	);
};

export default Signup;
