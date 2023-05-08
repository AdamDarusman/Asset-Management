import React, { useEffect, useState } from 'react';
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
import { IconEdit, IconEye, IconPlus, IconScan, IconTrash } from '@tabler/icons-react';
import companies from './companies.json';
import api from '@/lib/axios';

const SimpleTable: NextPageWithLayout = () => {
	const [selectedRows, setSelectedRows] = useState<number[]>([]);
	const [selectAll, setSelectAll] = useState(false);

	const [elements, setElements] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/api/show-all-user');
				// console.log('Response data:', response.data);
				setElements(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	const ths = (
		<tr>
			<th>
				<Checkbox
					checked={selectAll}
					onChange={e => {
						setSelectAll(e.target.checked);
						setSelectedRows(e.target.checked ? elements.map(element => element.id) : []);
					}}
				/>
			</th>
			<th>User</th>
			<th>Email</th>
			<th>Role</th>
			<th>NIP</th>
			<th>Contact Number</th>
			<th>Action</th>
		</tr>
	);

	// const rows = elements
	// 	? elements.map(element => (
	// 			<tr key={element.id}>
	// <td>
	// 	<Checkbox
	// 		checked={selectedRows.includes(element.id)}
	// 		onChange={e => {
	// 			setSelectedRows(prev =>
	// 				e.target.checked
	// 					? [...prev, element.id]
	// 					: prev.filter(id => id !== element.id)
	// 			);
	// 		}}
	// 	/>
	// </td>
	// 				<td>{element.name}</td>
	// 				<td>{element.roleId}</td>
	// 				<td>{element.nip}</td>
	// 				<td>{element.contactNumber}</td>
	// 				<td>
	// <Group>
	// 	<ActionIcon color="green" onClick={() => console.log('Edit:', element.id)}>
	// 		<IconScan size={16} />
	// 	</ActionIcon>
	// 	<ActionIcon
	// 		component="a"
	// 		href="/admin/form/view"
	// 		color="blue"
	// 		onClick={() => console.log('Edit:', element.id)}
	// 	>
	// 		<IconEye size={16} />
	// 	</ActionIcon>
	// 	<ActionIcon color="yellow" onClick={() => console.log('Edit:', element.id)}>
	// 		<IconEdit size={16} />
	// 	</ActionIcon>
	// 	<ActionIcon color="red" onClick={() => console.log('Edit:', element.id)}>
	// 		<IconTrash size={16} />
	// 	</ActionIcon>
	// </Group>
	// 				</td>
	// 			</tr>
	// 	  ))
	// 	: null;

	return (
		<>
			<PageContainer title="Table User">
				<Button
					bottom={65}
					component="a"
					href="/admin/form/create"
					left={800}
					rightIcon={<IconPlus />}
				>
					Tambah Baru
				</Button>
				<Table captionSide="bottom" striped highlightOnHover>
					<thead>{ths}</thead>
					<tbody>
						{elements.map((element, index) => (
							<tr key={element.id}>
								<td>
									<Checkbox
										checked={selectedRows.includes(element.id)}
										onChange={e => {
											setSelectedRows(prev =>
												e.target.checked
													? [...prev, element.id]
													: prev.filter(id => id !== element.id)
											);
										}}
									/>
								</td>
								<td> {element.name} </td>
								<td> {element.email} </td>
								<td> {element.role.name} </td>
								<td> {element.nip} </td>
								<td> {element.nip} </td>
								<td>
									{' '}
									<Group>
										<ActionIcon
											color="green"
											onClick={() => console.log('Edit:', element.id)}
										>
											<IconScan size={16} />
										</ActionIcon>
										<ActionIcon
											component="a"
											href="/admin/form/view"
											color="blue"
											onClick={() => console.log('Edit:', element.id)}
										>
											<IconEye size={16} />
										</ActionIcon>
										<ActionIcon
											color="yellow"
											onClick={() => console.log('Edit:', element.id)}
										>
											<IconEdit size={16} />
										</ActionIcon>
										<ActionIcon
											color="red"
											onClick={() => console.log('Edit:', element.id)}
										>
											<IconTrash size={16} />
										</ActionIcon>
									</Group>{' '}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
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
				{companies.length > 0 && <Pagination style={{ margin: 'auto' }} total={1} />}
				{/* <Pagination position="center" total={10} withEdges /> */}
			</div>
		</>
	);
};

SimpleTable.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default SimpleTable;
