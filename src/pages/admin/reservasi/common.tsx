import React, { useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { AdminLayout } from '@/layouts/AdminLayout';
import { PageContainer } from '@/components/PageContainer';
import {
	ActionIcon,
	Button,
	Checkbox,
	Divider,
	Group,
	Input,
	Pagination,
	Select,
	Space,
	Table,
} from '@mantine/core';
import { IconEdit, IconEye, IconPlus, IconTrash } from '@tabler/icons-react';
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

	return (
		<>
			<h3>BUAT RESERVASI BARU</h3>
			<Space h="xl" />
			<h3>PENAMBAHAN ITEM</h3>
			<Divider size="md" />
			<Group>
				<Select
					label="Pilih Item"
					placeholder="Pick one"
					searchable
					onSearchChange={onSearchChange}
					searchValue={searchValue}
					nothingFound="No options"
					data={['React', 'Angular', 'Svelte', 'Vue']}
					style={{ marginTop: '30px' }}
				/>
				<Space w="xl" />
				<Select
					label="Pilih Mesin"
					placeholder="Pick one"
					searchable
					onSearchChange={onSearchChange}
					searchValue={searchValue}
					nothingFound="No options"
					data={['React', 'Angular', 'Svelte', 'Vue']}
					style={{ marginTop: '30px' }}
				/>
				<Space w="xl" />
				<Input.Wrapper
					id="input-demo"
					withAsterisk
					label="Name"
					style={{ marginTop: '30px' }}
				>
					<Input required variant="filled" id="input-demo" placeholder="Masukan Qty" />
				</Input.Wrapper>
				<Space w="xl" />
				<Button color="green" style={{ marginTop: '52px' }}>
					Add
				</Button>
			</Group>
			<Space h="xl" />
			<h3>DAFTAR ITEM</h3>
			<Divider size="md" />
			<DataTable
				striped
				highlightOnHover
				columns={[
					{
						accessor: 'No',
					},
					{ accessor: 'User' },
					{ accessor: 'Role' },
					{ accessor: 'NIP' },
					{ accessor: 'ContactNumber' },
					{
						accessor: 'actions',
						title: 'Row Actions',
						render: company => (
							<Group spacing={4} style={{ marginLeft: '30px' }}>
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
