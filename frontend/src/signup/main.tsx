import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Signup />
	</StrictMode>
);
