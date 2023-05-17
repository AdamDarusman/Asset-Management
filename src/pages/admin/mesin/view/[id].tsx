import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button, Group } from '@mantine/core';
import { IconArrowBack } from '@tabler/icons-react';
import api from '@/lib/axios';

export async function getServerSideProps(context) {
	const { id } = context.query;
	const machine = await fetch(`http://localhost:8000/machine/${id}/show`).then(res =>
		res.json()
	);

	return { props: { machine } };
}

const ShowMachine = ({ machine }) => {
	const [activities, setActivities] = useState([]);

	useEffect(() => {
		const getActivity = async () => {
			const Activity = await api.get(`/machine/show-all-machine`);
			const act = Activity.data;
			setActivities(act);
		};
		getActivity();
	}, []);

	return (
		<>
			<Group position="left">
				<Button
					style={{ marginTop: '-15px', marginBottom: '50px' }}
					component="a"
					href="/admin/mesin/common"
					variant="outline"
				>
					<IconArrowBack></IconArrowBack>
					Back
				</Button>
			</Group>
			<Group position="right">
				<h2 style={{ marginTop: '-100px', marginBottom: '50px' }}>View machine</h2>
			</Group>
			<Group style={{ marginTop: '-50px' }}>
				<h1>{machine.name}</h1>
			</Group>
		</>
	);
};

ShowMachine.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default ShowMachine;
