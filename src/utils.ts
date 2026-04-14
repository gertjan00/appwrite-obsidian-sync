export function never(x: never) {
	throw new Error(`Unknown variable '${x}'`);
}
