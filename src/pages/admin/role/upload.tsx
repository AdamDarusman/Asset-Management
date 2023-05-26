/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { AdminLayout } from '@/layouts/AdminLayout';
import { PageContainer } from '@/components/PageContainer';
import {
	ActionIcon,
	Avatar,
	Button,
	Checkbox,
	Group,
	Pagination,
	Select,
	Space,
	Table,
} from '@mantine/core';
import { IconEdit, IconEye, IconPlus, IconScan, IconTrash } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import api from '@/lib/axios';
import router from 'next/router';

const SimpleTable: NextPageWithLayout = () => {
	const [roles, setRole] = useState([]);
	const [showDeleteButton, setShowDeleteButton] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/role/show-all-role', {
					headers: {
						'Cache-Control': 'no-cache',
					},
				});
				// console.log('Response data:', response.data);
				setRole(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	async function deleteUser(id) {
		try {
			await api.post(`/role/${id}/delete-role`);
			setRole(prevroles => prevroles.filter(role => role.id !== id));
			showNotification({
				title: 'Berhasil!',
				message: 'Data berhasil dihapus',
				color: 'green',
			});
		} catch (error) {
			showNotification({
				title: 'Gagal!',
				message: 'Terjadi kesalahan saat menghapus data',
				color: 'red',
			});
		}
	}

	const [selectedRows, setSelectedRows] = useState<number[]>([]);
	const [selectAll, setSelectAll] = useState(false);

	// const [anySelected, setAnySelected] = useState(false);

	useEffect(() => {
		// check if selectedRows is not empty
		if (selectedRows.length > 0) {
			setShowDeleteButton(true);
		} else {
			setShowDeleteButton(false);
		}
	}, [selectedRows]);

	const handleDelete = () => {
		setRole(prevRoles => prevRoles.filter(role => !selectedRows.includes(role.id)));
		setSelectedRows([]);
		setSelectAll(false);
	};

	const ths = (
		<tr>
			<th>
				<Checkbox
					checked={selectAll}
					onChange={e => {
						setSelectAll(e.target.checked);
						setSelectedRows(e.target.checked ? roles.map(role => role.id) : []);
					}}
				/>
			</th>
			<th>Role</th>
			<th>
				{selectAll || selectedRows.length > 0 ? (
					<Button color="red" onClick={deleteUser}>
						Delete
					</Button>
				) : (
					'Action'
				)}
			</th>
		</tr>
	);

	//pagination
	const [activePage, setActivePage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const totalItems = roles.length;
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const startIndex = (activePage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

	useEffect(() => {
		const newTotalPages = Math.ceil(roles.length / itemsPerPage);
		if (newTotalPages !== totalPages) {
			setActivePage(1);
			setTotalPages(newTotalPages);
		}
		if (newTotalPages > 100) {
			setTotalPages(100);
		}
	}, [roles, itemsPerPage, totalPages]);

	const handlePageChange = newPage => {
		setActivePage(newPage);
	};

	const handleItemsPerPageChange = value => {
		setItemsPerPage(parseInt(value));
	};

	const show = id => {
		router.push(`/admin/role/view/${id}`);
	};

	const editPg = id => {
		router.push(`/admin/role/edit/${id}`);
	};

	return (
		<>
			<PageContainer title="Table Role">
				<Button
					bottom={65}
					left={800}
					component="a"
					href="/admin/role/create"
					rightIcon={<IconPlus />}
				>
					Tambah Baru
				</Button>
				<Table captionSide="bottom" striped highlightOnHover>
					<thead>{ths}</thead>
					<tbody>
						{roles.slice(startIndex, endIndex + 1).map((role, index) => (
							<tr key={index}>
								<td>
									<Checkbox
										checked={selectedRows.includes(role.id)}
										onChange={e => {
											setSelectedRows(prev =>
												e.target.checked
													? [...prev, role.id]
													: prev.filter(id => id !== role.id)
											);
										}}
									/>
								</td>
								<td> {role.name} </td>
								<td>
									{' '}
									<Group>
										<ActionIcon
											color="green"
											onClick={() => console.log('Edit:', role.id)}
										>
											<IconScan size={16} />
										</ActionIcon>
										<ActionIcon component="a" color="blue" onClick={() => show(role.id)}>
											<IconEye size={16} />
										</ActionIcon>
										<ActionIcon
											color="yellow"
											component="a"
											onClick={() => editPg(role.id)}
										>
											<IconEdit size={16} />
										</ActionIcon>
										<ActionIcon color="red" onClick={() => deleteUser(role.id)}>
											<IconTrash size={16} />
										</ActionIcon>
									</Group>{' '}
								</td>
								<td></td>
							</tr>
						))}
					</tbody>
				</Table>
			</PageContainer>
			<Space h="xl" />
			<Space h="xl" />
			<div style={{ display: 'flex', marginLeft: '20px' }}>
				<div style={{ display: 'flex' }}>
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
				</div>
			</div>
		</>
	);
};

SimpleTable.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default SimpleTable;
