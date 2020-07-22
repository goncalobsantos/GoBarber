import React, { useRef, useCallback } from 'react';
import {
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

import Input from '../../components/Input';
import Button from '../../components/Button';
import ImagePicker from 'react-native-image-picker';
import ImageEditor, {
	ImageCropData,
} from '@react-native-community/image-editor';

import {
	Container,
	Title,
	PasswordsContainer,
	UserAvatar,
	UserAvatarButton,
	BackButton,
} from './styles';

import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

interface UpdateProfileFormData {
	name: string;
	email: string;
	old_password: string;
	password: string;
	password_confirmation: string;
}

const Profile: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const emailInputRef = useRef<TextInput>(null);
	const oldPasswordInputRef = useRef<TextInput>(null);
	const passwordInputRef = useRef<TextInput>(null);
	const confirmPasswordInputRef = useRef<TextInput>(null);
	const navigation = useNavigation();
	const { user, updateUser } = useAuth();

	const handleSignUp = useCallback(
		async (data: UpdateProfileFormData) => {
			try {
				formRef.current?.setErrors({});
				const schema = Yup.object().shape({
					name: Yup.string().required('Nome obrigatório'),
					email: Yup.string()
						.required('Email obrigatório')
						.email('Digite um email válido'),
					old_password: Yup.string(),
					password: Yup.string().when('old_password', {
						is: (val) => !!val.length,
						then: Yup.string()
							.required('Password é obrigatória')
							.min(6, 'Password deve ter no mínimo 6 caracteres'),
						otherwise: Yup.string(),
					}),
					password_confirmation: Yup.string()
						.when('old_password', {
							is: (val) => !!val.length,
							then: Yup.string().required('Password é obrigatória'),
							otherwise: Yup.string(),
						})
						.oneOf([Yup.ref('password'), null], 'As password devem ser iguais'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				const formData = {
					name: data.name,
					email: data.email,
					...(data.old_password
						? {
								old_password: data.old_password,
								password: data.password,
								password_confirmation: data.password_confirmation,
						  }
						: {}),
				};

				const response = await api.put('/profile', formData);
				updateUser(response.data);
				Alert.alert('Atualização de perfil realizada com sucesso');
				navigation.goBack();
			} catch (error) {
				if (error instanceof Yup.ValidationError) {
					const errors = getValidationErrors(error);
					formRef.current?.setErrors(errors);
					return;
				}

				Alert.alert(
					'Erro na atualização do perfil',
					'Ocorreu um erro ao atualizar o seu perfil, tente novamente',
				);
			}
		},
		[navigation, updateUser],
	);

	const handleGoBack = useCallback(() => {
		navigation.goBack();
	}, [navigation]);

	const handleUpdateAvatar = useCallback(async () => {
		const data = new FormData();
		const cropDataObject = {
			offset: { x: 0, y: 0 },
			size: { width: 720, height: 1080 },
			resizeMode: 'cover',
		} as ImageCropData;
		ImagePicker.showImagePicker(
			{
				title: 'Selecione um avatar',
				cancelButtonTitle: 'Cancelar',
				takePhotoButtonTitle: 'Usar camera',
				chooseFromLibraryButtonTitle: 'Escolher da galeria',
			},
			(response) => {
				if (response.didCancel) {
					return;
				}

				if (response.error) {
					Alert.alert('Erro ao atualizar o avatar', response.error);
				}

				// ImageEditor.cropImage(response.uri, {
				// 	offset: {
				// 		x: 0,
				// 		y: 0,
				// 	},
				// 	size: { width: 280, height: 380 },
				// }).then((editedImageUrl) => {
				// 	data.append('avatar', {
				// 		type: 'image/jpeg',
				// 		name: `${user.id}.jpg`,
				// 		uri: editedImageUrl,
				// 	});
				// 	api.patch('users/avatar', data).then((apiResponse) => {
				// 		updateUser(apiResponse.data);
				// 	});
				// });

				data.append('avatar', {
					type: 'image/jpeg',
					name: `${user.id}.jpg`,
					uri: response.uri,
				});
				api.patch('users/avatar', data).then((apiResponse) => {
					updateUser(apiResponse.data);
				});
			},
		);
	}, [updateUser, user.id]);

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
						<BackButton onPress={handleGoBack}>
							<Icon name="chevron-left" size={24} color="#999591" />
						</BackButton>
						<UserAvatarButton onPress={handleUpdateAvatar}>
							<UserAvatar source={{ uri: user.avatar_url }} />
						</UserAvatarButton>
						<View>
							<Title>Meu perfil</Title>
						</View>
						<Form initialData={user} ref={formRef} onSubmit={handleSignUp}>
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
									oldPasswordInputRef.current?.focus();
								}}
							/>
							<PasswordsContainer>
								<Input
									ref={oldPasswordInputRef}
									secureTextEntry
									name="old_password"
									icon="lock"
									placeholder="Password atual"
									textContentType="newPassword"
									returnKeyType="next"
									onSubmitEditing={() => passwordInputRef.current?.focus()}
								/>
								<Input
									ref={passwordInputRef}
									secureTextEntry
									name="password"
									icon="lock"
									placeholder="Nova password"
									textContentType="newPassword"
									returnKeyType="next"
									onSubmitEditing={() =>
										confirmPasswordInputRef.current?.focus()
									}
								/>
								<Input
									ref={confirmPasswordInputRef}
									secureTextEntry
									name="password_confirmation"
									icon="lock"
									placeholder="Confirmação da password"
									textContentType="newPassword"
									returnKeyType="send"
									onSubmitEditing={() => formRef.current?.submitForm()}
								/>
							</PasswordsContainer>
							<Button onPress={() => formRef.current?.submitForm()}>
								Confirmar mudanças
							</Button>
						</Form>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>
		</>
	);
};

export default Profile;
