import React from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { AdminLayout } from '@/layouts/AdminLayout';
import { PageContainer } from '@/components/PageContainer';
import {
	ActionIcon,
	Avatar,
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
		DaftarProduk: string;
		NIP: string;
		ContactNumber: string;
		missionStatement: string;
	}): void {
		// throw new Error('Function not implemented.');
	}

	function editInfo(company: {
		id: string;
		User: string;
		DaftarProduk: string;
		NIP: string;
		ContactNumber: string;
		missionStatement: string;
	}): void {
		// throw new Error('Function not implemented.');
	}

	function deleteCompany(company: {
		id: string;
		User: string;
		DaftarProduk: string;
		NIP: string;
		ContactNumber: string;
		missionStatement: string;
	}): void {
		// throw new Error('Function not implemented.');
	}

	return (
		<>
			<PageContainer title="Table Role">
				<Button
					component="a"
					href="/admin/table/create"
					bottom={65}
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
						{
							accessor: 'DaftarProduk',
							render: render => (
								<Group spacing="lg">
									<Avatar size={'lg'} radius="xl" />
									<div>
										<p>adam</p>
										<p>adam1</p>
									</div>
								</Group>
							),
						},
						{
							accessor: 'actions',
							title: 'Row Actions',
							textAlignment: 'right',
							render: company => (
								<Group spacing={4} position="right">
									<ActionIcon color="green" onClick={() => showInfo(company)}>
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
