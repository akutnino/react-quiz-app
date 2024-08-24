const SECS_PER_QUESTION = 20;

export const initialState = {
	questions: [],
	questionIndex: 0,
	userAnswer: null,
	userPoints: 0,
	userHighscore: 0,
	secondsRemaining: null,
	status: 'loading',
};

export const reactQuizReducer = (currentState, action) => {
	switch (action.type) {
		case 'dataReceived':
			return {
				questions: action.payload,
				questionIndex: 0,
				userAnswer: null,
				userPoints: 0,
				userHighscore: currentState.userHighscore,
				secondsRemaining: null,
				status: 'ready',
			};

		case 'dataError':
			return {
				questions: [],
				questionIndex: 0,
				userAnswer: null,
				userPoints: 0,
				userHighscore: 0,
				secondsRemaining: null,
				status: 'error',
			};

		case 'startQuiz':
			return {
				questions: currentState.questions,
				questionIndex: 0,
				userAnswer: null,
				userPoints: 0,
				userHighscore: currentState.userHighscore,
				secondsRemaining: currentState.questions.length * SECS_PER_QUESTION,
				status: 'active',
			};

		case 'questionAnswered':
			const currentQuestion = currentState.questions.at(currentState.questionIndex);
			const updatedPoints =
				action.payload === currentQuestion.correctOption
					? currentState.userPoints + currentQuestion.points
					: currentState.userPoints;

			return {
				questions: currentState.questions,
				questionIndex: currentState.questionIndex,
				userAnswer: action.payload,
				userPoints: updatedPoints,
				userHighscore: currentState.userHighscore,
				secondsRemaining: currentState.secondsRemaining,
				status: 'active',
			};

		case 'nextQuestion':
			return {
				questions: currentState.questions,
				questionIndex: currentState.questionIndex + 1,
				userAnswer: null,
				userPoints: currentState.userPoints,
				userHighscore: currentState.userHighscore,
				secondsRemaining: currentState.secondsRemaining,
				status: 'active',
			};

		case 'endQuiz':
			const newUserHighscore =
				currentState.userPoints > currentState.userHighscore
					? currentState.userPoints
					: currentState.userHighscore;

			return {
				questions: currentState.questions,
				questionIndex: 0,
				userAnswer: null,
				userPoints: currentState.userPoints,
				userHighscore: newUserHighscore,
				secondsRemaining: null,
				status: 'finish',
			};

		case 'restartQuiz':
			return {
				questions: currentState.questions,
				questionIndex: 0,
				userAnswer: null,
				userPoints: 0,
				userHighscore: currentState.userHighscore,
				secondsRemaining: null,
				status: 'ready',
			};

		case 'updateRemainingTime':
			return {
				questions: currentState.questions,
				questionIndex: currentState.questionIndex,
				userAnswer: currentState.userAnswer,
				userPoints: currentState.userPoints,
				userHighscore: currentState.userHighscore,
				secondsRemaining: currentState.secondsRemaining - 1,
				status: currentState.status,
			};

		default:
			return currentState;
	}
};
