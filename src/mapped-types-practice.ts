interface IForm {
	name: string;
	password: string;
	confirmPassword: string;
}

interface IValidItem {
	isValid: true;
}

interface INotValidItem {
	isValid: false;
	errorMessage: string;
}

type ValidationFormType<T> = {
	[Property in keyof T]: IValidItem | INotValidItem;
};

const formValidation: ValidationFormType<IForm> = {
	name: { isValid: true },
	password: { isValid: true },
	confirmPassword: { isValid: false, errorMessage: '' },
};
