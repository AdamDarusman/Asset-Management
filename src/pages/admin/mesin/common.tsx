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
				<MultiSelect
					data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
					label="Pilih Material"
					placeholder="Pick all that you like"
					searchable
					searchValue={searchValue}
					onSearchChange={onSearchChange}
					nothingFound="Nothing found"
				/>
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
					{
						accessor: 'actions',
						title: 'Row Actions',
						render: company => (
							<Group spacing={4} style={{ marginLeft: '30px' }}>
								<ActionIcon color="green" onClick={() => printInfo(company)}>
									<IconScan size={16} />
								</ActionIcon>
								<ActionIcon
									component="a"
									href="/admin/mesin/view"
									color="blue"
									onClick={() => printInfo(company)}
								>
									<IconEye size={16} />
								</ActionIcon>
								<ActionIcon
									component="a"
									href="/admin/mesin/edit"
									color="yellow"
									onClick={() => printInfo(company)}
								>
									<IconEdit size={16} />
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
