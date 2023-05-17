/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button, Group, Input } from '@mantine/core';
import { IconAt, IconArrowBack } from '@tabler/icons-react';
import api from '@/lib/axios';
import router from 'next/router';

export async function getServerSideProps(context) {
	const { id } = context.query;
	const machine = await fetch(`http://localhost:8000/machine/${id}/show`).then(res =>
		res.json()
	);

	return { props: { machine } };
}

const UpdateMachine = ({ machine }) => {
	const [name, setName] = useState(machine.name);
	const [permissions, setPermissions] = useState([]);
	const [selectedPermissions, setSelectedPermission] = useState([]);

	const [activePage, setActivePage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(20);

	async function handleUpdate(id) {
		await api.patch(`/machine/${id}/edit`, {
			name,
		});
		router.push('/admin/mesin/common');
	}

	const handleCheckboxChange = e => {
		const value = e.target.value;
		const isChecked = e.target.checked;

		if (isChecked) {
			setSelectedPermission([...selectedPermissions, value]);
		} else {
			setSelectedPermission(selectedPermissions.filter(item => item !== value));
		}
	};

	const handleAssignPermission = async machineId => {
		await fetch(`http://localhost:8000/machine/machine-permission/${machineId}`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ permissionIds: selectedPermissions }),
		});
		router.push('/admin/machine/upload');
	};

	const backBtn = () => {
		router.push('/admin/mesin/common');
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
				<h2 style={{ marginTop: '-100px', marginBottom: '50px' }}>Create New machine</h2>
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
				<Button onClick={() => handleUpdate(machine.id)}>Submit</Button>
			</Group>
		</>
	);
};

UpdateMachine.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default UpdateMachine;
