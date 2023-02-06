import React, { useState } from "react";
import Typewriter from "typewriter-effect";

export default function GameWon(props) {
	const textWon = "Você desvendou o enigma.";
	const subTextWon = "Por enquanto...";

	return (
		<section className="gamewon-page">
			<div className="gamewon--text">
				<h1>
					<Typewriter
						onInit={(typewriter) => {
							typewriter

								.changeDelay(80)
								.typeString(textWon)
								.pauseFor(1500)
								.deleteAll()
								.changeDelay(150)
								.typeString(subTextWon)
								.start();
						}}
					/>
				</h1>
			</div>
		</section>
	);
}
