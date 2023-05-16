import React, { useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button, Group, Image, Space, Input, CheckIcon } from '@mantine/core';
import api from '@/lib/axios';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { IconArrowBack } from '@tabler/icons-react';
import { getCookie } from 'cookies-next';

export async function getServerSideProps(context) {
	const { id } = context.query;
	const response = await api.get(`item/${id}/show`, {
		headers: {
			Authorization: getCookie('authorization'),
		},
	});

	const item = response.data;

	return { props: { item } };
}

const ShowItem = ({ item }) => {
	const router = useRouter();

	const [qtyItem, setQtyItem] = useState(item.qty);
	const [partName, setPartName] = useState(item.partName);
	const [partNumber, setPartNumber] = useState(item.partNumber);
	const [picture, setPicture] = useState(item.picture);

	const back = () => {
		router.push('/admin/table/simple');
	};

	return (
		<>
			<Group position="left">
				<Button
					style={{ marginTop: '-15px', marginBottom: '50px' }}
					component="a"
					onClick={() => back()}
					variant="outline"
				>
					<IconArrowBack></IconArrowBack>
					Back
				</Button>
			</Group>
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
					<Input
						required
						variant="filled"
						id="input-demo"
						placeholder="Qty"
						type="number"
						value={qtyItem}
						readOnly
						onChange={e => setQtyItem(e.target.value)}
					/>
				</Input.Wrapper>
				<Input.Wrapper
					id="input-demo"
					withAsterisk
					label="Part Name"
					style={{ marginTop: '-100px', marginLeft: '50px' }}
				>
					<Input
						required
						variant="filled"
						id="input-demo"
						placeholder="Part Name"
						value={partName}
						readOnly
						onChange={e => setPartName(e.target.value)}
					/>
				</Input.Wrapper>
				<Input.Wrapper
					id="input-demo"
					withAsterisk
					label="Part Number"
					style={{ marginTop: '-100px', marginLeft: '50px' }}
				>
					<Input
						required
						variant="filled"
						id="input-demo"
						placeholder="Part Number"
						value={partNumber}
						readOnly
						onChange={e => setPartNumber(e.target.value)}
					/>
				</Input.Wrapper>
			</Group>
			<Space h="xl" />
			<Space h="xl" />
		</>
	);
};

ShowItem.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default ShowItem;
