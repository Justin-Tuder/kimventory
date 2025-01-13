import { useState } from 'react';
import { Button, Form, Card, Row, Container, Col } from 'react-bootstrap';

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const toggleShowPassword = () => {
		setShowPassword(showPassword ? false : true);
	};

	return (
		<Container>
			<Row>
				<Card bg='light' className='m-5 p-3 shadow'>
					<Card.Body className='d-flex justify-content-center'>
						<h3>Welcome!</h3>
					</Card.Body>
				</Card>
			</Row>
			<Row>
				<Card bg='light' className='m-5 mt-3 p-5 shadow-lg'>
					<Card.Body>
						<Form>
							<Form.Group
								className='mb-3'
								controlId='formBasicEmail'
							>
								<Form.Label>
									<h5 className='border-bottom border-dark-subtle'>
										Email Address
									</h5>
								</Form.Label>
								<Form.Control
									type='email'
									placeholder='Enter email'
								/>
								<Form.Text className='text-muted ps-2'>
									We'll never share your email with anyone
									else.
								</Form.Text>
							</Form.Group>
							<Form.Group
								className='mb-3'
								controlId='formBasicPassword'
							>
								<Form.Label>
									<h5 className='border-bottom border-dark-subtle'>
										Password
									</h5>
								</Form.Label>
								<Form.Control
									type={showPassword ? 'text' : 'password'}
									placeholder='Password'
								/>
							</Form.Group>
							<Form.Group
								className='mb-3'
								controlId='formBasicCheckbox'
							>
								<Form.Check
									type='checkbox'
									label='Show Password'
									onClick={toggleShowPassword}
								/>
							</Form.Group>
							<Col className='d-flex justify-content-end'>
								<Button
									variant='danger'
									className='me-3'
									href='/'
								>
									Cancel
								</Button>
								<Button variant='success' type='submit'>
									Submit
								</Button>
							</Col>
						</Form>
					</Card.Body>
					<Card.Footer className='d-flex justify-content-end'>
						<a href='/'>Sign Up</a>
					</Card.Footer>
				</Card>
			</Row>
		</Container>
	);
}
