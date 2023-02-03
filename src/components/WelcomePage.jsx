import React, { useState } from "react";

export default function WelcomePage(props) {
	const [gameStarted, setGameStarted] = useState(false);

	function startGame(action) {
		const startAudio = new Audio("/thunder_bell.wav");
		startAudio.play();

		props.gameProgress(action);
		setGameStarted(true);

		setTimeout(() => {
			props.startGame();
		}, 2000);
	}

	return (
		<section className={`welcome-page ${gameStarted ? "welcome-page-animation" : ""}`}>
			{!gameStarted && (
				<div className="container">
					<div className="welcome-page--wrapper">
						<div className="welcome--text">
							<h1>Olá, Bruno...</h1>
							<h2>Eu quero jogar um jogo.</h2>
						</div>
						<div className="welcome--start-btn-wrapper">
							<button
								className="welcome--start-btn"
								onClick={() => startGame("newgame")}
							>
								Novo jogo
							</button>
							{localStorage.getItem("riddleLevel") && (
								<button className="welcome--start-btn" onClick={startGame}>
									Continuar
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
