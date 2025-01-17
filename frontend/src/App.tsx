import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Login from './login/Login';
import Signup from './signup/Signup';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
