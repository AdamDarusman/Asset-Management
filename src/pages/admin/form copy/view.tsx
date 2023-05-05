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
	Paper,
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
		<div>
			<Group style={{ display: 'flex' }}>
				<Space w="xl" />
				<Space w="xl" />
				<div>
					<Image maw={120} radius="xl" src="/user.png" alt="Random image" />
					<div style={{ float: 'left' }}>
						<table style={{ width: '100%' }}>
							<tr>
								<td>Name: </td>
								<td>Email:</td>
							</tr>
							<tr>
								<td>NIP:</td>
								<td>Role:</td>
							</tr>
							<tr>
								<td>Contact Number:</td>
							</tr>
						</table>
					</div>
				</div>
				<Space w="xl" />
				<Space w="xl" />
				<Space w="xl" />
				<Group style={{ width: '500px', marginTop: '-50px' }}>
					<table
						style={{ width: '100%', border: 'gray 1px solid', borderRadius: '10px' }}
					>
						<tr>
							<td>Last Activity </td>
						</tr>
						<tr>
							<td>Peter</td>
							<td>Griffin</td>
						</tr>
						<tr>
							<td>Lois</td>
							<td>Griffin</td>
						</tr>
						<tr>
							<td>Lois</td>
							<td>Griffin</td>
						</tr>
						<tr>
							<td>Lois</td>
							<td>Griffin</td>
						</tr>
					</table>
				</Group>
			</Group>
		</div>
	);
};

SimpleTable.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default SimpleTable;
