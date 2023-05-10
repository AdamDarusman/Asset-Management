import React, { useEffect, useState } from 'react';
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
	Select,
} from '@mantine/core';
import api from '@/lib/axios';
import { useRouter } from 'next/router';
import { IMaskInput } from 'react-imask';

const UpdateUser = ({ users }) => {
	const [name, setName] = useState(users.name);
	const [email, setEmail] = useState(users.email);
	const [selectedRole, setSelectedRole] = useState(users.role);
	const [nip, setNip] = useState(users.nip);
	const [contactNumber, setContactNumber] = useState(users.contactNumber);
	const [picture, setPicture] = useState(users.picture);
	const [password, setPassword] = useState(users.password);

	const router = useRouter();
	const [roles, setRoles] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/role/show-all-role');
				setRoles(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	// async function handleSubmit() {
	// 	await fetch('http://localhost:8000/api/register', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			name,
	// 			email,
	// 			password,
	// 			nip,
	// 			contactNumber,
	// 			picture,
	// 			role: selectedRole,
	// 		}),
	// 	});
	// 	router.push('/admin/form/common');
	// }

	async function handleUpdate(id) {
		await api.patch(`/api/${id}/edit`, {
			name,
			email,
			password,
			nip,
			contactNumber,
			picture,
			roleId: selectedRole,
		});
		router.push('/admin/form/common');
	}

	const roleOptions = roles.map(role => ({ value: role.id, label: role.name }));

	const handleRoleChange = e => {
		setSelectedRole(e.value);
	};

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
				<Input
					onChange={e => setName(e.target.value)}
					value={name}
					variant="filled"
					id="input-demo"
					placeholder="Your name"
				/>
			</Input.Wrapper>
			<Input.Wrapper id="input-demo" withAsterisk label="Email">
				<Input
					variant="filled"
					id="input-demo"
					placeholder="Your email"
					onChange={e => setEmail(e.target.value)}
				/>
			</Input.Wrapper>
			<PasswordInput
				placeholder="Password"
				label="Password"
				variant="filled"
				withAsterisk
				onChange={e => setPassword(e.target.value)}
			/>
			{roles && (
				<Select
					label="Role"
					variant="filled"
					placeholder="Pick one"
					withAsterisk
					data={roleOptions}
					onChange={roleOptions => setSelectedRole(roleOptions)}
					// value={selectedRole}
				/>
			)}

			<Space h="md" />
			<Text fz="sm" fw={500}>
				General identity
			</Text>
			<Divider size="sm" />
			<Space h="md" />
			<Group>
				<Input.Wrapper id="input-demo" withAsterisk label="Contact Number">
					<Input<any>
						required
						variant="filled"
						id="input-demo"
						component={IMaskInput}
						mask="+62 000-0000-0000"
						placeholder="Contact Number"
						onChange={e => setContactNumber(e.target.value)}
					/>
				</Input.Wrapper>
				<Space w="xl" />
				<Input.Wrapper id="input-demo" withAsterisk label="NIP">
					<Input
						required
						variant="filled"
						id="input-demo"
						placeholder="Your NIP"
						onChange={e => setNip(e.target.value)}
					/>
				</Input.Wrapper>
			</Group>
			<Space h="xl" />
			<Group position="right">
				<Button component="a" href="/admin/form/common" variant="outline">
					Back
				</Button>
				<Button onClick={handleUpdate}>Save</Button>
			</Group>
		</>
	);
};

UpdateUser.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default UpdateUser;
