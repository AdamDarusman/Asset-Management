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
			<Group position="center">
				<Image maw={120} mx="auto" radius="md" src="/user.png" alt="Random image" />
			</Group>
			<Space h="md" />
			<Group position="center">
				<Button>Add Picture</Button>
			</Group>
			<Input.Wrapper id="input-demo" withAsterisk label="Name">
				<Input variant="filled" id="input-demo" placeholder="Your name" />
			</Input.Wrapper>
			<Input.Wrapper id="input-demo" withAsterisk label="Email">
				<Input variant="filled" id="input-demo" placeholder="Your email" />
			</Input.Wrapper>
			<PasswordInput
				placeholder="Password"
				label="Password"
				variant="filled"
				withAsterisk
			/>
			<Input.Wrapper id="input-demo" withAsterisk label="Roles">
				<Input required variant="filled" id="input-demo" placeholder="Role" />
			</Input.Wrapper>
			<Space h="md" />
			<Text fz="sm" fw={500}>
				General identity
			</Text>
			<Divider size="sm" />
			<Space h="md" />
			<Group>
				<Input.Wrapper id="input-demo" withAsterisk label="Name">
					<Input required variant="filled" id="input-demo" placeholder="Your name" />
				</Input.Wrapper>
				<Space w="xl" />
				<Input.Wrapper id="input-demo" withAsterisk label="Email">
					<Input required variant="filled" id="input-demo" placeholder="Your email" />
				</Input.Wrapper>
			</Group>
			<Space h="xl" />
			<Group position="right">
				<Button component="a" href="/admin/form/common" variant="outline">
					Back
				</Button>
				<Button>Save</Button>
			</Group>
		</>
	);
};

SimpleTable.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default SimpleTable;
