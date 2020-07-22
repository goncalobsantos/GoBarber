import React, { useCallback, useRef } from 'react';
import { FiMail, FiUser, FiLock, FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpFormData {
	name: string;
	email: string;
	password: string;
}

const SignUp: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const { addToast } = useToast();
	const history = useHistory();
	const handleSubmit = useCallback(
		async (data: SignUpFormData) => {
			try {
				formRef.current?.setErrors({});
				const schema = Yup.object().shape({
					name: Yup.string().required('Nome obrigatório'),
					email: Yup.string()
						.required('Email obrigatório')
						.email('Digite um email válido'),
					password: Yup.string().min(
						6,
						'Password deve ter pelo menos 6 caracteres',
					),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				await api.post('/users', data);
				history.push('/');
				addToast({
					type: 'success',
					title: 'Registo feito com sucesso',
					description: 'Pode realizar o seu login',
				});
			} catch (error) {
				if (error instanceof Yup.ValidationError) {
					const errors = getValidationErrors(error);
					formRef.current?.setErrors(errors);
					return;
				}

				addToast({
					type: 'error',
					title: 'Erro na registo',
					description: 'Ocorreu um erro ao fazer registo, tente novamente',
				});
			}
		},
		[addToast, history],
	);

	return (
		<Container>
			<Background />
			<Content>
				<AnimationContainer>
					<img src={logoImg} alt="Go Barber logo" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Faça o seu registo</h1>
						<Input name="name" icon={FiUser} type="text" placeholder="Nome" />
						<Input name="email" icon={FiMail} placeholder="Email" />
						<Input
							name="password"
							icon={FiLock}
							type="password"
							placeholder="Password"
						/>
						<Button type="submit">Registar</Button>
					</Form>
					<Link to="/">
						<FiArrowLeft size={20} />
						Voltar para login
					</Link>
				</AnimationContainer>
			</Content>
		</Container>
	);
};
export default SignUp;
