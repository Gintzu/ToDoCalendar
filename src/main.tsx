import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ToDoProvider } from './controllers/ToDoProvider.tsx';
import { UserProvider } from './controllers/userProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<UserProvider>
			<ToDoProvider>
				<App />
			</ToDoProvider>
		</UserProvider>
	</React.StrictMode>
);
