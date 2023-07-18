export const ClassName = (className: string, options: { [K: string]: boolean | undefined }, other: (string | undefined)[]) =>
	`${className} ${Object.keys(options)
		.filter((key) => options[key])
		.join(' ')} ${other.join(' ')}`
