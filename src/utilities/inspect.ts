import { inspect } from 'node:util';

import kindOf from 'kind-of';

const appendedKinds = new Set([
	'arguments',
	'array',
	'bigint',
	'boolean',
	'date',
	'number',
	'object',
	'regexp',
	'string',
]);

export default function inspectWithKind(val: any, options?: any) {
	const kind = kindOf(val);
	const stringifiedVal = inspect(
		val,
		Object.assign(
			{
				breakLength: Infinity,
				maxArrayLength: 10,
			},
			options
		)
	);

	if (kind === 'error') {
		return val.toString();
	}

	if (!appendedKinds.has(kind)) {
		return stringifiedVal;
	}

	if (stringifiedVal.startsWith('Observable {')) {
		return stringifiedVal;
	}

	return `${stringifiedVal} (${kind})`;
}
