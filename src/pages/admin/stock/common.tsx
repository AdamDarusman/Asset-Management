import React, { useState } from 'react';
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

const SimpleTable: NextPageWithLayout = () => {
	function showInfo(company: {
		No: string;
		User: string;
		Role: string;
		NIP: string;
		ContactNumber: string;
		missionStatement: string;
	}): void {
		// throw new Error('Function not implemented.');
	}

	function editInfo(company: {
		No: string;
		User: string;
		Role: string;
		NIP: string;
		ContactNumber: string;
		missionStatement: string;
	}): void {
		// throw new Error('Function not implemented.');
	}

	function deleteCompany(company: {
		No: string;
		User: string;
		Role: string;
		NIP: string;
		ContactNumber: string;
		missionStatement: string;
	}): void {
		// throw new Error('Function not implemented.');
	}
	const [searchValue, onSearchChange] = useState('');

	const [searchQuery, setSearchQuery] = useState('');

	const handleSearchInputChange = event => {
		setSearchQuery(event.target.value);
	};

	const handleSearchClick = () => {
		console.log(`Searching for "${searchQuery}"...`);
	};

	const [value, setValue] = useState<Date | null>(null);

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
				<Select
					label="Pilih Item"
					placeholder="Pick one"
					searchable
					onSearchChange={onSearchChange}
					searchValue={searchValue}
					nothingFound="No options"
					data={['React', 'Angular', 'Svelte', 'Vue']}
				/>
				{/* <Space w="xl" /> */}
				<Select
					label="Pilih Mesin"
					placeholder="Pick one"
					searchable
					onSearchChange={onSearchChange}
					searchValue={searchValue}
					nothingFound="No options"
					data={['React', 'Angular', 'Svelte', 'Vue']}
				/>
				<DatePickerInput
					style={{ width: '200px' }}
					icon={<IconCalendar size="1rem" />}
					clearable
					label="Pick date"
					placeholder="Pick date"
				/>
				{/* <Space w="xl" /> */}
			</Group>
			<Space h="xl" />
			<Divider size="md" />
			<DataTable
				striped
				highlightOnHover
				columns={[
					{
						accessor: 'No',
					},
					{ accessor: 'User', title: 'Item Name' },
					{ accessor: 'Role', title: 'Item Number' },
					{ accessor: 'NIP', title: 'Qty' },
					{ accessor: 'ContactNumber', title: 'Date' },
				]}
				records={companies}
			/>
		</>
	);
};

SimpleTable.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default SimpleTable;
