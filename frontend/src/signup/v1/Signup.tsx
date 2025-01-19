import React, { useRef, useState, useEffect, FormEventHandler } from 'react';
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import api from '../../api/v1/api';

const _PASSWORD_REGEX =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const _REGISTER_URL = '/users/register';

const Signup = () => {
	const nameRef = useRef<HTMLInputElement>(null);
	const errorRef = useRef<HTMLParagraphElement>(null);

	const [showPassword, setShowPassword] = useState(false);
	const toggleShowPassword = () => {
		setShowPassword(showPassword ? false : true);
	};
	const [name, setName] = useState('');
	const [nameFocus, setNameFocus] = useState(false);

	const [email, setEmail] = useState('');
	const [emailFocus, setEmailFocus] = useState(false);

	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [matchPassword, setMatchPassword] = useState('');
	const [validMatchPassword, setValidMatchPassword] = useState(false);
	const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

	const [errorMessage, setErrorMessage] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (nameRef.current) {
			nameRef.current.focus();
		}
	}, []);

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
					name: name,
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
										<Form.Group className="mt-3">
											<Form.Label htmlFor="name">
												Name:
											</Form.Label>
											<Form.Control
												id="name"
												type="text"
												ref={nameRef}
												autoComplete="off"
												aria-describedby="nidnote"
												onChange={(e) =>
													setName(e.target.value)
												}
												onFocus={() =>
													setNameFocus(true)
												}
												onBlur={() =>
													setNameFocus(false)
												}
												required
											/>
											<Form.Text
												id="nidnote"
												className={
													nameFocus
														? 'text-muted ps-2'
														: 'visually-hidden'
												}
											>
												<FontAwesomeIcon
													icon={faInfoCircle}
												/>
												5 to 150 characters. <br />
												Must begin with a letter. <br />
												Letters, numbers, underscores,
												hyphens allowed.
											</Form.Text>
										</Form.Group>
										<Form.Group className="mt-3">
											<Form.Label htmlFor="email">
												Email:
											</Form.Label>
											<Form.Control
												id="email"
												type="text"
												autoComplete="off"
												aria-describedby="email-note"
												onChange={(e) =>
													setEmail(e.target.value)
												}
												onFocus={() =>
													setEmailFocus(true)
												}
												onBlur={() =>
													setEmailFocus(false)
												}
												required
											/>
											<Form.Text
												id="email-note"
												className={
													emailFocus
														? 'text-muted ps-2'
														: 'visually-hidden'
												}
											>
												<FontAwesomeIcon
													icon={faInfoCircle}
												/>
												5 to 150 characters. <br />
												Must begin with a letter. <br />
												Letters, numbers, underscores,
												hypens allowed.
											</Form.Text>
										</Form.Group>
										<Form.Group className="mt-3">
											<Form.Label htmlFor="password">
												Password:
												<span
													className={
														validPassword
															? 'valid'
															: 'visually-hidden'
													}
												>
													<FontAwesomeIcon
														icon={faCheck}
													/>
												</span>
												<span
													className={
														validPassword ||
														!password
															? 'visually-hidden'
															: 'invalid'
													}
												>
													<FontAwesomeIcon
														icon={faTimes}
													/>
												</span>
											</Form.Label>
											<Form.Control
												id="password"
												type={
													showPassword
														? 'text'
														: 'password'
												}
												aria-invalid={
													validPassword
														? 'false'
														: 'true'
												}
												aria-describedby="password-note"
												onChange={(e) =>
													setPassword(e.target.value)
												}
												onFocus={() =>
													setPasswordFocus(true)
												}
												onBlur={() =>
													setPasswordFocus(false)
												}
												required
											/>
											<Form.Text
												id="password-note"
												className={
													passwordFocus &&
													!validPassword
														? 'text-muted ps-2'
														: 'visually-hidden'
												}
											>
												<FontAwesomeIcon
													icon={faInfoCircle}
												/>
												8 to 24 characters. Must include
												uppercase and lowercase letters,
												a number, and a special
												character <br />
												Allowed special characters:{' '}
												<span aria-label="exclamation mark">
													!
												</span>{' '}
												<span aria-label="at symbol">
													@
												</span>{' '}
												<span aria-label="hashtag">
													#
												</span>{' '}
												<span aria-label="dollar sign">
													$
												</span>{' '}
												<span aria-label="percent">
													%
												</span>
											</Form.Text>
										</Form.Group>
										<Form.Group className="mt-3">
											<Form.Label htmlFor="confirm-password">
												Confirm Password:{' '}
												<span
													className={
														validMatchPassword &&
														matchPassword
															? 'valid'
															: 'visually-hidden'
													}
												>
													<FontAwesomeIcon
														icon={faCheck}
													/>
												</span>
												<span
													className={
														validMatchPassword ||
														!matchPassword
															? 'visually-hidden'
															: 'invalid'
													}
												>
													<FontAwesomeIcon
														icon={faTimes}
													/>
												</span>
											</Form.Label>
											<Form.Control
												id="confirm-password"
												type={
													showPassword
														? 'text'
														: 'password'
												}
												aria-invalid={
													validMatchPassword
														? 'false'
														: 'true'
												}
												aria-describedby="confirm-password-note"
												onChange={(e) =>
													setMatchPassword(
														e.target.value
													)
												}
												onFocus={() =>
													setMatchPasswordFocus(true)
												}
												onBlur={() =>
													setMatchPasswordFocus(false)
												}
												required
											/>
											<Form.Text
												id="confirm-password-note"
												className={
													matchPasswordFocus &&
													!validMatchPassword
														? 'text-muted ps-2'
														: 'visually-hidden'
												}
											>
												<FontAwesomeIcon
													icon={faInfoCircle}
												/>{' '}
												Must match the first password
												input field.
											</Form.Text>
										</Form.Group>
										<Form.Group className="d-flex mt-3 justify-content-end">
											<Button
												id="signup-submit-btn"
												type="submit"
												className="btn btn-success"
												disabled={
													!validPassword ||
													!validMatchPassword
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
