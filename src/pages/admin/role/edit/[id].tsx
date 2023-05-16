/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/layouts/AdminLayout';
import {
	Button,
	Checkbox,
	Divider,
	Grid,
	Group,
	Input,
	Pagination,
	Select,
	Space,
} from '@mantine/core';
import { IconAt, IconArrowBack } from '@tabler/icons-react';
import api from '@/lib/axios';
import router from 'next/router';

export async function getServerSideProps(context) {
	const { id } = context.query;
	const role = await fetch(`http://localhost:8000/role/${id}/show-role`).then(res =>
		res.json()
	);

	return { props: { role } };
}

const UpdateRole = ({ role }) => {

	const [name, setName] = useState(role.name);
	const [permissions, setPermissions] = useState([]);
	const [selectedPermissions, setSelectedPermission] = useState([]);

	const [activePage, setActivePage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(20);

	useEffect(() => {
		const getDefaultPermission = async () => {
			const permission = await fetch(
				`http://localhost:8000/role/role-permission/${role.id}/show`
			).then(res => res.json());
			setSelectedPermission(permission.map(p => p.id));
		};
		getDefaultPermission();
	}, [role.id]);

	async function handleUpdate(id) {
		await api.patch(`/role/${id}/edit-role`, {
			name,
		});
	}

	useEffect(() => {
		const getPermissions = async () => {
			const res = await api.get('role/show-all-permission');
			setPermissions(res.data);
		};
		getPermissions();
	}, []);

	const handleCheckboxChange = e => {
		const value = e.target.value;
		const isChecked = e.target.checked;

		if (isChecked) {
			setSelectedPermission([...selectedPermissions, value]);
		} else {
			setSelectedPermission(selectedPermissions.filter(item => item !== value));
		}
	};

	const handleAssignPermission = async roleId => {
		await fetch(`http://localhost:8000/role/role-permission/${roleId}`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ permissionIds: selectedPermissions }),
		});
		router.push('/admin/role/upload');
	};

	const backBtn = () => {
		router.push('/admin/role/upload');
	};

	const totalItems = permissions.length;
	const startIndex = (activePage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

	useEffect(() => {
		const newTotalPages = Math.ceil(permissions.length / itemsPerPage);
		if (newTotalPages !== totalPages) {
			setActivePage(1);
			setTotalPages(newTotalPages);
		}
		if (newTotalPages > 100) {
			setTotalPages(100);
		}
	}, [permissions, itemsPerPage, totalPages]);

	const handlePageChange = newPage => {
		setActivePage(newPage);
	};

	const handleItemsPerPageChange = value => {
		setItemsPerPage(parseInt(value));
	};

	return (
		<>
			<Group position="left">
				<Button
					style={{ marginTop: '-15px', marginBottom: '50px' }}
					component="a"
					variant="outline"
					onClick={() => backBtn()}
				>
					<IconArrowBack></IconArrowBack>
					Back
				</Button>
			</Group>
			<Group position="right">
				<h2 style={{ marginTop: '-100px', marginBottom: '50px' }}>Create New Role</h2>
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
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</Input.Wrapper>
			</Group>
			<Group position="right">
				<Button onClick={() => handleUpdate(role.id)}>Submit</Button>
			</Group>
			<Space h="sm" />
			<Divider size="sm" />
			<Group position="right" style={{ marginTop: '30px' }}>
				<Select
					maw={200}
					placeholder="Select Number"
					data={['5', '10', '20']}
					onChange={handleItemsPerPageChange}
				/>
				<Pagination
					style={{ marginLeft: '150px' }}
					totalPages={totalPages}
					activePage={activePage}
					onChange={handlePageChange}
					total={totalPages}
				/>
				<p style={{ fontSize: '13px' }}>
					Showing {startIndex + 1} To {endIndex + 1} of {totalItems} Entries
				</p>
			</Group>
			<Space h="xl" />
			<Grid gutter="xl">
				{permissions.slice(startIndex, endIndex + 1).map(permission => (
					<Grid.Col span={3} key={permission.id}>
						<Checkbox
							style={{ marginRight: '100px' }}
							size="md"
							value={permission.id}
							onChange={handleCheckboxChange}
							label={permission.name}
							checked={selectedPermissions.includes(permission.id)}
						/>
					</Grid.Col>
				))}
				<Button style={{ width: '100%' }} onClick={() => handleAssignPermission(role.id)}>
					Sync Permission
				</Button>
			</Grid>
		</>
	);
};

UpdateRole.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default UpdateRole;
