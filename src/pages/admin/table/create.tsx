import React, { useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button, Group, Image, Space, Input, CheckIcon } from '@mantine/core';
import api from '@/lib/axios';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { IconArrowBack } from '@tabler/icons-react';

const CreateItem = () => {
	const router = useRouter();

	const [qtyItem, setQtyItem] = useState('');
	const [partName, setPartName] = useState('');
	const [partNumber, setPartNumber] = useState('');
	const [picture, setPicture] = useState('');

	const handleSubmit = async () => {
		try {
			await api.post('item/create', {
				qty: qtyItem,
				partName,
				partNumber,
				picture,
			});
			notifications.show({
				title: 'Success',
				message: 'Your registration has been successfully submitted!',
				color: 'teal',
				icon: <CheckIcon />,
				autoClose: 5000,
			});
			router.push('/admin/table/simple');
		} catch (error) {
			notifications.show({
				title: 'Error',
				message: 'Failed to submit your registration. Please try again later.',
				color: 'red',
				// icon: <CloseIcon />,
				autoClose: 5000,
			});
		}
	};

	const back = () => {
		router.push('/admin/table/simple');
	};

	return (
		<>
			<Group position="left">
				<Button
					style={{ marginTop: '-15px', marginBottom: '50px' }}
					component="a"
					onClick={() => back()}
					variant="outline"
				>
					<IconArrowBack></IconArrowBack>
					Back
				</Button>
			</Group>
			<Group position="left">
				<Image
					style={{ marginLeft: '7px' }}
					width={150}
					height={150}
					src={null}
					alt="With default placeholder"
					withPlaceholder
				/>
				<Input.Wrapper
					id="input-demo"
					withAsterisk
					label="BQQ"
					style={{ marginTop: '-100px', marginLeft: '50px' }}
				>
					<Input
						required
						variant="filled"
						id="input-demo"
						placeholder="Qty"
						type="number"
						onChange={e => setQtyItem(e.target.value)}
					/>
				</Input.Wrapper>
				<Input.Wrapper
					id="input-demo"
					withAsterisk
					label="Part Name"
					style={{ marginTop: '-100px', marginLeft: '50px' }}
				>
					<Input
						required
						variant="filled"
						id="input-demo"
						placeholder="Part Name"
						onChange={e => setPartName(e.target.value)}
					/>
				</Input.Wrapper>
				<Input.Wrapper
					id="input-demo"
					withAsterisk
					label="Part Number"
					style={{ marginTop: '-100px', marginLeft: '50px' }}
				>
					<Input
						required
						variant="filled"
						id="input-demo"
						placeholder="Part Number"
						onChange={e => setPartNumber(e.target.value)}
					/>
				</Input.Wrapper>
			</Group>
			<Space h="xl" />
			<Button radius="md">Tambahkan Gambar</Button>
			<Space h="xl" />
			<Button style={{ float: 'right' }} onClick={handleSubmit}>
				Submit
			</Button>
		</>
	);
};

CreateItem.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default CreateItem;
