import { AuthLayout } from '@/layouts/AuthLayout';
import { getPath } from '@/lib/constants';
import {
	Anchor,
	Button,
	Checkbox,
	Group,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from './_app';
import { SyntheticEvent, useState } from 'react';
import axios from 'axios';

const SignIn: NextPageWithLayout = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();
		const res = await fetch('http://localhost:8000/auth/login', {
			email,
			password,
		});
		console.log(res);
	}

	return (
		<>
			<Title
				align="center"
				sx={theme => ({
					fontFamily: `Greycliff CF, ${theme.fontFamily}`,
					fontWeight: 900,
				})}
			>
				Matra Login
			</Title>
			<Text color="dimmed" size="sm" align="center" mt={5}>
				Don&apos;t have an account?{' '}
				<Anchor size="sm" href={getPath('SIGN_UP')}>
					Sign Up
				</Anchor>
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<TextInput
					onChange={e => setEmail(e.target.value)}
					label="Email"
					placeholder="test@example.com"
					required
				/>
				<PasswordInput
					onChange={e => setPassword(e.target.value)}
					label="Password"
					placeholder="Your password"
					required
					mt="md"
				/>
				<Group position="apart" mt="md">
					<Checkbox label="Remember me" />
					<Anchor size="sm" href={getPath('FORGOT_PASSWORD')}>
						Forgot Password？
					</Anchor>
				</Group>
				<Button onClick={handleSubmit} fullWidth mt="xl">
					Log In
				</Button>
			</Paper>
		</>
	);
};

SignIn.getLayout = page => <AuthLayout>{page}</AuthLayout>;

export default SignIn;
