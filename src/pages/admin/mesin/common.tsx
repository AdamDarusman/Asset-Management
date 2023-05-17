/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { AdminLayout } from '@/layouts/AdminLayout';
import {
	ActionIcon,
	Button,
	Checkbox,
	Divider,
	Flex,
	Group,
	Input,
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

const SimpleTable: NextPageWithLayout = () => {
	const [machines, setMachines] = useState([]);
	const [showDeleteButton, setShowDeleteButton] = useState(false);

	const [searchQuery, setSearchQuery] = useState('');
	const [filteredMachines, setFilteredMachines] = useState([]);
	const [isSearching, setIsSearching] = useState(false);

	const handleSearchInputChange = event => {
		const query = event.target.value;
		setSearchQuery(query);
		setIsSearching(query !== ''); // Mengatur status isSearching berdasarkan apakah query kosong atau tidak
		const filtered = machines.filter(item =>
			item.name.toLowerCase().includes(query.toLowerCase())
		);
		setFilteredMachines(filtered);
	};

	const machinesToDisplay = isSearching ? filteredMachines : machines;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/machine/show-all-machine', {
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
			await api.post(`/machine/${id}/delete`);
			setMachines(prevmachines => prevmachines.filter(machine => machine.id !== id));
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
		if (selectedRows.length > 0) {
			setShowDeleteButton(true);
		} else {
			setShowDeleteButton(false);
		}
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
			<th>Nama</th>
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
		router.push(`/admin/mesin/view/${id}`);
	};

	const editPg = id => {
		router.push(`/admin/mesin/edit/${id}`);
	};

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
				<MultiSelect
					data={['React', 'Blitz.js']}
					label="Pilih Material"
					placeholder="Pick all that you like"
					// searchable
					// searchValue={searchValue}
					// onSearchChange={onSearchChange}
					nothingFound="Nothing found"
				/>
				<Button
					bottom={-13}
					left={400}
					component="a"
					href="/admin/mesin/create"
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
							<td> {item.name} </td>
							<td>
								{' '}
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
