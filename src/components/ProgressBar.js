import { useEffect, useRef } from 'react';
import { useGlobal } from '../contexts/GlobalContext';

export default function ProgressBar(props) {
	const { questionIndex, totalQuestions, userPoints, totalMaxPoints, isAnswered } =
		useGlobal();
	const progressElement = useRef(null);

	useEffect(() => {
		if (isAnswered) progressElement.current.value = questionIndex + 1;

		return () => {};
	}, [isAnswered, questionIndex]);

	return (
		<header className='progress'>
			<progress
				max={totalQuestions}
				value={questionIndex}
				ref={progressElement}
			/>

			<p>
				Question <strong>{questionIndex + 1}</strong> / {totalQuestions}
			</p>

			<p>
				<strong>{userPoints}</strong> / {totalMaxPoints} points
			</p>
		</header>
	);
}
