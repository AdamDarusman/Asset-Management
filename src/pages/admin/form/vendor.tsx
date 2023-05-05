import React from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { AdminLayout } from '@/layouts/AdminLayout';
import { PageContainer } from '@/components/PageContainer';
import {
	ActionIcon,
	Button,
	Checkbox,
	Group,
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
		id: string;
		User: string;
		Role: string;
		NIP: string;
		ContactNumber: string;
		missionStatement: string;
	}): void {
		// throw new Error('Function not implemented.');
	}

	function editInfo(company: {
		id: string;
		User: string;
		Role: string;
		NIP: string;
		ContactNumber: string;
		missionStatement: string;
	}): void {
		// throw new Error('Function not implemented.');
	}

	function deleteCompany(company: {
		id: string;
		User: string;
		Role: string;
		NIP: string;
		ContactNumber: string;
		missionStatement: string;
	}): void {
		// throw new Error('Function not implemented.');
	}

	return (
		<>
			<PageContainer title="Table Vendor">
				<Button
					bottom={65}
					component="a"
					href="/admin/form/create"
					left={800}
					rightIcon={<IconPlus />}
				>
					Tambah Baru
				</Button>
				<DataTable
					striped
					highlightOnHover
					columns={[
						{
							accessor: 'id',
							render: render => <Checkbox />,
						},
						{ accessor: 'User' },
						{ accessor: 'Role' },
						{ accessor: 'NIP' },
						{ accessor: 'ContactNumber' },
						{
							accessor: 'actions',
							title: 'Row Actions',
							textAlignment: 'right',
							render: company => (
								<Group spacing={4} position="right">
									<ActionIcon
										component="a"
										href="/admin/form/view"
										color="green"
										onClick={() => showInfo(company)}
									>
										<IconEye size={16} />
									</ActionIcon>
									<ActionIcon color="blue" onClick={() => editInfo(company)}>
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
			</PageContainer>
			<Space h="xl" />
			<Space h="xl" />
			<div style={{ display: 'flex' }}>
				<Select
					maw={200}
					placeholder="Select Number"
					data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
				/>
				<Space w="xl" />
				<Space w="xl" />
				<Space w="xl" />
				<Pagination position="center" total={10} withEdges />
			</div>
		</>
	);
};

SimpleTable.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default SimpleTable;
