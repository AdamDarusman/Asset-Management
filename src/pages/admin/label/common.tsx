/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { DatePickerInput } from '@mantine/dates';
import { format } from 'date-fns';
import {
	ActionIcon,
	Button,
	Checkbox,
	Container,
	Divider,
	Flex,
	Group,
	Input,
	Pagination,
	Select,
	Space,
	Table,
	TextInput,
} from '@mantine/core';
import {
	IconCalendar,
	IconEdit,
	IconPlus,
	IconPrinter,
	IconScan,
	IconSearch,
	IconTrash,
} from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import companies from './companies.json';
import { useRouter } from 'next/router';
import api from '@/lib/axios';
import { IconEye } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';

const LabelList = () => {
	const [labels, setLabels] = useState([]);

	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedRows, setSelectedRows] = useState<number[]>([]);
	const [selectAll, setSelectAll] = useState(false);

	useEffect(() => {
		const getLabels = async () => {
			const res = await api.get('label/show-all');
			setLabels(res.data);
		};
		getLabels();
	}, []);

	const handleSearchInputChange = event => {
		setSearchQuery(event.target.value);
	};

	const handleSearchClick = () => {
		console.log(`Searching for "${searchQuery}"...`);
	};

	const [value, setValue] = useState<Date | null>(null);

	const ths = (
		<tr>
			<th>
				<Checkbox
					checked={selectAll}
					onChange={e => {
						setSelectAll(e.target.checked);
						setSelectedRows(e.target.checked ? labels.map(label => label.id) : []);
					}}
				/>
			</th>
			<th>No Label</th>
			<th>No Gi</th>
			<th>Nama Material</th>
			<th>Date Created</th>
			<th>Action</th>
		</tr>
	);

	//pagination
	const [activePage, setActivePage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const totalItems = labels.length;
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const startIndex = (activePage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

	useEffect(() => {
		const newTotalPages = Math.ceil(labels.length / itemsPerPage);
		if (newTotalPages !== totalPages) {
			setActivePage(1);
			setTotalPages(newTotalPages);
		}
		if (newTotalPages > 100) {
			setTotalPages(100);
		}
	}, [labels, itemsPerPage, totalPages]);

	const handlePageChange = newPage => {
		setActivePage(newPage);
	};

	const handleItemsPerPageChange = value => {
		setItemsPerPage(parseInt(value));
	};

	const createPg = () => {
		router.push('/admin/label/create');
	};
	const editPg = id => {
		router.push(`/admin/label/edit/${id}`);
	};
	const showPg = id => {
		router.push(`/admin/label/view/${id}`);
	};
	const deleteLabel = async id => {
		try {
			await api.post(`/label/${id}/delete`);
			setLabels(prevLabels => prevLabels.filter(label => label.id !== id));
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
	};
	return (
		<>
			<Group>
				<TextInput
					placeholder="Saerch"
					value={searchQuery}
					onChange={handleSearchInputChange}
					label="Search"
					withAsterisk
					icon={<IconSearch size={18} />}
				/>
				<DatePickerInput
					style={{ width: '200px' }}
					icon={<IconCalendar size="1.1rem" stroke={1.5} />}
					clearable
					label="Pick date"
					placeholder="Pick date"
				/>
				<Button
					component="a"
					bottom={-12}
					onClick={() => createPg()}
					left={360}
					rightIcon={<IconPlus />}
				>
					Tambah Baru
				</Button>
			</Group>
			<Space h="xl" />
			<Divider size="md" />

			<Table captionSide="bottom" striped highlightOnHover>
				<thead>{ths}</thead>
				<tbody>
					{labels.slice(startIndex, endIndex + 1).map((label, index) => (
						<tr key={label.id}>
							<td>
								<Checkbox
									checked={selectedRows.includes(label.id)}
									onChange={e => {
										setSelectedRows(prev =>
											e.target.checked
												? [...prev, label.id]
												: prev.filter(id => id !== label.id)
										);
									}}
								/>
							</td>
							<td> {label.noLabel} </td>
							<td> {label.kodeGi} </td>
							<td> {label.item ? label.item.partName : ''} </td>
							<td> {format(new Date(label.createdAt), 'dd/MM/yyyy')} </td>
							<td>
								{' '}
								<Group>
									<ActionIcon
										color="green"
										onClick={() => console.log('Edit:', label.id)}
									>
										<IconScan size={16} />
									</ActionIcon>
									<ActionIcon component="a" color="blue">
										<IconEye size={16} onClick={() => showPg(label.id)} />
									</ActionIcon>
									<ActionIcon color="yellow" component="a">
										<IconEdit size={16} onClick={() => editPg(label.id)} />
									</ActionIcon>
									<ActionIcon color="red">
										<IconTrash size={16} onClick={() => deleteLabel(label.id)} />
									</ActionIcon>
								</Group>{' '}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
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

LabelList.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default LabelList;
