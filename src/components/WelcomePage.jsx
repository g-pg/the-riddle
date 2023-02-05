import React, { useState } from "react";

export default function WelcomePage(props) {
	const [welcomeAnimation, setWelcomeAnimation] = useState(false);

	function startGame(action) {
		const startAudio = new Audio("/thunder_bell.wav");
		startAudio.play();
		setWelcomeAnimation(true);
		setTimeout(() => {
			props.startGame(action);
		}, 2000);
	}

	return (
		<section className={`welcome-page ${welcomeAnimation ? "welcome-page-animation" : ""}`}>
			{!welcomeAnimation && (
				<div className="container">
					<div className="welcome-page--wrapper">
						<div className="welcome--text">
							<h1>Olá, Bruno...</h1>
							<h2>Eu quero jogar um jogo.</h2>
						</div>
						<div className="welcome--start-btn-wrapper">
							<button
								className="welcome--start-btn"
								onClick={() => startGame("newGame")}
							>
								Novo jogo
							</button>
							{localStorage.getItem("riddleLevel") > 1 && (
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
