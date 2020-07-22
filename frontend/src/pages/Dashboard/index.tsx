import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import pt from 'date-fns/locale/pt';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiPower, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
	Container,
	Header,
	HeaderContent,
	Profile,
	Content,
	Schedule,
	NextAppointment,
	Session,
	Appointment,
	Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface MonthAvailabilityItem {
	day: number;
	available: boolean;
}

interface AppointmentItem {
	id: string;
	date: string;
	hourFormatted: string;
	user: {
		name: string;
		avatar_url: string;
	};
}

const Dashboard: React.FC = () => {
	const { signOut, user } = useAuth();
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [monthAvailability, setMonthAvailability] = useState<
		MonthAvailabilityItem[]
	>([]);
	const [appointments, setAppointments] = useState<AppointmentItem[]>([]);

	const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
		if (modifiers.available && !modifiers.disabled) {
			setSelectedDate(day);
		}
	}, []);

	const handleMonthChange = useCallback((month: Date) => {
		setCurrentMonth(month);
	}, []);

	const disabledDays = useMemo(() => {
		const dates = monthAvailability
			.filter((monthDay) => monthDay.available === false)
			.map((monthDay) => {
				const year = currentMonth.getFullYear();
				const month = currentMonth.getMonth();
				return new Date(year, month, monthDay.day);
			});

		return dates;
	}, [currentMonth, monthAvailability]);

	useEffect(() => {
		api
			.get(`providers/${user.id}/month-availability`, {
				params: {
					year: currentMonth.getFullYear(),
					month: currentMonth.getMonth() + 1,
				},
			})
			.then((response) => {
				setMonthAvailability(response.data);
			});
	}, [currentMonth, user.id]);

	useEffect(() => {
		api
			.get<AppointmentItem[]>('appointments/me', {
				params: {
					year: selectedDate.getFullYear(),
					month: selectedDate.getMonth() + 1,
					day: selectedDate.getDate(),
				},
			})
			.then((response) => {
				const appointmentsFormatted = response.data.map((appointment) => {
					return {
						...appointment,
						hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
					};
				});
				setAppointments(appointmentsFormatted);
			});
	}, [selectedDate]);

	const selectedDateAsText = useMemo(() => {
		return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: pt });
	}, [selectedDate]);

	const selectedWeekDayAsText = useMemo(() => {
		return format(selectedDate, 'cccc', { locale: pt });
	}, [selectedDate]);

	const morningAppointments = useMemo(() => {
		return appointments.filter((appointment) => {
			return parseISO(appointment.date).getHours() <= 12;
		});
	}, [appointments]);

	const afternoonAppointments = useMemo(() => {
		return appointments.filter((appointment) => {
			return parseISO(appointment.date).getHours() > 12;
		});
	}, [appointments]);

	const nextAppointment = useMemo(() => {
		return appointments.find((appointment) =>
			isAfter(parseISO(appointment.date), new Date()),
		);
	}, [appointments]);

	return (
		<Container>
			<Header>
				<HeaderContent>
					<img src={logoImg} alt="Go Barber" />
					<Profile>
						<img src={user.avatar_url} alt={user.name} />
						<div>
							<span>Bem vindo,</span>
							<Link to="/profile">
								<strong>{user.name}</strong>
							</Link>
						</div>
					</Profile>
					<button type="button" onClick={signOut}>
						<FiPower />
					</button>
				</HeaderContent>
			</Header>
			<Content>
				<Schedule>
					<h1>Horários agendados</h1>
					<p>
						{isToday(selectedDate) && <span>Hoje</span>}
						<span>{selectedDateAsText}</span>
						<span>{selectedWeekDayAsText}</span>
					</p>
					{isToday(selectedDate) && nextAppointment && (
						<NextAppointment>
							<strong>Atendimento a seguir</strong>
							<div>
								<img
									src={nextAppointment.user.avatar_url}
									alt={nextAppointment.user.name}
								/>
								<strong>{nextAppointment.user.name}</strong>
								<span>
									<FiClock />
									{nextAppointment.hourFormatted}
								</span>
							</div>
						</NextAppointment>
					)}
					<Session>
						<strong>Manhã</strong>
						{morningAppointments.length === 0 && (
							<p>Sem agendamentos para este período</p>
						)}
						{morningAppointments.map((appointment) => (
							<Appointment key={appointment.id}>
								<span>
									<FiClock />
									{appointment.hourFormatted}
								</span>
								<div>
									<img
										src={appointment.user.avatar_url}
										alt={appointment.user.name}
									/>
									<strong>{appointment.user.name}</strong>
								</div>
							</Appointment>
						))}
					</Session>

					<Session>
						<strong>Tarde</strong>
						{afternoonAppointments.length === 0 && (
							<p>Sem agendamentos para este período</p>
						)}
						{afternoonAppointments.map((appointment) => (
							<Appointment key={appointment.id}>
								<span>
									<FiClock />
									{appointment.hourFormatted}
								</span>
								<div>
									<img
										src={appointment.user.avatar_url}
										alt={appointment.user.name}
									/>
									<strong>{appointment.user.name}</strong>
								</div>
							</Appointment>
						))}
					</Session>
				</Schedule>
				<Calendar>
					<DayPicker
						weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
						fromMonth={new Date()}
						disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
						modifiers={{
							available: { daysOfWeek: [1, 2, 3, 4, 5] },
						}}
						onDayClick={handleDateChange}
						onMonthChange={handleMonthChange}
						selectedDays={selectedDate}
						months={[
							'Janeiro',
							'Fevereiro',
							'Março',
							'Abril',
							'Maio',
							'Junho',
							'Julho',
							'Agosto',
							'Setembro',
							'Outubro',
							'Novembro',
							'Dezembro',
						]}
					/>
				</Calendar>
			</Content>
		</Container>
	);
};

export default Dashboard;
