import { useEffect } from 'react';
import { useGlobal } from '../contexts/GlobalContext';

export default function Timer(props) {
	const { secondsRemaining, dispatch } = useGlobal();
	const minutes = Math.floor(Number(secondsRemaining / 60));
	const seconds = Number(secondsRemaining % 60);

	useEffect(() => {
		const intervalObject = setInterval(() => {
			if (secondsRemaining === 0) {
				dispatch({ type: 'endQuiz' });
			} else {
				dispatch({ type: 'updateRemainingTime' });
			}
		}, 1000);

		return () => {
			clearInterval(intervalObject);
		};
	}, [secondsRemaining, dispatch]);

	return (
		<div className='timer'>
			{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
		</div>
	);
}
