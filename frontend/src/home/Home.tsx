import { Button, Container } from 'react-bootstrap';

export default function Home() {
	return (
		<Container>
			<Button variant="primary" href="/login">
				Login
			</Button>
		</Container>
	);
}
