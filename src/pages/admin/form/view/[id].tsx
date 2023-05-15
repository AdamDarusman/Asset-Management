import React, { useEffect, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Group, Image, Space, Paper } from '@mantine/core';
import api from '@/lib/axios';

export async function getServerSideProps(context) {
	const { id } = context.query;
	const user = await fetch(`http://localhost:8000/api/${id}/show`).then(res =>
		res.json()
	);
	return { props: { user } };
}

const ShowUser = ({ user }) => {
	const [activities, setActivities] = useState([]);

	useEffect(() => {
		const getActivity = async userId => {
			const Activity = await api.get(`/activity/${userId}/show`);
			const act = Activity.data;
			setActivities(act);
		};
		getActivity(user.id);
	}, [user.id]);

	return (
		<Group style={{ display: 'flex', marginTop: '-50px' }}>
			<Space w="xl" />
			<Space w="xl" />
			<Group>
				<Image maw={120} radius="xl" src="/user.png" alt="Random image" />
				<Paper style={{ width: '100%', marginLeft: '-70px' }}>
					<div style={{ display: 'flex', fontSize: '13px' }}>
						<div>Name: {user.name} </div>
						<Space w="xl" />
						<Space w="xl" />
						<div style={{ marginLeft: '-25px' }}>Email: {user.email} </div>
					</div>
					<div style={{ display: 'flex', fontSize: '13px' }}>
						<div>NIP: {user.nip} </div>
						<Space w="xl" />
						<Space w="xl" />
						<div>Role: {user.role ? user.role.name : ''}</div>
					</div>
					<div style={{ fontSize: '13px' }}>Contact Number: {user.contactNumber} </div>
				</Paper>
			</Group>
			<Space w="xl" />
			<Space w="xl" />
			<Space w="xl" />
			<Group style={{ width: '525px', marginTop: '70px', marginLeft: '-250px' }}>
				<Paper
					style={{
						width: '100%',
						height: '200px',
						border: 'gray 1px solid',
						borderRadius: '10px',
						overflow: 'auto', // menambahkan scrollbar jika konten melebihi batas lebar
					}}
				>
					<div style={{ display: 'flex', marginLeft: '10px' }}>
						<div style={{ fontSize: '13px' }}>Last Activity</div>
					</div>
					<div style={{ marginLeft: '10px', display: '' }}>
						{activities.map((act, index) => (
							<div key={act.id}>
								<div style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
									{index + 1}. {act.user ? act.user.name : '[]'} has {act.description} at{' '}
									{act.createAt}
								</div>
							</div>
						))}
					</div>
				</Paper>
			</Group>
		</Group>
	);
};

ShowUser.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default ShowUser;
