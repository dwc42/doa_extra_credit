import React, { useState } from 'react';
import recursiveMax from './recursive_max';
const defaultInput: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export default function Program() {
	const [getOutput, setOutput] = useState(<div></div>);
	const [getError, setError] = useState("");
	const [getInput, setInput] = useState(JSON.stringify(defaultInput));
	const [getArray, setArray] = useState(defaultInput);
	function calculate(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		const inputArray = getArray;
		const max = recursiveMax(getArray);
		let text = "";
		text += `recursiveMax(${JSON.stringify(getArray)})<br />`;
		for (let i = 1; i < inputArray.length; i++) {
			text += `${"&nbsp;&nbsp;&nbsp;".repeat(i)}-  recursiveMax(${JSON.stringify(getArray.slice(0, inputArray.length - i))})<br />`;
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
		setInput(value);
		let inputArray;
		try {
			inputArray = JSON.parse(value);
		} catch (error) {
			return setError(error.message);
		}

		if (Array.isArray(inputArray)) {
			setArray(inputArray);
			setError("");
		} else {
			return setError("Please enter a valid array.");
		}

	}
	return (
		<div>
			<h1 className="Title">Program</h1>
			<p className="Paragraph">This program demonstrates the how to recursively find the maximum element in an array of size n.</p>
			<p style={{ color: "red" }}>{getError}</p>
			<input id="enter a number array" value={getInput} onInput={input} />
			<button id="calculate" onClick={calculate}>Submit</button>
			<div className="Output">
				{getOutput}
			</div>
		</div>
	);
}