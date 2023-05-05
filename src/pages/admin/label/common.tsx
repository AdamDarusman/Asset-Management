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
import {
	IconCalendar,
	IconEdit,
	IconPlus,
	IconPrinter,
	IconSearch,
	IconTrash,
} from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import companies from './companies.json';

const SimpleTable: NextPageWithLayout = () => {
	function printInfo(company: {
		No: string;
		NoLabel: string;
		NoGl: string;
		NamaMaterial: string;
		DateCreated: string;
		missionStatement: string;
	}): void {
		// throw new Error('Function not implemented.');
	}

	function deleteCompany(company: {
		No: string;
		NoLabel: string;
		NoGl: string;
		NamaMaterial: string;
		DateCreated: string;
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
				<DatePickerInput
					style={{ width: '200px' }}
					icon={<IconCalendar size="1.1rem" stroke={1.5} />}
					clearable
					label="Pick date"
					placeholder="Pick date"
				/>
				<Button
					component="a"
					href="/admin/label/create"
					bottom={-12}
					left={360}
					rightIcon={<IconPlus />}
				>
					Tambah Baru
				</Button>
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
					{ accessor: 'NoLabel', title: 'No Label' },
					{ accessor: 'NoGl', title: 'No Gl' },
					{ accessor: 'NamaMaterial', title: 'Nama Material' },
					{ accessor: 'DateCreated', title: 'Date Created' },
					{
						accessor: 'actions',
						title: 'Row Actions',
						render: company => (
							<Group spacing={4} style={{ marginLeft: '30px' }}>
								<ActionIcon
									component="a"
									href="/admin/qrcode/code"
									color="green"
									onClick={() => printInfo(company)}
								>
									<IconPrinter size={16} />
								</ActionIcon>
								<ActionIcon color="red" onClick={() => deleteCompany(company)}>
									<IconTrash size={16} />
								</ActionIcon>
							</Group>
						),
					},
				]}
				records={companies}
			/>
		</>
	);
};

SimpleTable.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default SimpleTable;
