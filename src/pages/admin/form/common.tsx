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
import api from '@/lib/axios';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';

const UserTable: NextPageWithLayout = () => {
	const [selectedRows, setSelectedRows] = useState<number[]>([]);
	const [selectAll, setSelectAll] = useState(false);

	const [elements, setElements] = useState([]);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/api/show-all-user', {
					headers: {
						'Cache-Control': 'no-cache',
					},
				});
				setElements(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	async function deleteUser(id) {
		try {
			await api.post(`/api/${id}/delete`);
			setElements(prevElements => prevElements.filter(element => element.id !== id));
			showNotification({
				title: 'Berhasil!',
				message: 'Data berhasil dihapus',
				color: 'green',
			});
		} catch (error) {
			showNotification({
				title: 'Gagal!',
				message: 'Terjadi kesalahan saat menghapus data',
			});
		}
	}

	const editPg = id => {
		router.push(`/admin/form/edit/${id}`);
	};

	const show = id => {
		router.push(`/admin/form/view/${id}`);
	};

	const handleDeleteMany = async () => {
		try {
			await api.post('api/deleteMany', selectedRows);
			setElements(prevData =>
				prevData.filter(dataItem => !selectedRows.includes(dataItem))
			);
			showNotification({
				title: 'Berhasil!',
				message: 'Data berhasil dihapus',
				color: 'green',
			});
		} catch (error) {}
	};

	const ths = (
		<tr>
			<th>
				<Checkbox
					checked={selectAll}
					onChange={e => {
						setSelectAll(e.target.checked);
						setSelectedRows(e.target.checked ? elements.map(element => element.id) : []);
					}}
				/>
			</th>
			<th>User</th>
			<th>Role</th>
			<th>NIP</th>
			<th>Contact Number</th>
			{selectedRows.length > 0 || selectAll ? (
				<Button onClick={() => handleDeleteMany()} color="red">
					Delete
				</Button>
			) : (
				<th>Action</th>
			)}
		</tr>
	);

	//pagination
	const [activePage, setActivePage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const totalItems = elements.length;
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const startIndex = (activePage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

	useEffect(() => {
		const newTotalPages = Math.ceil(elements.length / itemsPerPage);
		if (newTotalPages !== totalPages) {
			setActivePage(1);
			setTotalPages(newTotalPages);
		}
		if (newTotalPages > 100) {
			setTotalPages(100);
		}
	}, [elements, itemsPerPage, totalPages]);

	const handlePageChange = newPage => {
		setActivePage(newPage);
	};

	const handleItemsPerPageChange = value => {
		setItemsPerPage(parseInt(value));
	};

	return (
		<>
			<PageContainer title="Table User">
				<Button
					bottom={65}
					component="a"
					href="/admin/form/create"
					left={800}
					rightIcon={<IconPlus />}
				>
					Tambah Baru
				</Button>
				<Table captionSide="bottom" striped highlightOnHover>
					<thead>{ths}</thead>
					<tbody>
						{elements.slice(startIndex, endIndex + 1).map((element, index) => (
							<tr key={element.key}>
								<td>
									<Checkbox
										checked={selectedRows.includes(element.id)}
										onChange={e => {
											setSelectedRows(prev =>
												e.target.checked
													? [...prev, element.id]
													: prev.filter(id => id !== element.id)
											);
										}}
									/>
								</td>
								<td>
									<Group style={{ height: '50px' }}>
										{element.picture ? (
											<Avatar
												size={'md'}
												radius="xl"
												src={`http://localhost:8000/api/pictures/${element.picture}`}
												style={{ marginBottom: '5px' }}
											/>
										) : (
											<Avatar size={'md'} radius="xl" style={{ marginBottom: '5px' }} />
										)}
										<div style={{ marginTop: '-10px' }}>
											<p
												style={{
													fontWeight: 'bold',
													fontSize: '14px',
													marginBottom: '-15px',
												}}
											>
												{element.name}
											</p>
											<p style={{ fontSize: '12px', color: 'gray' }}>{element.email}</p>
										</div>
									</Group>
								</td>
								<td> {element.role.name} </td>
								<td> {element.nip} </td>
								<td> {element.contactNumber} </td>
								<td>
									{' '}
									<Group>
										<ActionIcon
											color="green"
											onClick={() => console.log('Edit:', element.id)}
										>
											<IconScan size={16} />
										</ActionIcon>
										<ActionIcon
											component="a"
											color="blue"
											onClick={() => show(element.id)}
										>
											<IconEye size={16} />
										</ActionIcon>
										<ActionIcon
											color="yellow"
											component="a"
											onClick={() => editPg(element.id)}
										>
											<IconEdit size={16} />
										</ActionIcon>
										<ActionIcon color="red" onClick={() => deleteUser(element.id)}>
											<IconTrash size={16} />
										</ActionIcon>
									</Group>{' '}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</PageContainer>
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

UserTable.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default UserTable;
