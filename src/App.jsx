import { useState } from "react";
import "./App.css";
import data from './assets/data.js'

function App() {
	const channels = data;
	const [currentChannel, setCurrentChannel] = useState({});

	return (
		<>
		<div>{currentChannel.channel}</div>
		<div>{nextChannel.channel}</div>
		</>
	);
}

export default App;
