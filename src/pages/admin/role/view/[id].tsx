import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button, Group } from '@mantine/core';
import { IconArrowBack } from '@tabler/icons-react';
import api from '@/lib/axios';

export async function getServerSideProps(context) {
	const { id } = context.query;
	const role = await fetch(`http://localhost:8000/role/${id}/show-role`).then(res =>
		res.json()
	);

	return { props: { role } };
}

const ShowRole = ({ role }) => {
	const [activities, setActivities] = useState([]);

	useEffect(() => {
		const getActivity = async () => {
			const Activity = await api.get(`/role/show-all-role`);
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
					href="/admin/role/upload"
					variant="outline"
				>
					<IconArrowBack></IconArrowBack>
					Back
				</Button>
			</Group>
			<Group position="right">
				<h2 style={{ marginTop: '-100px', marginBottom: '50px' }}>View Role</h2>
			</Group>
			<Group style={{ marginTop: '-50px' }}>
				<h1>{role.name}</h1>
			</Group>
		</>
	);
};

ShowRole.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default ShowRole;
