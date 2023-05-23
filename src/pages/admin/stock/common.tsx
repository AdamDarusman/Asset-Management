import React, { useEffect, useState } from 'react';
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
	Pagination,
	Select,
	Space,
	Table,
	TextInput,
} from '@mantine/core';
import { IconCalendar, IconSearch, IconTrash } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import companies from './companies.json';
import api from '@/lib/axios';
import { useRouter } from 'next/router';
import { format } from 'date-fns';

const StockItem = () => {
	const [searchValue, onSearchChange] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [items, setItems] = useState([]);

	const handleSearchInputChange = event => {
		setSearchQuery(event.target.value);
	};

	const itemNumberOptions = items.map(item => ({
		value: item.partNumber,
		label: item.partNumber,
	}));

	useEffect(() => {
		const getItems = async () => {
			const res = await api.get('item/show-all');
			setItems(res.data);
		};
		getItems();
	}, []);

	// Filter the items based on the "Item Number" field
	const filteredItems = items.filter(item => item.partName.includes(searchQuery));
	const partNumberFilter = items.filter(item => item.partNumber.includes(searchValue));

	const ths = (
		<tr>
			<th>No</th>
			<th>Item Name</th>
			<th>Item Number</th>
			<th>Qty</th>
			<th>Date</th>
		</tr>
	);

	// Pagination
	const [activePage, setActivePage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const totalItems = filteredItems.length;
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const startIndex = (activePage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

	useEffect(() => {
		const newTotalPages = Math.ceil(filteredItems.length / itemsPerPage);
		if (newTotalPages !== totalPages) {
			setActivePage(1);
			setTotalPages(newTotalPages);
		}
		if (newTotalPages > 100) {
			setTotalPages(100);
		}
	}, [filteredItems, partNumberFilter, itemsPerPage, totalPages]);

	const handlePageChange = newPage => {
		setActivePage(newPage);
	};

	const handleItemsPerPageChange = value => {
		setItemsPerPage(parseInt(value));
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
				<Select
					label="Pilih Item"
					placeholder="Part Number"
					searchable
					withAsterisk
					nothingFound="No options"
					onChange={itemNumberOptions => onSearchChange(itemNumberOptions)}
					data={itemNumberOptions}
				/>
				<DatePickerInput
					style={{ width: '200px' }}
					icon={<IconCalendar size="1rem" />}
					clearable
					label="Start date"
					placeholder="Pick date"
				/>
				<DatePickerInput
					style={{ width: '200px' }}
					icon={<IconCalendar size="1rem" />}
					clearable
					label="End date"
					placeholder="Pick date"
				/>
			</Group>
			<Space h="xl" />
			<Divider size="md" />
			{filteredItems.length > 0 ? (
				<Table captionSide="bottom" striped highlightOnHover>
					<thead>{ths}</thead>
					<tbody>
						{filteredItems.slice(startIndex, endIndex + 1).map((item, index) => (
							<tr key={item.key}>
								<td>{index + startIndex + 1}</td>
								<td>{item.partName}</td>
								<td>{item.partNumber}</td>
								<td>{item.qty}</td>
								<td>{format(new Date(item.createdAt), 'dd/MM/yyyy')}</td>
							</tr>
						))}
					</tbody>
				</Table>
			) : (
				<div>No records found</div>
			)}
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

StockItem.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default StockItem;