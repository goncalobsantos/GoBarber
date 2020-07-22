import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
	Container,
	Title,
	Description,
	OKButton,
	OKButtonText,
} from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

interface RouteParams {
	date: number;
	provider: string;
}

const AppointmentCreated: React.FC = () => {
	const { reset } = useNavigation();
	const { params } = useRoute();

	const { date, provider } = params as RouteParams;
	const handleOKPressed = useCallback(() => {
		reset({
			routes: [{ name: 'Dashboard' }],
			index: 0,
		});
	}, [reset]);

	const formattedAppointmentDescription = useMemo(() => {
		const dateFormatted = format(
			date,
			"EEEE', dia ' dd ' de ' MMMM ' de ' yyyy ' às ' HH:mm'h'",
			{ locale: pt },
		);
		const finalDate =
			dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1);

		const appointmentDescription = finalDate + ' com ' + provider;
		return appointmentDescription;
	}, [date]);
	return (
		<Container>
			<Icon name="check" size={80} color="#04d361" />
			<Title>Marcação feita com sucesso</Title>
			<Description>{formattedAppointmentDescription}</Description>
			<OKButton onPress={handleOKPressed}>
				<OKButtonText>Ok</OKButtonText>
			</OKButton>
		</Container>
	);
};

export default AppointmentCreated;
