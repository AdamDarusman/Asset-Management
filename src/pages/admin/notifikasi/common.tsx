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
	IconSearch,
	IconTable,
	IconTrash,
} from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import companies from './companies.json';
import { useHover } from '@mantine/hooks';

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
					placeholder="Saerch"
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
			<DataTable
				striped
				highlightOnHover
				columns={[
					{ accessor: 'NoLabel', title: 'Contact Name' },
					{ accessor: 'DateCreated', title: 'Contact Number' },
					{ accessor: 'NoGl', title: 'Contact Notification' },
					{
						accessor: 'actions',
						title: 'Row Actions',
						render: company => (
							<Group spacing={4}>
								<ActionIcon color="green" onClick={() => printInfo(company)}>
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
