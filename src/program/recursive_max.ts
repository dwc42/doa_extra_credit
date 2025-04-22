export default function recursiveMax(array: number[], i: number | undefined = array.length): number {
	if (i <= 1) return array[0];
	const previousMax = recursiveMax(array, i - 1);
	if (previousMax > array[i - 1]) return previousMax;
	return array[i - 1];
}