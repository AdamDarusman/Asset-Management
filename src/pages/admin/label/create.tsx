import React, { useEffect, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { AdminLayout } from '@/layouts/AdminLayout';
import {
	Button,
	Group,
	Image,
	Space,
	Text,
	Input,
	PasswordInput,
	Divider,
	TextInput,
	MultiSelect,
	Select,
	CheckIcon,
	Paper,
} from '@mantine/core';
import api from '@/lib/axios';
import { useRouter } from 'next/router';
import { notifications } from '@mantine/notifications';
import { IconHomeCancel } from '@tabler/icons-react';

const CreateLabel = () => {
	const router = useRouter();
	const [searchValue, onSearchChange] = useState('');

	const [kodeGi, setKodeGi] = useState('');
	const [item, setItem] = useState('');
	const [qty, setQty] = useState('');

	const [items, setItems] = useState([]);
	const itemOptions = items.map(item => ({
		value: item.id,
		label: `${item.partName} || ${item.partNumber}`,
	}));

	const [noLabel, setNoLabel] = useState([]);
	useEffect(() => {
		const getItems = async () => {
			const res = await api.get('item/show-all');
			setItems(res.data);
		};
		getItems();
	}, []);

	useEffect(() => {
		const getNoLabel = async () => {
			const res = await api.get('label/lastLabel');
			setNoLabel(res.data);
		};
		getNoLabel();
	}, []);
	const createQr = () => {
		const url = `/admin/label/qrcode/${noLabel}`;
		window.open(url, '_blank');
	};

	const handleSubmit = async () => {
		try {
			await api.post('label/create', {
				kodeGi,
				item: parseInt(item),
				qty,
			});
			notifications.show({
				title: 'Success',
				message: 'Label created successfully!',
				color: 'teal',
				icon: <CheckIcon />,
				autoClose: 5000,
			});
			createQr();
			router.reload();
			// router.push('/admin/label/common');
		} catch (error) {
			console.log('label', error);

			notifications.show({
				title: 'Error',
				message: 'Duplicate Kode Gi',
				color: 'red',
				icon: <IconHomeCancel />,
				autoClose: 5000,
			});
		}
	};

	const [qtySelectedItem, setQtySelectedItem] = useState<any>([]);
	useEffect(() => {
		if (item) {
			const getItem = async item => {
				const res = await api.get(`item/${item}/show`);
				setQtySelectedItem(res.data);
			};
			getItem(item);
		}
	}, [item]);

	return (
		<>
			<Group>
				<TextInput
					style={{ width: '250px' }}
					placeholder="Kode Gi"
					label="Masukan Kode GI"
					withAsterisk
					onChange={e => setKodeGi(e.target.value)}
				/>
				<Space w="xl" />
				<Paper mt="20px" style={{ display: 'flex', flexDirection: 'column' }}>
					{items && (
						<Select
							mt="5px"
							style={{ width: '250px' }}
							data={itemOptions}
							label="Pilih Item"
							placeholder="choose an item"
							searchable
							searchValue={searchValue}
							onChange={itemOptions => setItem(itemOptions)}
							onSearchChange={onSearchChange}
							nothingFound="Nothing found"
						/>
					)}
					<span>
						<span style={{ color: 'red' }}>* </span>
						{qtySelectedItem.qty}
					</span>
				</Paper>
				<Space w="xl" />
				<TextInput
					style={{ width: '250px' }}
					placeholder="Qty"
					label="Masukan Qty Item Diterima"
					withAsterisk
					type="number"
					onChange={e => setQty(e.target.value)}
				/>
			</Group>
			<Group style={{ marginTop: '400px' }} position="right">
				<Button component="a" href="/admin/label/common" variant="outline">
					Back
				</Button>
				<Button onClick={handleSubmit}>Submit</Button>
			</Group>
		</>
	);
};

CreateLabel.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default CreateLabel;
