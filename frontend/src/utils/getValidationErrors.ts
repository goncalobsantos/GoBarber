import { ValidationError } from 'yup';

interface Errors {
	[key: string]: string;
}

const getValidationErrors = (error: ValidationError): Errors => {
	const validationErrors: Errors = {};

	error.inner.map((e) => (validationErrors[e.path] = error.message));

	return validationErrors;
};

export default getValidationErrors;
