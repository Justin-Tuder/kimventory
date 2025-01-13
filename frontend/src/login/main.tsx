import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Login />
	</StrictMode>
);
