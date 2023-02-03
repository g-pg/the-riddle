import { useState } from "react";
import Riddles from "./components/Riddles";
import WelcomePage from "./components/WelcomePage";
import riddlesData from "./data/riddlesData";
import GameWon from "./components/GameWon";

export default function App() {
	const riddles = riddlesData.riddles;
	const [gameStarted, setGameStarted] = useState(false);
	const [riddleLevel, setRiddleLevel] = useState(
		JSON.parse(localStorage.getItem("riddleLevel")) || 0
	);

	const [gameWon, setGameWon] = useState(false);

	function startGame() {
		setGameStarted(true);
	}

	function handleRightAnswer() {
		if (riddleLevel < riddles.length - 1) {
			setRiddleLevel((prevRiddleLevel) => {
				return prevRiddleLevel + 1;
			});
			trackProgress("save");
		} else {
			setGameWon(true);
		}
	}

	function trackProgress(action) {
		if (action === "save") {
			localStorage.getItem("riddleLevel")
				? localStorage.setItem("riddleLevel", riddleLevel + 1)
				: localStorage.setItem("riddleLevel", 1);
		} else if (action === "newgame") {
			localStorage.removeItem("riddleLevel");
			setRiddleLevel(0);
		} else {
			return;
		}
	}

	return (
		<>
			{!gameStarted && (
				<WelcomePage
					gameStarted={gameStarted}
					startGame={startGame}
					gameProgress={trackProgress}
				/>
			)}

			{gameStarted && !gameWon && (
				<Riddles
					key={riddlesData.riddles[riddleLevel].name}
					img={riddlesData.riddles[riddleLevel].img}
					tip={riddlesData.riddles[riddleLevel].tip}
					tip2={riddlesData.riddles[riddleLevel].tip2}
					answer={riddlesData.riddles[riddleLevel].answer}
					level={riddleLevel + 1}
					rightAnswer={handleRightAnswer}
					resetGame={() => setGameStarted(false)}
				/>
			)}

			{gameWon && <GameWon />}
		</>
	);
}
