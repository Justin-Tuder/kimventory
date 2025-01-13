import { useState } from 'react';

function Login() {
	const [count, setCount] = useState(0);

	return (
		<>
			<h1>Login</h1>
			<button className="btn btn-danger">Cancel</button>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/Login.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default Login;
