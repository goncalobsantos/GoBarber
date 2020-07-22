import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useRoute, useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
	Container,
	Header,
	BackButton,
	HeaderTitle,
	UserAvatar,
	Content,
	ProviderListContainer,
	ProvidersList,
	ProviderContainer,
	ProviderAvatar,
	ProviderName,
	Calendar,
	MainTitle,
	OpenDatePickerButton,
	OpenDatePickerButtonText,
	Schedule,
	Section,
	SectionTitle,
	SectionContent,
	Hour,
	HourText,
	CreateAppointmentButton,
	CreateAppointmentButtonText,
} from './styles';
import { Platform, Alert } from 'react-native';

interface RouteParams {
	providerId: string;
}

export interface Provider {
	id: string;
	name: string;
	avatar_url: string;
}

interface AvailabilityItem {
	hour: number;
	available: true;
}

const CreateAppointment: React.FC = () => {
	const { user } = useAuth();
	const route = useRoute();
	const { goBack, navigate } = useNavigation();
	const { providerId } = route.params as RouteParams;
	const [providers, setProviders] = useState<Provider[]>([]);
	const [selectedProvider, setSelectedProvider] = useState(providerId);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [dayAvailability, setDayAvailability] = useState<AvailabilityItem[]>(
		[],
	);
	const [selectedHour, setSelectedHour] = useState(0);

	useEffect(() => {
		api.get('providers').then((response) => {
			setProviders(response.data);
		});
	}, []);

	useEffect(() => {
		api
			.get(`providers/${selectedProvider}/day-availability`, {
				params: {
					year: selectedDate.getFullYear(),
					month: selectedDate.getMonth() + 1,
					day: selectedDate.getDate(),
				},
			})
			.then((response) => {
				setDayAvailability(response.data);
			});
	}, [selectedDate, selectedProvider]);

	const navigateBack = useCallback(() => {
		goBack();
	}, [goBack]);

	const handleSelectProvider = useCallback((providerID: string) => {
		setSelectedProvider(providerID);
		setSelectedHour(0);
	}, []);

	const handleToggleDatePicker = useCallback(() => {
		setShowDatePicker((oldStateValue) => !oldStateValue);
	}, []);

	const handleDateChange = useCallback((event: any, date: Date | undefined) => {
		if (Platform.OS === 'android') {
			setShowDatePicker(false);
		}

		if (date) {
			setSelectedDate(date);
			setSelectedHour(0);
		}
	}, []);

	const handleSelectHour = useCallback((hour: number) => {
		setSelectedHour(hour);
	}, []);

	const morningAvailability = useMemo(() => {
		return dayAvailability
			.filter(({ hour }) => hour <= 12)
			.map(({ hour, available }) => {
				return {
					hour,
					available,
					hourFormatted: format(new Date().setHours(hour), 'HH:00'),
				};
			});
	}, [dayAvailability]);

	const afternoonAvailability = useMemo(() => {
		return dayAvailability
			.filter(({ hour }) => hour > 12)
			.map(({ hour, available }) => {
				return {
					hour,
					available,
					hourFormatted: format(new Date().setHours(hour), 'HH:00'),
				};
			});
	}, [dayAvailability]);

	const handleCreateAppointment = useCallback(async () => {
		try {
			const date = new Date(selectedDate);
			const appointmentProvider = providers.find(
				(provider) => provider.id === selectedProvider,
			);
			date.setHours(selectedHour);
			date.setMinutes(0);
			await api.post('appointments', {
				provider_id: selectedProvider,
				date,
			});

			navigate('AppointmentCreated', {
				date: date.getTime(),
				provider: appointmentProvider ? appointmentProvider.name : '',
			});
		} catch (error) {
			Alert.alert(
				'Erro a criar marcação',
				'Ocorreu um erro a tentar criar a marcação, tente novamente',
			);
		}
	}, [navigate, selectedProvider, selectedHour, selectedDate]);

	return (
		<Container>
			<Header>
				<BackButton onPress={navigateBack}>
					<Icon name="chevron-left" size={24} color="#999591" />
				</BackButton>
				<HeaderTitle>Cabeleireiros</HeaderTitle>
				<UserAvatar source={{ uri: user.avatar_url }} />
			</Header>
			<Content>
				<ProviderListContainer>
					<ProvidersList
						data={providers}
						keyExtractor={(provider) => provider.id}
						horizontal
						showsHorizontalScrollIndicator={false}
						renderItem={({ item: provider }) => (
							<ProviderContainer
								onPress={() => handleSelectProvider(provider.id)}
								selected={provider.id === selectedProvider}
							>
								<ProviderAvatar source={{ uri: provider.avatar_url }} />
								<ProviderName selected={provider.id === selectedProvider}>
									{provider.name}
								</ProviderName>
							</ProviderContainer>
						)}
					/>
				</ProviderListContainer>
				<Calendar>
					<MainTitle>Escolha a data</MainTitle>
					<OpenDatePickerButton onPress={handleToggleDatePicker}>
						<OpenDatePickerButtonText>Selecionar data</OpenDatePickerButtonText>
					</OpenDatePickerButton>
					{showDatePicker && (
						<DateTimePicker
							mode="date"
							display="calendar"
							onChange={handleDateChange}
							textColor="#f4ede8"
							value={selectedDate}
						/>
					)}
				</Calendar>
				<Schedule>
					<MainTitle>Escolha o horário</MainTitle>
					<Section>
						<SectionTitle>Manhã</SectionTitle>
						<SectionContent horizontal>
							{morningAvailability.map(({ hour, hourFormatted, available }) => (
								<Hour
									enabled={available}
									available={available}
									key={hourFormatted}
									selected={selectedHour === hour}
									onPress={() => handleSelectHour(hour)}
								>
									<HourText selected={selectedHour === hour}>
										{hourFormatted}
									</HourText>
								</Hour>
							))}
						</SectionContent>
					</Section>
					<Section>
						<SectionTitle>Tarde</SectionTitle>
						<SectionContent horizontal>
							{afternoonAvailability.map(
								({ hour, hourFormatted, available }) => (
									<Hour
										enabled={available}
										available={available}
										key={hourFormatted}
										selected={selectedHour === hour}
										onPress={() => handleSelectHour(hour)}
									>
										<HourText selected={selectedHour === hour}>
											{hourFormatted}
										</HourText>
									</Hour>
								),
							)}
						</SectionContent>
					</Section>
				</Schedule>
				<CreateAppointmentButton onPress={handleCreateAppointment}>
					<CreateAppointmentButtonText>
						Agendar marcação
					</CreateAppointmentButtonText>
				</CreateAppointmentButton>
			</Content>
		</Container>
	);
};

export default CreateAppointment;
