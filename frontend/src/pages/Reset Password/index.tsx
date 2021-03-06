import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import logoImg from '../../assets/logo.svg';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ResetPasswordFormData {
	password: string;
	password_confirmation: string;
}

const ResetPassword: React.FC = () => {
	const formRef = useRef<FormHandles>(null);

	const { addToast } = useToast();
	const history = useHistory();
	const location = useLocation();

	const handleSubmit = useCallback(
		async (data: ResetPasswordFormData) => {
			try {
				formRef.current?.setErrors({});
				const schema = Yup.object().shape({
					password: Yup.string().required('Password é obrigatório'),
					password_confirmation: Yup.string().oneOf(
						[Yup.ref('password'), null],
						'As password devem ser iguais',
					),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				const token = location.search.replace('?token=', '');

				if (!token) {
					throw new Error();
				}

				await api.post('password/reset', {
					password: data.password,
					password_confirmation: data.password_confirmation,
					token,
				});

				history.push('/');
			} catch (error) {
				if (error instanceof Yup.ValidationError) {
					const errors = getValidationErrors(error);
					formRef.current?.setErrors(errors);
					return;
				}

				addToast({
					type: 'error',
					title: 'Erro ao resetar senha',
					description: 'Ocorreu um erro ao resetar a sua senha, tente de novo',
				});
			}
		},
		[addToast, history, location.search],
	);

	return (
		<Container>
			<Content>
				<AnimationContainer>
					<img src={logoImg} alt="Go Barber logo" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Resetar senha</h1>
						<Input
							name="password"
							icon={FiLock}
							type="password"
							placeholder="Nova password"
						/>
						<Input
							name="password_confirmation"
							icon={FiLock}
							type="password"
							placeholder="Confirmação de password"
						/>
						<Button type="submit">Alterar senha</Button>
					</Form>
				</AnimationContainer>
			</Content>
			<Background />
		</Container>
	);
};

export default ResetPassword;
