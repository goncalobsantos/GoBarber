import React, { useEffect } from 'react';
import { Container } from './styles';
import {
	FiAlertCircle,
	FiCheckCircle,
	FiInfo,
	FiXCircle,
} from 'react-icons/fi';
import { useToast, ToastMessage } from '../../../hooks/toast';

interface ToastProps {
	toast: ToastMessage;
	style: object;
}

const icons = {
	info: <FiInfo size={24} />,
	success: <FiCheckCircle size={24} />,
	error: <FiAlertCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ toast, style }) => {
	const { removeToast } = useToast();

	useEffect(() => {
		const timer = setTimeout(() => {
			removeToast(toast.id);
		}, 3000);

		return () => {
			clearTimeout(timer);
		}; //if component is destroyed this return triggers
	}, [removeToast, toast.id]);
	return (
		<Container
			type={toast.type}
			hasDescription={Number(!!toast.description)}
			style={style}
		>
			{icons[toast.type || 'info']}
			<div>
				<strong>{toast.title}</strong>
				{toast.description && <p>{toast.description}</p>}

				<button type="button" onClick={() => removeToast(toast.id)}>
					<FiXCircle size={18} />
				</button>
			</div>
		</Container>
	);
};

export default Toast;
