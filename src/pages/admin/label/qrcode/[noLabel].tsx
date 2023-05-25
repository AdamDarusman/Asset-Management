import api from '@/lib/axios';
import { Paper } from '@mantine/core';
import { useRouter } from 'next/router';
import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';

const QrCodePg = () => {
	const router = useRouter();
	const { noLabel } = router.query;

	const [data, setData] = useState<any>([]);
	const [item, setItem] = useState<any>([]);

	useEffect(() => {
		if (noLabel) {
			const getLabel = async noLabel => {
				const res = await api.get(`label/${noLabel}`);
				setData(res.data);
			};
			getLabel(noLabel);
		}
	}, [noLabel]);

	useEffect(() => {
		if (noLabel) {
			const getItem = async data => {
				const res = await api.get(`item/${data.item ? data.item.id : ''}/show`);
				setItem(res.data);
			};
			getItem(data);
		}
	}, [data]);

	return (
		<Paper mx="70px" my="70px" px="50px" py="50px" withBorder display="flex">
			<Paper>
				<QRCode value={`${noLabel}`} size={140} />
				<Paper style={{ marginLeft: '25%' }}>{data.noLabel}</Paper>
			</Paper>
			<Paper style={{ marginLeft: '20px' }}>
				<Paper style={{ fontWeight: 'bold' }}>Digital Label</Paper>
				<Paper>Item: {item.partName}</Paper>
				<Paper>Qty: {item.qty}</Paper>
			</Paper>
		</Paper>
	);
};

export default QrCodePg;
