import React, { useRef, useCallback } from 'react';
import {
	Image,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
	Container,
	Title,
	BackToLoginButton,
	BackToLoginButtonText,
} from './styles';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface SignUpFormData {
	name: string;
	email: string;
	password: string;
}

const SignUp: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const emailInputRef = useRef<TextInput>(null);
	const passwordInputRef = useRef<TextInput>(null);
	const navigation = useNavigation();

	const handleSignUp = useCallback(
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
				Alert.alert(
					'Registo realizado com sucesso',
					'Já pode fazer login na aplicação',
				);
				navigation.goBack();
			} catch (error) {
				if (error instanceof Yup.ValidationError) {
					const errors = getValidationErrors(error);
					formRef.current?.setErrors(errors);
					return;
				}

				Alert.alert(
					'Erro na registo',
					'Ocorreu um erro ao fazer registo, tente novamente',
				);
			}
		},
		[navigation],
	);

	return (
		<>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				enabled
			>
				<ScrollView
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={{ flex: 1 }}
				>
					<Container>
						<Image source={logoImg} />
						<View>
							<Title>Crie a sua conta</Title>
						</View>
						<Form ref={formRef} onSubmit={handleSignUp}>
							<Input
								autoCapitalize="words"
								name="name"
								icon="user"
								placeholder="Nome"
								returnKeyType="next"
								onSubmitEditing={() => {
									emailInputRef.current?.focus();
								}}
							/>
							<Input
								ref={emailInputRef}
								autoCorrect={false}
								autoCapitalize="none"
								keyboardType="email-address"
								name="email"
								icon="mail"
								placeholder="E-mail"
								returnKeyType="next"
								onSubmitEditing={() => {
									passwordInputRef.current?.focus();
								}}
							/>
							<Input
								ref={passwordInputRef}
								secureTextEntry
								name="password"
								icon="lock"
								placeholder="Password"
								textContentType="newPassword"
								returnKeyType="send"
								onSubmitEditing={() => formRef.current?.submitForm()}
							/>
							<Button onPress={() => formRef.current?.submitForm()}>
								Registar
							</Button>
						</Form>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>
			<BackToLoginButton onPress={() => navigation.goBack()}>
				<Icon name="arrow-left" size={20} color="#f4ede8" />
				<BackToLoginButtonText>Voltar para o login</BackToLoginButtonText>
			</BackToLoginButton>
		</>
	);
};

export default SignUp;
