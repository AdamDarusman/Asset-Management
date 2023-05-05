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
	TextInput,
	Tooltip,
} from '@mantine/core';
import { IconAt, IconFileText, IconArrowBack } from '@tabler/icons-react';

const SimpleTable: NextPageWithLayout = () => {
	return (
		<>
			<Group position="left">
				<Image
					style={{ marginLeft: '7px' }}
					width={150}
					height={150}
					src={null}
					alt="With default placeholder"
					withPlaceholder
				/>
				<Input.Wrapper
					id="input-demo"
					withAsterisk
					label="BQQ"
					style={{ marginTop: '-100px', marginLeft: '50px' }}
				>
					<Input required variant="filled" id="input-demo" placeholder="Your name" />
				</Input.Wrapper>
				<Input.Wrapper
					id="input-demo"
					withAsterisk
					label="Part Name"
					style={{ marginTop: '-100px', marginLeft: '50px' }}
				>
					<Input required variant="filled" id="input-demo" placeholder="Your name" />
				</Input.Wrapper>
				<Input.Wrapper
					id="input-demo"
					withAsterisk
					label="Part Number"
					style={{ marginTop: '-100px', marginLeft: '50px' }}
				>
					<Input required variant="filled" id="input-demo" placeholder="Your name" />
				</Input.Wrapper>
			</Group>
			<Space h="xl" />
			<Button radius="md">Tambahkan Gambar</Button>
		</>
	);
};

SimpleTable.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default SimpleTable;
