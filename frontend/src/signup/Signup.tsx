import { Button, Form, Card, Row, Container, Col } from 'react-bootstrap';
import { useState } from 'react';

export default function Signup() {
	const [showPassword, setShowPassword] = useState(false);
	const toggleShowPassword = () => {
		setShowPassword(showPassword ? false : true);
	};
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// const handleSubmit = (e: any) => {
	// 	e.preventDefault();

	// 	const data = { name, email, password };

	// 	fetch('http://localhost:8000/api/v1/users/register', {
	// 		method: 'POST',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		body: JSON.stringify(data),
	// 	}).then((response) => {
	// 		console.log(data);
	// 		setName('');
	// 		setEmail('');
	// 		setPassword('');
	// 	});
	// };

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const formData = { name, email, password };

		const response = await fetch(
			'http://localhost:8000/api/v1/users/register',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			}
		);

		console.log(formData);
	};

	return (
		<Container>
			<Row>
				<Card bg="light" className="m-5 p-3 shadow">
					<Card.Body className="d-flex justify-content-center">
						<h3>Kimventory!</h3>
					</Card.Body>
				</Card>
			</Row>
			<Row>
				<Card bg="light" className="m-5 mt-3 p-5 shadow-lg">
					<Card.Body>
						<Form onSubmit={handleSubmit}>
							<Form.Group className="mb-3" controlId="signupName">
								<Form.Label>
									<h5 className="border-bottom border-dark-subtle">
										Name
									</h5>
								</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
								<Form.Text className="text-muted ps-2">
									e.g. John Doe, Jane Doe, etc.
								</Form.Text>
							</Form.Group>
							<Form.Group
								className="mb-3"
								controlId="signupEmail"
							>
								<Form.Label>
									<h5 className="border-bottom border-dark-subtle">
										Email Address
									</h5>
								</Form.Label>
								<Form.Control
									type="email"
									placeholder="Enter email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<Form.Text className="text-muted ps-2">
									We'll never share your email with anyone
									else.
								</Form.Text>
							</Form.Group>
							<Form.Group
								className="mb-3"
								controlId="signupPassword"
							>
								<Form.Label>
									<h5 className="border-bottom border-dark-subtle">
										Password
									</h5>
								</Form.Label>
								<Form.Control
									type={showPassword ? 'text' : 'password'}
									placeholder="Password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</Form.Group>
							<Form.Group
								className="mb-3"
								controlId="formBasicCheckbox"
							>
								<Form.Check
									type="checkbox"
									label="Show Password"
									onClick={toggleShowPassword}
								/>
							</Form.Group>
							<Col className="d-flex justify-content-end">
								<Button
									variant="danger"
									className="me-3"
									href="/"
								>
									Cancel
								</Button>
								<Button variant="success" type="submit">
									Submit
								</Button>
							</Col>
						</Form>
					</Card.Body>
					<Card.Footer className="d-flex justify-content-end">
						<p className="me-3">Already have an account?</p>
						<a href="/login/">Login</a>
					</Card.Footer>
				</Card>
			</Row>
		</Container>
	);
}
