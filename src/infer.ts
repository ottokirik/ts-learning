function runTransaction(transaction: {
	fromTo: [string, string];
}) {
	console.log(transaction);
}

const transaction: GetArg<typeof runTransaction> = {
	fromTo: ['1', '20'],
};

runTransaction(transaction);

type GetArg<T> = T extends (arg: infer ArgType) => unknown ? ArgType : never;
