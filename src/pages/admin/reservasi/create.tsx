/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { AdminLayout } from '@/layouts/AdminLayout';
import {
	ActionIcon,
	Button,
	CheckIcon,
	Checkbox,
	Divider,
	Group,
	Input,
	Pagination,
	Select,
	Space,
	Table,
} from '@mantine/core';
import api from '@/lib/axios';
import { notifications } from '@mantine/notifications';
import router from 'next/router';
import { IconTrash } from '@tabler/icons-react';

const SimpleTable: NextPageWithLayout = () => {
	const [reservasis, setReservasis] = useState([]);
	const [activePage, setActivePage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const totalItems = reservasis.length;
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const startIndex = (activePage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);
	const [selectedItem, setSelectedItem] = useState('');
	const [items, setItems] = useState([]);
	const [selectedMachine, setSelectedMachine] = useState('');
	const [machines, setMachines] = useState([]);
	const [addedItems, setAddedItems] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/item/show-all');
				setItems(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/machine/show-all-machine');
				setMachines(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	const itemOptions = items.map(item => ({
		value: item.id,
		label: item.partName,
	}));
	const machineOptions = machines.map(machine => ({
		value: machine.id,
		label: machine.name,
	}));

	async function handleSubmit() {
		try {
			// Create an array of data objects to be submitted
			const dataToSubmit = addedItems.map(item => ({
				qtyReservasi: parseInt(item.qty),
				item: parseInt(item.item),
				machine: parseInt(item.machine),
			}));

			// Make the API request to submit the data
			await api.post('/reservasi/createMany', dataToSubmit);

			// Clear the added items after successful submission
			setAddedItems([]);

			// Show success notification
			notifications.show({
				title: 'Success',
				message: 'Your registration has been successfully submitted!',
				color: 'teal',
				icon: <CheckIcon />,
				autoClose: 5000,
			});
		} catch (error) {
			console.error(error);
			notifications.show({
				title: 'Error',
				message: 'Failed to submit your registration. Please try again later.',
				color: 'red',
				autoClose: 5000,
			});
		}
		router.push('/admin/reservasi/common');
	}

	const [getAddedItems, setGetAddedItems] = useState([]);
	const [partName, setPartName] = useState('');
	const [machineName, setMachineName] = useState('');
	useEffect(() => {
		if (selectedItem) {
			const nameItem = async id => {
				const res = await api.get(`item/${id}/show`);
				setPartName(res.data.partName);
			};
			nameItem(selectedItem);
		}
	}, [selectedItem]);
	useEffect(() => {
		if (selectedMachine) {
			const nameMachine = async id => {
				const res = await api.get(`machine/${id}/show`);
				setMachineName(res.data.name);
			};
			nameMachine(selectedMachine);
		}
	}, [selectedMachine]);

	const [qtyValue, setQtyValue] = useState('');
	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		if (selectedItem && selectedMachine && qtyValue) {
			setIsFormValid(true);
		} else {
			setIsFormValid(false);
		}
	}, [selectedItem, selectedMachine, qtyValue]);

	async function handleAdd() {
		const newItem = {
			item: selectedItem,
			machine: selectedMachine,
			qty: qtyValue,
		};

		const newItemName = {
			item: partName,
			machine: machineName,
			qty: qtyValue,
		};

		setAddedItems(prevItems => [...prevItems, newItem]);
		setGetAddedItems(prevItems => [...prevItems, newItemName]);
		console.log(newItemName);
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/reservasi/show-all-reservasi', {
					headers: {
						'Cache-Control': 'no-cache',
					},
				});
				setReservasis(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	const ths = (
		<tr>
			<th>No</th>
			<th>Nama Item</th>
			<th>Machine Name</th>
			<th>Qty</th>
			<th>Action</th>
		</tr>
	);
	const [searchValue, onSearchChange] = useState('');

	useEffect(() => {
		const newTotalPages = Math.ceil(reservasis.length / itemsPerPage);
		if (newTotalPages !== totalPages) {
			setActivePage(1);
			setTotalPages(newTotalPages);
		}
		if (newTotalPages > 100) {
			setTotalPages(100);
		}
	}, [reservasis, itemsPerPage, totalPages]);

	const handlePageChange = newPage => {
		setActivePage(newPage);
	};

	const handleItemsPerPageChange = value => {
		setItemsPerPage(parseInt(value));
	};

	return (
		<>
			<h3>BUAT RESERVASI BARU</h3>
			<Space h="xl" />
			<h3>PENAMBAHAN ITEM</h3>
			<Divider size="md" />
			<Group>
				{items && (
					<Select
						label="Pilih Item"
						placeholder="Pick one"
						searchable
						nothingFound="No options"
						data={itemOptions}
						onChange={itemOptions => setSelectedItem(itemOptions)}
						style={{ marginTop: '30px' }}
					/>
				)}
				<Space w="xl" />
				<Select
					label="Pilih Mesin"
					placeholder="Pick one"
					searchable
					nothingFound="No options"
					data={machineOptions}
					onChange={machineOptions => setSelectedMachine(machineOptions)}
					style={{ marginTop: '30px' }}
				/>
				<Space w="xl" />
				<Input.Wrapper
					id="input-demo"
					withAsterisk
					label="Masukan Qty"
					style={{ marginTop: '30px' }}
				>
					<Input
						required
						id="input-demo"
						placeholder="Masukan Qty"
						onChange={e => setQtyValue(e.target.value)}
						value={qtyValue}
					/>
				</Input.Wrapper>
				<Space w="xl" />
				<Button
					color="green"
					style={{ marginTop: '52px' }}
					onClick={handleAdd}
					disabled={!isFormValid}
				>
					Add
				</Button>
			</Group>
			<h3>DAFTAR ITEM</h3>
			<Divider size="md" />
			<Table captionSide="bottom" striped highlightOnHover>
				<thead>{ths}</thead>
				<tbody>
					{addedItems.map((item, index) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{getAddedItems[index].item}</td>
							<td>{getAddedItems[index].machine}</td>
							<td>{getAddedItems[index].qty}</td>
							<td>
								<Button color="red">Delete</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Button onClick={handleSubmit} style={{ marginLeft: '93%', marginTop: '5px' }}>
				Save
			</Button>
		</>
	);
};

SimpleTable.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default SimpleTable;
