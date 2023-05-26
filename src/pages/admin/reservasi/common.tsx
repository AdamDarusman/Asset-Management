/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { AdminLayout } from '@/layouts/AdminLayout';
import {
	ActionIcon,
	Badge,
	Button,
	Checkbox,
	Divider,
	Flex,
	Group,
	Input,
	Modal,
	MultiSelect,
	Pagination,
	Select,
	Space,
	Table,
	TextInput,
} from '@mantine/core';
import {
	IconCalendar,
	IconEdit,
	IconEye,
	IconPlus,
	IconPrinter,
	IconScan,
	IconSearch,
	IconTrash,
} from '@tabler/icons-react';
import router from 'next/router';
import { showNotification } from '@mantine/notifications';
import api from '@/lib/axios';
import { theme } from '@/styles/theme';

const SimpleTable: NextPageWithLayout = () => {
	const [machines, setMachines] = useState([]);
	const [showDeleteButton, setShowDeleteButton] = useState(false);

	const [searchQuery, setSearchQuery] = useState('');
	const [filteredMachines, setFilteredMachines] = useState([]);
	const [isSearching, setIsSearching] = useState(false);

	const [noTransitionOpened, setNoTransitionOpened] = useState(false);

	const [selectedStatus, setSelectedStatus] = useState([]);
	const [filteredByStatus, setFilteredByStatus] = useState([]);

	const handleStatusChange = selectedOptions => {
		setSelectedStatus(selectedOptions);
		const filtered = machines.filter(item => selectedOptions.includes(item.status));
		setFilteredByStatus(filtered);
	};

	const handleSearchInputChange = event => {
		const query = event.target.value;
		setSearchQuery(query);
		setIsSearching(query !== '');
		const filtered = machines.filter(
			item =>
				item.reservasiNumber.toLowerCase().includes(query.toLowerCase()) ||
				item.machine.name.toLowerCase().includes(query.toLowerCase())
		);
		setFilteredMachines(filtered);
	};

	const statusOptions = [
		{ label: 'Progress', value: '2' },
		{ label: 'Requested', value: '1' },
		{ label: 'Full Filled', value: '3' },
	];

	const machinesToDisplay = isSearching
		? filteredMachines
		: selectedStatus.length > 0
		? filteredByStatus
		: machines;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/reservasi/show-all-reservasi', {
					headers: {
						'Cache-Control': 'no-cache',
					},
				});
				setMachines(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	async function deleteUser(id) {
		try {
			await api.post(`/reservasi/${id}/delete`);
			setMachines(prevMachines => prevMachines.filter(machine => machine.id !== id));
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

	useEffect(() => {
		setShowDeleteButton(selectedRows.length > 0);
	}, [selectedRows]);

	const handleDelete = () => {
		setMachines(prevMachines =>
			prevMachines.filter(machine => !selectedRows.includes(machine.id))
		);
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
						setSelectedRows(e.target.checked ? machines.map(machine => machine.id) : []);
					}}
				/>
			</th>
			<th>Reservasi Number</th>
			<th>Nama Material</th>
			<th>Qty</th>
			<th>User Name</th>
			<th>Status</th>
			<th>
				{selectAll || selectedRows.length > 0 ? (
					<Button color="red" onClick={handleDelete}>
						Delete
					</Button>
				) : (
					'Action'
				)}
			</th>
		</tr>
	);

	const thx = (
		<tr>
			<th>Nama Item</th>
			<th>Nama Mesin</th>
			<th>Qty</th>
		</tr>
	);

	//pagination
	const [activePage, setActivePage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const totalmachines = machines.length;
	const [machinesPerPage, setMachinesPerPage] = useState(5);
	const startIndex = (activePage - 1) * machinesPerPage;
	const endIndex = Math.min(startIndex + machinesPerPage - 1, totalmachines - 1);

	useEffect(() => {
		const newTotalPages = Math.ceil(machines.length / machinesPerPage);
		if (newTotalPages !== totalPages) {
			setActivePage(1);
			setTotalPages(newTotalPages);
		}
		if (newTotalPages > 100) {
			setTotalPages(100);
		}
	}, [machines, machinesPerPage, totalPages]);

	const handlePageChange = newPage => {
		setActivePage(newPage);
	};

	const handlemachinesPerPageChange = value => {
		setMachinesPerPage(parseInt(value));
	};

	const show = id => {
		router.push(`/admin/reservasi/view/${id}`);
	};

	const editPg = id => {
		router.push(`/admin/reservasi/edit/${id}`);
	};

	const createPg = () => {
		router.push(`/admin/reservasi/create`);
	};

	useEffect(() => {
		const getItem = async () => {
			const res = await api.post(``);
		};
	});

	return (
		<>
			<Group>
				<TextInput
					placeholder="Search"
					value={searchQuery}
					onChange={handleSearchInputChange}
					label="Search"
					withAsterisk
					icon={<IconSearch size={18} />}
				/>
				<Select
					label="Status"
					searchable
					placeholder="Choose Status"
					nothingFound="Nothing found"
					value={selectedStatus}
					onChange={handleStatusChange}
					data={statusOptions}
				/>

				<Button
					bottom={-13}
					left={400}
					component="a"
					rightIcon={<IconPlus />}
					onClick={createPg}
				>
					Tambah Baru
				</Button>
			</Group>
			<Space h="xl" />
			<Divider size="md" />
			<Table captionSide="bottom" striped highlightOnHover>
				<thead>{ths}</thead>
				<tbody>
					{machinesToDisplay.slice(startIndex, endIndex + 1).map((item, index) => (
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
							<td>{item.reservasiNumber}</td>
							<td>
								<Modal
									opened={noTransitionOpened}
									onClose={() => setNoTransitionOpened(false)}
									overlayProps={{
										opacity: 0.1,
									}}
									transitionProps={{
										transition: 'pop',
										duration: 100,
										timingFunction: 'linear',
									}}
									size="lg"
									centered
								>
									<Table captionSide="bottom" striped highlightOnHover>
										<thead>{thx}</thead>
										<tbody>
											{machinesToDisplay
												.slice(startIndex, endIndex + 1)
												.map((item, index) => (
													<tr key={index}>
														<td>{item.item.partName}</td>
														<td>{item.machine.name}</td>
														<td>{item.qtyReservasi}</td>
													</tr>
												))}
										</tbody>
									</Table>
								</Modal>
								<Button onClick={() => setNoTransitionOpened(true)} color="violet">
									Lihat Material
								</Button>
							</td>
							<td>{item.qtyReservasi}</td>
							<td>{item.machine.name}</td>
							<td>
								{item.status == 1 && (
									<Badge style={{ color: 'red' }}>
										{item.status == 1 && 'REQUESTED'} {item.status == 2 && 'PROGRESS'}{' '}
										{item.status == 3 && 'FULLFILLED'}
									</Badge>
								)}
								{item.status == 2 && (
									<Badge style={{ color: 'blue' }}>
										{item.status == 1 && 'REQUESTED'} {item.status == 2 && 'PROGRESS'}{' '}
										{item.status == 3 && 'FULLFILLED'}
									</Badge>
								)}
								{item.status == 3 && (
									<Badge style={{ color: 'green' }}>
										{item.status == 1 && 'REQUESTED'} {item.status == 2 && 'PROGRESS'}{' '}
										{item.status == 3 && 'FULLFILLED'}
									</Badge>
								)}
							</td>
							<td>
								<Group>
									<ActionIcon color="green" onClick={() => console.log('Edit:', item.id)}>
										<IconScan size={16} />
									</ActionIcon>
									<ActionIcon component="a" color="blue" onClick={() => show(item.id)}>
										<IconEye size={16} />
									</ActionIcon>
									<ActionIcon
										color="yellow"
										component="a"
										onClick={() => editPg(item.id)}
									>
										<IconEdit size={16} />
									</ActionIcon>
									<ActionIcon color="red" onClick={() => deleteUser(item.id)}>
										<IconTrash size={16} />
									</ActionIcon>
								</Group>{' '}
							</td>
							<td></td>
						</tr>
					))}
				</tbody>
			</Table>
			<Space h="xl" />
			<Space h="xl" />
			<div style={{ display: 'flex', marginLeft: '20px' }}>
				<div style={{ display: 'flex' }}>
					<Select
						maw={200}
						placeholder="Select Number"
						data={['5', '10', '20']}
						onChange={handlemachinesPerPageChange}
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
