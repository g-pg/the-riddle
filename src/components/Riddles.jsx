import React, { useState } from "react";

export default function Riddles(props) {
	const [answer, setAnswer] = useState({
		answerContent: "",
		isCorrect: false,
	});

	const [wrongAnswer, setWrongAnswer] = useState(false);
	const [closeAnswer, setCloseAnswer] = useState(false);
	const [tipActive, setTipActive] = useState(false);

	function toggleTip() {
		setTipActive((prevTip) => {
			return !prevTip;
		});
	}
	function handleChange(event) {
		setAnswer((prevAnswer) => {
			return {
				...prevAnswer,
				answerContent: event.target.value,
			};
		});
	}

	function handleSubmitAnswer(event) {
		let answerGiven = answer.answerContent.toLowerCase().trim();
		let trueAnswer = props.answer.toLowerCase();
		let lettersCorrect = 0;
		for (let i = 0; i < trueAnswer.length; i++) {
			answerGiven[i] === trueAnswer[i] ? lettersCorrect++ : "";
		}

		event.preventDefault();
		if (answerGiven === trueAnswer) {
			const startAudio = new Audio("/thunder_bell.wav");
			startAudio.play();
			setTipActive(false);

			props.rightAnswer();
		} else if (lettersCorrect >= 0.7 * trueAnswer.length) {
			setCloseAnswer(true);
			setTimeout(() => {
				setCloseAnswer(false);
			}, 700);
		} else {
			setWrongAnswer(true);
			setTimeout(() => {
				setWrongAnswer(false);
			}, 700);
		}
	}

	function handleSubmit() {}

	return (
		<section className="riddle-main">
			<header className="riddle-header">
				<div className="riddle-header-wrapper container">
					<h1>The Deficience Riddle</h1>
					<h2>{props.level}</h2>
				</div>
			</header>

			<div className="container centralizar">
				<h2 className="dica">{props.tip}</h2>
				<div className="riddle--img-wrapper">
					<img src={props.img} className="riddle-img" />
					<button className="riddle--tip-btn" onClick={toggleTip}></button>
					{tipActive && (
						<p className="extra-tip">
							{props.tip2 ? props.tip2 : `Sem mais dicas, seu vagabundo.`}
						</p>
					)}
				</div>
				<form onSubmit={handleSubmit} className="riddle--form centralizar">
					<input
						type="text"
						className="input-answer"
						placeholder="Resposta"
						onChange={handleChange}
						value={answer.answerContent}
					/>
					<button className="riddle--form--btn" onClick={handleSubmitAnswer}>
						Tentar a sorte
					</button>
				</form>
				{wrongAnswer && <h3 className="wrong-answer">ERRADO</h3>}
				{closeAnswer && <h3 className="wrong-answer">QUASE</h3>}
			</div>
		</section>
	);
}
