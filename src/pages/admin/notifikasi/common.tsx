/* eslint-disable no-mixed-operators */
import React, { useEffect, useMemo, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { AdminLayout } from '@/layouts/AdminLayout';
import { DatePickerInput } from '@mantine/dates';
import { PageContainer } from '@/components/PageContainer';
import {
	ActionIcon,
	Button,
	Checkbox,
	Container,
	Divider,
	Flex,
	Group,
	Input,
	NativeSelect,
	Pagination,
	Select,
	Space,
	Table,
	TextInput,
} from '@mantine/core';
import {
	IconCalendar,
	IconChevronDown,
	IconEdit,
	IconPlus,
	IconPrinter,
	IconScan,
	IconSearch,
	IconTable,
	IconTrash,
} from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import companies from './companies.json';
import { useHover } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import router from 'next/router';
import api from '@/lib/axios';

const SimpleTable: NextPageWithLayout = () => {
	const [elements, setElements] = useState([]);
	const [searchValue, onSearchChange] = useState('');

	const [searchQuery, setSearchQuery] = useState('');
	const [filteredMachines, setFilteredMachines] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [filteredByStatus, setFilteredByStatus] = useState([]);
	const [selectedStatus, setSelectedStatus] = useState([]);

	const handleSearchInputChange = event => {
		const query = event.target.value;
		setSearchQuery(query);
		setIsSearching(query !== '');
		const filtered = elements.filter(element =>
			element.role.name.toLowerCase().includes(query.toLowerCase())
		);
		setFilteredMachines(filtered);
	};

	const filteredItems = useMemo(() => {
		isSearching
			? filteredMachines
			: selectedStatus.length > 0
			? filteredByStatus
			: elements;
	});

	const [value, setValue] = useState<Date | null>(null);

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

	const ths = (
		<tr>
			<th>Contact Name</th>
			<th>Contact Number</th>
			<th>Contact Notification</th>
			<th>Action</th>
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

	return (
		<>
			<Group>
				<h2>Notification WhatsApp</h2>
				<Button
					component="a"
					href="/admin/notifikasi/create"
					left={530}
					rightIcon={<IconPlus />}
				>
					Tambah Baru
				</Button>
			</Group>
			<Space h="xl" />
			<Group>
				<TextInput
					placeholder="Search"
					value={searchQuery}
					onChange={handleSearchInputChange}
					label="Search"
					withAsterisk
					icon={<IconSearch size={18} />}
				/>
				<NativeSelect
					label="Type User"
					style={{ width: '200px' }}
					placeholder="Your favorite library/framework"
					data={['User - Internal', 'Customer']}
					rightSection={<IconTable size="1rem" />}
					rightSectionWidth={40}
				/>
			</Group>
			<Table captionSide="bottom" striped highlightOnHover>
				<thead>{ths}</thead>
				<tbody>
					{elements.slice(startIndex, endIndex + 1).map((element, index) => (
						<tr key={element.key}>
							<td> {element.role.name} </td>
							<td> {element.nip} </td>
							<td> {element.contactNumber} </td>
							<td>
								{' '}
								<Group>
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
