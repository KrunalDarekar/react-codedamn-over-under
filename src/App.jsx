import { useState, useEffect } from "react";
import "./App.css";
import data from "./assets/data";

function App() {
	const [channels, setChannels] = useState(data);
	const [currentChannel, setCurrentChannel] = useState({});
  	const [nextChannel, setNextChannel] = useState({});
	const [points, setPoints] = useState(0);
	const [gameMsg, setGameMsg] = useState("");

	const startNewGame = () => {
		const randomIndex1 = Math.floor(Math.random() * channels.length);
		let randomIndex2;
		do {
		randomIndex2 = Math.floor(Math.random() * channels.length);
		} while (randomIndex1 === randomIndex2);

		setCurrentChannel(channels[randomIndex1]);
		setNextChannel(channels[randomIndex2]);
	};

	const playRound = (isOver) => {
		if(isOver){
			setCurrentChannel(nextChannel);
			let randomIndex;
			do {
				randomIndex = Math.floor(Math.random() * channels.length);
			} while (channels[randomIndex].channel === nextChannel.channel);
			setNextChannel(channels[randomIndex]);
		} else {
			let randomIndex;
			do {
				randomIndex = Math.floor(Math.random() * channels.length);
			} while (channels[randomIndex].channel === currentChannel.channel);
			setNextChannel(channels[randomIndex]);
		}
	}

	useEffect(() => {
		startNewGame();
	}, []); // Run only once when the component mounts

	const handleGuess = (guess) => {
		if (guess === 'over' && nextChannel.subscribers > currentChannel.subscribers) {
			setGameMsg("correct guess");
			setPoints( points => points +1);
			playRound(true)
		} else if(guess === 'under' && nextChannel.subscribers < currentChannel.subscribers) {
			setGameMsg("correct guess");
			setPoints( points => points +1);
			playRound(false)
		} else {
			setGameMsg("incorrect guess");
			setPoints(0);
			startNewGame();
		}
	};

	return (
		<div>
		<h1>Guess the Subscriber Count</h1>
		<div>
			<p>{`Channel: ${currentChannel.channel}, Subscribers: ${(currentChannel.subscribers)/1000000} million`}</p>
			<p>VS</p>
			<p>{`Channel: ${nextChannel.channel}`}</p>
		</div>
		<div className="buttons">
			<button onClick={() => handleGuess('over')}>Over</button>
			<button onClick={() => handleGuess('under')}>Under</button>
		</div>
		<div>{gameMsg}</div>
		<div>score: {points}</div>
		</div>
	);
}

export default App;
