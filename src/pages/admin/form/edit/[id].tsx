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

export async function getServerSideProps(context) {
	const { id } = context.query;
	const user = await fetch(`http://localhost:8000/api/${id}/show`).then(res =>
		res.json()
	);
	return { props: { user } };
}

const UpdateUser = ({ user }) => {
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [selectedRole, setSelectedRole] = useState(user.role ? user.role.id : '');
	const [nip, setNip] = useState(user.nip);
	const [contactNumber, setContactNumber] = useState(user.contactNumber);
	const [picture, setPicture] = useState(user.picture);
	const [password, setPassword] = useState(user.password);

	const router = useRouter();
	const [roles, setRoles] = useState([]);

	const [previewImage, setPreviewImage] = useState(null);

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

	async function handleUpdate(id) {
		const formData = new FormData();
		formData.append('file', picture);
		formData.append('name', name);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('nip', nip);
		formData.append('contactNumber', contactNumber);
		formData.append('roleId', selectedRole);
		await api.patch(`/api/${parseInt(id)}/edit`, formData);
		router.push('/admin/form/common');
	}

	const roleOptions = roles.map(role => ({ value: role.id, label: role.name }));

	const handleRoleChange = e => {
		setSelectedRole(e.value);
	};

	const handlePictureChange = e => {
		const file = e.target.files[0];
		setPicture(file);

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<>
			<Group position="center">
				{previewImage ? (
					<img
						style={{
							width: '150px',
							height: '150px',
							borderRadius: '50%',
							objectFit: 'cover',
						}}
						src={previewImage}
					/>
				) : (
					<img
						style={{
							width: '150px',
							height: '150px',
							borderRadius: '50%',
							objectFit: 'cover',
						}}
						src={`http://localhost:8000/api/pictures/${picture}`}
					/>
				)}
			</Group>
			<Space h="md" />
			<Group position="center">
				<input
					type="file"
					accept="image/*"
					onChange={handlePictureChange}
					id="fileInput"
					style={{ display: 'none' }}
				/>
				<label htmlFor="fileInput">
					<div
						style={{
							background: 'blue',
							padding: '7px',
							borderRadius: '3px',
							cursor: 'pointer',
							color: 'white',
						}}
					>
						Add Picture
					</div>
				</label>
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
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
			</Input.Wrapper>
			<PasswordInput
				placeholder="Password"
				label="Password"
				variant="filled"
				withAsterisk
				onChange={e => {
					if (e.target.value === null || e.target.value === '') {
						setPassword(password);
					} else {
						setPassword(e.target.value);
					}
				}}
			/>
			{roles && (
				<Select
					label="Role"
					variant="filled"
					placeholder="Pick one"
					withAsterisk
					data={roleOptions}
					onChange={roleOptions => setSelectedRole(roleOptions)}
					value={selectedRole}
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
						value={String(contactNumber)}
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
						value={nip}
						onChange={e => setNip(e.target.value)}
					/>
				</Input.Wrapper>
			</Group>
			<Space h="xl" />
			<Group position="right">
				<Button component="a" href="/admin/form/common" variant="outline">
					Back
				</Button>
				<Button onClick={() => handleUpdate(user.id)}>Save</Button>
			</Group>
		</>
	);
};

UpdateUser.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default UpdateUser;
