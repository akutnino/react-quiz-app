import { useGlobal } from '../contexts/GlobalContext';

export default function NextButton(props) {
	const { totalQuestions, questionIndex, dispatch } = useGlobal();
	const isLastQuestion = questionIndex === totalQuestions - 1;

	const handleNextQuestion = () => {
		if (isLastQuestion) {
			dispatch({ type: 'endQuiz' });
		} else {
			dispatch({ type: 'nextQuestion' });
		}
	};

	return (
		<button
			type='button'
			className='btn btn-ui'
			onClick={handleNextQuestion}
		>
			{isLastQuestion ? 'Finish' : 'Next'}
		</button>
	);
}
