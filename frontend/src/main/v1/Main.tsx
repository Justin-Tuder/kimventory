import { Container, Button } from 'react-bootstrap';

const Main = () => {
	return (
		<Container>
			<Button variant="primary" href="/login">
				Login
			</Button>
			<Button variant="secondary" href="/signup">
				Sign Up
			</Button>
		</Container>
	);
};

export default Main;
