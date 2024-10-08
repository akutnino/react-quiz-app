import { useGlobal } from '../contexts/GlobalContext';
import Options from './Options';

export default function Question(props) {
	const { questions, questionIndex, userAnswer, dispatch } = useGlobal();
	const questionObject = questions[questionIndex];

	return (
		<div>
			<h4>{questionObject.question}</h4>

			<Options
				questionObject={questionObject}
				userAnswer={userAnswer}
				dispatch={dispatch}
			/>
		</div>
	);
}
