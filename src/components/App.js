import { useGlobal } from '../contexts/GlobalContext';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import ProgressBar from './ProgressBar';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';

export default function App(props) {
	const { status, userAnswer } = useGlobal();
	const isAnswered = userAnswer !== null;

	return (
		<div className='app'>
			<Header />

			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && <StartScreen />}
				{status === 'active' && (
					<>
						<ProgressBar />
						<Question />
						<Footer>
							<Timer />
							{isAnswered && <NextButton />}
						</Footer>
					</>
				)}
				{status === 'finish' && <FinishScreen />}
			</Main>
		</div>
	);
}
