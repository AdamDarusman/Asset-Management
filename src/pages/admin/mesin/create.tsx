import React, { useEffect, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button, CheckIcon, Group, Input } from '@mantine/core';
import { IconAt, IconFileText, IconArrowBack } from '@tabler/icons-react';
import api from '@/lib/axios';
import { notifications } from '@mantine/notifications';
import router from 'next/router';

const SimpleTable: NextPageWithLayout = () => {
	const [name, setName] = useState('');

	async function handleSubmit() {
		try {
			await api.post('/machine/create', {
				name,
			});
			notifications.show({
				title: 'Success',
				message: 'Your registration has been successfully submitted!',
				color: 'teal',
				icon: <CheckIcon />,
				autoClose: 5000,
			});
			router.push('/admin/mesin/common');
		} catch (error) {
			console.error(error);
			notifications.show({
				title: 'Error',
				message: 'Failed to submit your registration. Please try again later.',
				color: 'red',
				// icon: <CloseIcon />,
				autoClose: 5000,
			});
		}
	}

	return (
		<>
			<Group position="left">
				<Button
					style={{ marginTop: '-15px', marginBottom: '50px' }}
					component="a"
					href="/admin/mesin/upload"
					variant="outline"
				>
					<IconArrowBack></IconArrowBack>
					Back
				</Button>
			</Group>
			<Group position="right">
				<h2 style={{ marginTop: '-100px', marginBottom: '50px' }}>Create New Machine</h2>
			</Group>
			<Group>
				<Input.Wrapper id="input-demo" withAsterisk label="Name">
					<Input
						variant="filled"
						id="input-demo"
						style={{ marginRight: '-350px' }}
						size="md"
						placeholder="Your name"
						icon={<IconAt size="0.8rem" />}
						onChange={e => setName(e.target.value)}
					/>
				</Input.Wrapper>
			</Group>
			<Group position="right">
				<Button onClick={handleSubmit}>Submit</Button>
			</Group>
		</>
	);
};

SimpleTable.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default SimpleTable;
