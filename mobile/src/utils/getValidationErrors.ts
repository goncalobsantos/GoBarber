import { ValidationError } from 'yup';

interface Errors {
	[key: string]: string;
}

const getValidationErrors = (error: ValidationError): Errors => {
	const validationErrors: Errors = {};

	error.inner.map((error) => {
		validationErrors[error.path] = error.message;
	});

	return validationErrors;
};

export default getValidationErrors;
