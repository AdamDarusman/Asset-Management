import React from 'react';
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
} from '@mantine/core';
import { IconAt, IconFileText, IconArrowBack } from '@tabler/icons-react';

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
			<Group position="left">
				<Button
					style={{ marginTop: '-15px', marginBottom: '50px' }}
					component="a"
					href="/admin/role/upload"
					variant="outline"
				>
					<IconArrowBack></IconArrowBack>
					Back
				</Button>
			</Group>
			<Group position="right">
				<h2 style={{ marginTop: '-100px', marginBottom: '50px' }}>Create New Role</h2>
			</Group>
			<Group>
				<Input.Wrapper id="input-demo" withAsterisk label="Name">
					<Input
						variant="filled"
						id="input-demo"
						style={{ marginRight: '-350px' }}
						size="md"
						placeholder="Your name"
						icon={<IconAt size="0.8rem" />}
					/>
				</Input.Wrapper>
			</Group>
			<Group position="right">
				<Button>Submit</Button>
			</Group>
		</>
	);
};

SimpleTable.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default SimpleTable;
