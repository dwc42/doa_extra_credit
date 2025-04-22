import React, { useState } from 'react';
import recursiveMax from './recursive_max';
export default function Program() {
	const [getOutput, setOutput] = useState(<div></div>);
	const [getError, setError] = useState("");
	const [getInput, setInput] = useState([3, 5, 2, 9, 1, 8, 0, 2]);
	function calculate(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		const inputArray = getInput;
		const max = recursiveMax(inputArray);
		let text = "";
		text += `recursiveMax(${JSON.stringify(getInput)})<br />`;
		for (let i = 1; i < inputArray.length; i++) {
			text += `${"&nbsp;&nbsp;&nbsp;".repeat(i)}-  recursiveMax(${JSON.stringify(getInput.slice(0, inputArray.length - i))})}<br />`;
		}
		let currentMax = inputArray[0];
		for (let i = 0; i < inputArray.length; i++) {
			const v1 = inputArray[i];

			if (i <= 0) text += `${"&nbsp;&nbsp;&nbsp;".repeat(inputArray.length - i)}-  n = 1 return ${currentMax}<br />`;
			else text += `${"&nbsp;&nbsp;&nbsp;".repeat(inputArray.length - i)}-  ${currentMax} > ${v1} return ${v1 > currentMax ? v1 : currentMax}<br />`;
			currentMax = currentMax > v1 ? currentMax : v1;
		}
		text += `max = ${max}`;
		setOutput(<div dangerouslySetInnerHTML={{ __html: text }} />);
	}
	function input(event: React.FormEvent<HTMLInputElement>) {
		const { value } = event.target as HTMLInputElement;
		let inputArray;
		try {
			inputArray = JSON.parse(value);
		} catch (error) {
			return setError(error.message);
		}

		if (Array.isArray(inputArray)) {
			setInput(inputArray);
			setError("");
		} else {
			return setError("Please enter a valid array.");
		}

	}
	return (
		<div>
			<h1>Program</h1>
			<p>This is the program component.</p>
			<p style={{ color: "red" }}>{getError}</p>
			<input id="enter a number array" onInput={input} />
			<button id="calculate" onClick={calculate}>Submit</button>
			{getOutput}

		</div>
	);
}