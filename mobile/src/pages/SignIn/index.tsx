import React, { useCallback, useRef } from 'react';
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
	ForgotPassword,
	ForgotPasswordText,
	CreateAccountButton,
	CreateAccountButtonText,
} from './styles';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

interface SignInFormData {
	email: string;
	password: string;
}

const SignIn: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const passwordInputRef = useRef<TextInput>(null);
	const navigation = useNavigation();
	const { signIn } = useAuth();

	const handleSignIn = useCallback(
		async (data: SignInFormData) => {
			try {
				formRef.current?.setErrors({});
				const schema = Yup.object().shape({
					email: Yup.string()
						.required('Email obrigatório')
						.email('Digite um email válido'),
					password: Yup.string().required('Password é obrigatório'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				await signIn({
					email: data.email,
					password: data.password,
				});
			} catch (error) {
				if (error instanceof Yup.ValidationError) {
					const errors = getValidationErrors(error);
					formRef.current?.setErrors(errors);
					return;
				}

				Alert.alert(
					'Erro na autenticação',
					'Ocorreu um erro ao fazer login, verifique as credenciais',
				);
			}
		},
		[signIn],
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
							<Title>Faça o seu login</Title>
						</View>
						<Form ref={formRef} onSubmit={handleSignIn}>
							<Input
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
								returnKeyType="send"
								onSubmitEditing={() => formRef.current?.submitForm()}
							/>
							<Button onPress={() => formRef.current?.submitForm()}>
								Entrar
							</Button>
						</Form>
						<ForgotPassword onPress={() => {}}>
							<ForgotPasswordText>Esqueci a minha password</ForgotPasswordText>
						</ForgotPassword>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>
			<CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
				<Icon name="log-in" size={20} color="#ff9000" />
				<CreateAccountButtonText>Criar conta</CreateAccountButtonText>
			</CreateAccountButton>
		</>
	);
};

export default SignIn;
