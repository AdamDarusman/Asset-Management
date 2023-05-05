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
	TextInput,
	MultiSelect,
} from '@mantine/core';

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
	const [searchValue, onSearchChange] = useState('');

	return (
		<>
			<Group>
				<TextInput
					style={{ width: '250px' }}
					placeholder="Your name"
					label="Masukan Kode GI"
					withAsterisk
				/>
				<Space w="xl" />
				<MultiSelect
					style={{ width: '250px' }}
					data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
					label="Pilih Material"
					placeholder="Pick all that you like"
					searchable
					searchValue={searchValue}
					onSearchChange={onSearchChange}
					nothingFound="Nothing found"
				/>
				<Space w="xl" />
				<TextInput
					style={{ width: '250px' }}
					placeholder="Your name"
					label="Masukan Qty Item Diterima"
					withAsterisk
				/>
			</Group>
			<Group style={{ marginTop: '400px' }} position="right">
				<Button component="a" href="/admin/label/common" variant="outline">
					Back
				</Button>
				<Button>Submit</Button>
			</Group>
		</>
	);
};

SimpleTable.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default SimpleTable;
