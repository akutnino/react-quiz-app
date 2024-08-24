import { createContext, useContext, useReducer, useEffect } from 'react';
import { initialState, reactQuizReducer } from '../functions/ReactQuizReducer';

const GlobalContext = createContext();

function GlobalProvider(props) {
	const { children } = props;
	const [state, dispatch] = useReducer(reactQuizReducer, initialState);
	const {
		questions,
		questionIndex,
		userAnswer,
		userPoints,
		userHighscore,
		secondsRemaining,
		status,
	} = state;
	const totalMaxPoints = questions.reduce((acc, curr) => curr.points + acc, 0);
	const totalQuestions = questions.length;
	const isAnswered = userAnswer !== null;

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const fetchURL = 'questions.json';
				const fetchOptions = {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				};

				const response = await fetch(fetchURL, fetchOptions);
				if (!response.ok) throw new Error('FETCH REQUEST FAILED');

				const data = await response.json();
				dispatch({
					type: 'dataReceived',
					payload: data.questions,
				});
			} catch (error) {
				dispatch({ type: 'dataError' });
				console.error(error);
			}
		};

		fetchQuestions();
		return () => {};
	}, [dispatch]);

	return (
		<GlobalContext.Provider
			value={{
				questions,
				questionIndex,
				userAnswer,
				userPoints,
				userHighscore,
				secondsRemaining,
				status,
				dispatch,
				totalMaxPoints,
				totalQuestions,
				isAnswered,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}

function useGlobal(props) {
	const context = useContext(GlobalContext);
	const ERROR_MESSAGE = 'useGlobal() was used outside the GlobalProvider() scope!';

	if (context === undefined) throw new Error(ERROR_MESSAGE);
	return context;
}

export { GlobalProvider, useGlobal };
