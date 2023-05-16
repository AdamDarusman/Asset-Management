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
import { DataTable } from 'mantine-datatable';
import companies from './companies.json';
import api from '@/lib/axios';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';

const ItemList = () => {
	const router = useRouter();
	const [selectedRows, setSelectedRows] = useState<number[]>([]);
	const [selectAll, setSelectAll] = useState(false);

	const [items, setItems] = useState([]);

	useEffect(() => {
		const getItems = async () => {
			const res = await api.get('item/show-all');
			setItems(res.data);
		};
		getItems();
	}, []);

	const ths = (
		<tr>
			<th>
				<Checkbox
					checked={selectAll}
					onChange={e => {
						setSelectAll(e.target.checked);
						setSelectedRows(e.target.checked ? items.map(item => item.id) : []);
					}}
				/>
			</th>
			<th>Daftar Produk</th>
			<th>Action</th>
		</tr>
	);

	//pagination
	const [activePage, setActivePage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const totalItems = items.length;
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const startIndex = (activePage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

	useEffect(() => {
		const newTotalPages = Math.ceil(items.length / itemsPerPage);
		if (newTotalPages !== totalPages) {
			setActivePage(1);
			setTotalPages(newTotalPages);
		}
		if (newTotalPages > 100) {
			setTotalPages(100);
		}
	}, [items, itemsPerPage, totalPages]);

	const handlePageChange = newPage => {
		setActivePage(newPage);
	};

	const handleItemsPerPageChange = value => {
		setItemsPerPage(parseInt(value));
	};

	const createPg = () => {
		router.push('/admin/table/create');
	};

	const editPg = id => {
		router.push(`/admin/table/edit/${id}`);
	};

	const showPg = id => {
		router.push(`/admin/table/view/${id}`);
	};

	async function deleteItem(id) {
		try {
			await api.post(`/item/${id}/delete`);
			setItems(previtems => previtems.filter(item => item.id !== id));
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

	return (
		<>
			<PageContainer title="Table Item">
				<Button
					component="a"
					bottom={65}
					left={800}
					rightIcon={<IconPlus />}
					onClick={() => createPg()}
				>
					Tambah Baru
				</Button>

				<Table captionSide="bottom" striped highlightOnHover>
					<thead>{ths}</thead>
					<tbody>
						{items.slice(startIndex, endIndex + 1).map((item, index) => (
							<tr key={index}>
								<td>
									<Checkbox
										checked={selectedRows.includes(item.id)}
										onChange={e => {
											setSelectedRows(prev =>
												e.target.checked
													? [...prev, item.id]
													: prev.filter(id => id !== item.id)
											);
										}}
									/>
								</td>
								<td>
									<Group style={{ height: '50px' }}>
										<Avatar size={'md'} radius="xl" style={{ marginBottom: '5px' }} />
										<div style={{ marginTop: '-10px' }}>
											<p
												style={{
													fontWeight: 'bold',
													fontSize: '14px',
													marginBottom: '-15px',
												}}
											>
												{item.partName}
											</p>
											<p style={{ fontSize: '12px', color: 'gray' }}>{item.partNumber}</p>
										</div>
									</Group>
								</td>
								<td>
									{' '}
									<Group>
										<ActionIcon
											color="green"
											onClick={() => console.log('Edit:', item.id)}
										>
											<IconScan size={16} />
										</ActionIcon>
										<ActionIcon component="a" color="blue">
											<IconEye size={16} onClick={() => showPg(item.id)} />
										</ActionIcon>
										<ActionIcon color="yellow" component="a">
											<IconEdit size={16} onClick={() => editPg(item.id)} />
										</ActionIcon>
										<ActionIcon color="red">
											<IconTrash size={16} onClick={() => deleteItem(item.id)} />
										</ActionIcon>
									</Group>{' '}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</PageContainer>
			<Space h="xl" />
			<Space h="xl" />
			<div style={{ display: 'flex' }}>
				<Select
					maw={200}
					placeholder="Select Number"
					data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
				/>
				<Space w="xl" />
				<Space w="xl" />
				<Space w="xl" />

				<Pagination
					style={{ marginLeft: '150px' }}
					totalPages={totalPages}
					activePage={activePage}
					onChange={handlePageChange}
					total={totalPages}
				/>
			</div>
		</>
	);
};

ItemList.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default ItemList;
