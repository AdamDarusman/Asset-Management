import React, { useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { AdminLayout } from '@/layouts/AdminLayout';
import {
	Button,
	Group,
	Image,
	Space,
	Text,
	Input,
	PasswordInput,
	Divider,
	MultiSelect,
	TextInput,
	ActionIcon,
	Select,
} from '@mantine/core';
import {
	IconAt,
	IconFileText,
	IconArrowBack,
	IconFileExport,
	IconPrinter,
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

	return (
		<>
			<Group position="left">
				<Button
					style={{ marginTop: '-15px', marginBottom: '50px' }}
					component="a"
					href="/admin/mesin/common"
					variant="outline"
				>
					<IconArrowBack></IconArrowBack>
					Back
				</Button>
			</Group>
			<Group position="right">
				<h2 style={{ marginTop: '-100px', marginBottom: '50px' }}>Show Machine</h2>
			</Group>
			<Group>
				<TextInput placeholder="Your name" label="Masukan Kode GI" withAsterisk />
				<MultiSelect
					data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
					label="Pilih Material"
					placeholder="Pick all that you like"
					searchable
					searchValue={searchValue}
					onSearchChange={onSearchChange}
					nothingFound="Nothing found"
				/>
				<Button
					style={{ marginTop: '25px', marginLeft: '419px' }}
					leftIcon={<IconFileExport size="1rem" />}
				>
					Export
				</Button>
			</Group>
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
			<Select
				style={{ marginTop: '20px' }}
				maw={200}
				placeholder="Select Number"
				data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
			/>
		</>
	);
};

SimpleTable.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default SimpleTable;
