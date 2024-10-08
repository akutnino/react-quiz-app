import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { GlobalProvider } from './contexts/GlobalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<GlobalProvider>
			<App basename='/react-quiz-app/' />
		</GlobalProvider>
	</React.StrictMode>
);
