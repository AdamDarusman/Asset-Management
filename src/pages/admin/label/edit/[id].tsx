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

export async function getServerSideProps(context) {
	const { id } = context.query;
	const label = await api.get(`label/${parseInt(id)}/show`);

	return { props: { label: label.data } };
}

const EditLabel = ({ label }) => {
	const router = useRouter();
	const [searchValue, onSearchChange] = useState('');

	const [kodeGi, setKodeGi] = useState(label.kodeGi);
	const [item, setItem] = useState(label.item ? label.item.id : '');
	const [qty, setQty] = useState(label.item.id);

	const [items, setItems] = useState([]);
	const itemOptions = items.map(item => ({ value: item.id, label: item.partNumber }));

	useEffect(() => {
		const getItems = async () => {
			const res = await api.get('item/show-all');
			setItems(res.data);
		};
		getItems();
	}, []);

	const handleUpdate = async labelId => {
		console.log(item);

		try {
			await api.patch(`label/${parseInt(labelId)}/edit`, {
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
					value={kodeGi}
				/>
				<Space w="xl" />
				{items && (
					<Select
						style={{ width: '250px' }}
						// data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
						data={itemOptions}
						label="Pilih Material"
						placeholder="choose an item"
						searchable
						searchValue={searchValue}
						onChange={itemOptions => setItem(itemOptions)}
						value={item}
						onSearchChange={onSearchChange}
						nothingFound="Nothing found"
					/>
				)}
				<Space w="xl" />
				<TextInput
					style={{ width: '250px' }}
					placeholder="Your name"
					label="Masukan Qty Item Diterima"
					withAsterisk
					type="number"
					onChange={e => setQty(e.target.value)}
					value={qty}
				/>
			</Group>
			<Group style={{ marginTop: '400px' }} position="right">
				<Button component="a" href="/admin/label/common" variant="outline">
					Back
				</Button>
				<Button onClick={() => handleUpdate(label.id)}>Submit</Button>
			</Group>
		</>
	);
};

EditLabel.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default EditLabel;
