import { useState, useEffect } from "react";
import Riddles from "./components/Riddles";
import WelcomePage from "./components/WelcomePage";
import riddlesData from "./data/riddlesData";
import GameWon from "./components/GameWon";

export default function App() {
	const riddles = riddlesData.riddles;
	const [gameStarted, setGameStarted] = useState(false);
	const [riddleLevel, setRiddleLevel] = useState(
		JSON.parse(localStorage.getItem("riddleLevel")) || 1
	);

	const [gameWon, setGameWon] = useState(false);

	function startGame(action) {
		setGameStarted(true);

		if (action === "newGame") {
			setRiddleLevel(1);
		}
	}

	function handleRightAnswer() {
		if (riddleLevel < riddles.length - 1) {
			setRiddleLevel((prevRiddleLevel) => {
				return prevRiddleLevel + 1;
			});
		} else {
			setGameWon(true);
		}
	}

	useEffect(() => {
		localStorage.setItem("riddleLevel", riddleLevel);
	}, [riddleLevel]);

	return (
		<>
			{!gameStarted && <WelcomePage gameStarted={gameStarted} startGame={startGame} />}

			{gameStarted && !gameWon && (
				<Riddles
					key={riddlesData.riddles[riddleLevel].name}
					img={riddlesData.riddles[riddleLevel].img}
					tip={riddlesData.riddles[riddleLevel].tip}
					tip2={riddlesData.riddles[riddleLevel].tip2}
					answer={riddlesData.riddles[riddleLevel].answer}
					level={riddleLevel}
					rightAnswer={handleRightAnswer}
					resetGame={() => setGameStarted(false)}
				/>
			)}

			{gameWon && <GameWon />}
		</>
	);
}
