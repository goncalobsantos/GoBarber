import React, { useCallback, useRef, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import logoImg from '../../assets/logo.svg';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ForgotPasswordFormData {
	email: string;
}

const ForgotPassword: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const formRef = useRef<FormHandles>(null);
	const { addToast } = useToast();

	const handleSubmit = useCallback(
		async (data: ForgotPasswordFormData) => {
			try {
				setLoading(true);
				formRef.current?.setErrors({});
				const schema = Yup.object().shape({
					email: Yup.string()
						.required('Email obrigatório')
						.email('Digite um email válido'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				//recuperar a senha
				await api.post('/password/forgot', {
					email: data.email,
				});

				addToast({
					type: 'success',
					title: 'Email enviado',
					description:
						'Enviamos um email para recuperar a senha, verifique a sua inbox',
				});
			} catch (error) {
				if (error instanceof Yup.ValidationError) {
					const errors = getValidationErrors(error);
					formRef.current?.setErrors(errors);
					return;
				}

				addToast({
					type: 'error',
					title: 'Erro na recuperação de senha',
					description:
						'Ocorreu um erro ao tentar recuperar a senha, verifique se o email está válido',
				});
			} finally {
				setLoading(false);
			}
		},
		[addToast],
	);

	return (
		<Container>
			<Content>
				<AnimationContainer>
					<img src={logoImg} alt="Go Barber logo" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Recuperar senha</h1>
						<Input name="email" icon={FiMail} placeholder="Email" />
						<Button loading={loading} type="submit">
							Recuperar
						</Button>
					</Form>
					<Link to="/signin">
						<FiLogIn size={20} />
						Voltar ao login
					</Link>
				</AnimationContainer>
			</Content>
			<Background />
		</Container>
	);
};

export default ForgotPassword;
