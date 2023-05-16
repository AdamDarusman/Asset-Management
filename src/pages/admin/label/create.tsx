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
	const itemOptions = items.map(item => ({ value: item.id, label: item.partNumber }));

	useEffect(() => {
		const getItems = async () => {
			const res = await api.get('item/show-all');
			setItems(res.data);
		};
		getItems();
	}, []);

	const handleSubmit = async () => {
		console.log(item);

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
			router.push('/admin/label/common');
		} catch (error) {
			notifications.show({
				title: 'Error',
				message: 'Failed to submit label.',
				color: 'red',
				icon: <IconHomeCancel />,
				autoClose: 5000,
			});
		}
	};

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
				{items && (
					<Select
						style={{ width: '250px' }}
						data={itemOptions}
						label="Pilih Material"
						placeholder="choose an item"
						searchable
						searchValue={searchValue}
						onChange={itemOptions => setItem(itemOptions)}
						onSearchChange={onSearchChange}
						nothingFound="Nothing found"
					/>
				)}
				<Space w="xl" />
				<TextInput
					style={{ width: '250px' }}
					placeholder="Qty"
					label="Masukan Qty Item Diterima"
					withAsterisk
					type="number"
					readOnly
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
