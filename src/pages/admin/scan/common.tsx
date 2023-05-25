import React, { useEffect, useRef, useState } from 'react';
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
	Radio,
	Select,
	Checkbox,
	Badge,
	Stack,
	ActionIcon,
	Table,
	Paper,
} from '@mantine/core';
import { useId } from '@mantine/hooks';
import { IconQrcode } from '@tabler/icons-react';
import api from '@/lib/axios';

const SimpleTable: NextPageWithLayout = () => {
	const [selectedRadio, setSelectedRadio] = useState('Customer');
	const [code, setCode] = useState('');
	const [label, setLabel] = useState<any>([]);
	const [item, setItem] = useState<any>([]);
	const [scanSuccess, setScanSuccess] = useState(false);
	const [scanFailed, setScanFailed] = useState(false);
	const [storeScanSuccess, setStoreScanSuccess] = useState(false);

	useEffect(() => {
		if (scanSuccess) {
			const getItem = async label => {
				const res = await api.get(
					`item/${label.item ? parseInt(label.item.id) : ''}/show`
				);
				setItem(res.data);
				try {
					await api.post('store-product/create', {
						item: parseInt(res.data.id),
						store: 1,
					});
					setStoreScanSuccess(true);
					console.log(label.id);

					await api.patch(`label/${label.id}/edit`, {
						isScanned: '1',
					});
				} catch (error) {}
			};
			getItem(label);
		}
	}, [scanSuccess]);

	useEffect(() => {
		if (code) {
			const searchLabel = async code => {
				try {
					const res = await api.get(`label/${code}`);
					setLabel(res.data);
					if (res.data.isScanned === 0) {
						setScanSuccess(true);
						setScanFailed(false);
					} else {
						setScanFailed(true);
						setScanSuccess(false);
					}
				} catch (error) {
					// return 'Failed to scan label';
				}
			};
			searchLabel(code);
		}
	}, [code]);

	const timeoutRef = useRef(null);
	const handleInputChange = e => {
		clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			setCode(e.target.value);
		}, 2500);
	};

	function selectInput() {
		if (selectedRadio === 'Masuk') {
			return (
				<>
					<Group my="20px" style={{ display: 'flex', flexDirection: 'column' }}>
						<Input.Wrapper label="Scan your code here" size="15px">
							{scanSuccess && (
								<Badge
									color="green"
									size="xl"
									radius="md"
									variant="filled"
									mx="10px"
									my="sm"
								>
									Berhasil
								</Badge>
							)}
							{scanFailed && (
								<Badge
									color="red"
									size="xl"
									radius="md"
									variant="filled"
									mx="10px"
									my="sm"
								>
									Failed
								</Badge>
							)}
							<Input
								placeholder="QR CODE"
								miw="1000px"
								icon={<IconQrcode size="0.8rem" />}
								disabled={storeScanSuccess}
								onChange={handleInputChange}
							/>
						</Input.Wrapper>
					</Group>
					{scanSuccess && (
						<Stack>
							<p style={{ marginTop: '-5px' }}>Nama Item : {item.partName}</p>
							<p style={{ marginTop: '-30px' }}>No GI : {label.kodeGi}</p>
							{/* <p style={{ marginTop: '-30px' }}>Lokasi Rak :</p> */}
						</Stack>
					)}
				</>
			);
		} else if (selectedRadio === 'Keluar') {
			const ths = (
				<tr>
					<th style={{ fontSize: '12px' }}>No</th>
					<th style={{ fontSize: '12px' }}>Nama Item</th>
					<th style={{ fontSize: '12px' }}>Qty Reserved</th>
					<th style={{ fontSize: '12px' }}>Progress Qty</th>
					<th style={{ fontSize: '12px' }}>Status</th>
				</tr>
			);

			const elements = [
				{
					no: 1,
					item: 'nama item',
					qty: 'qty reservasi',
					progress: 'qty his scanned',
					status: 'gagal',
				},
				{
					no: 2,
					item: 'nama item',
					qty: 'qty reservasi',
					progress: 'qty his scanned',
					status: 'berhasil',
				},
			];

			const rows = elements.map(element => (
				<tr key={element.progress}>
					<td>{element.no}</td>
					<td>{element.item}</td>
					<td>{element.progress}</td>
					<td>{element.qty}</td>
					<td>
						<span
							className={element.status === 'berhasil' ? 'success' : 'failure'}
						></span>
					</td>
				</tr>
			));

			const styles = `
			.success {
				display: inline-block;
				width: 10px;
				height: 10px;
				border-radius: 50%;
				background-color: green;
				margin-right: 5px;
			}

			.failure {
				display: inline-block;
				width: 10px;
				height: 10px;
				border-radius: 50%;
				background-color: red;
				margin-right: 5px;
			}

			.status-text {
				display: none;
			}
`;

			return (
				<>
					<style>{styles}</style>
					<Group style={{ width: '400px', marginTop: '-160px' }}>
						<p>Reservasi Baru:</p>
						<p>[reservasi baru]</p>
						<Table
							style={{ marginTop: '-30px', width: '1000px' }}
							captionSide="bottom"
							fontSize="xs"
							highlightOnHover
						>
							<thead>{ths}</thead>
							<tbody>{rows}</tbody>
						</Table>
					</Group>
					<Divider
						h="393px"
						size="md"
						orientation="vertical"
						style={{ marginLeft: '100px' }}
					/>
					<Group style={{ marginTop: '-250px', width: '390px' }}>
						<p style={{ fontSize: '15px' }}>Scan Your QR CODE Here</p>
						<Badge
							color="green"
							size="lg"
							radius="md"
							variant="filled"
							style={{ width: '200px' }}
						>
							Transaksi Berhasil
						</Badge>
						<Badge
							color="gray"
							size="lg"
							radius="md"
							variant="filled"
							style={{ width: '100%', marginTop: '-20px' }}
						>
							<p style={{ marginRight: '1000px', color: 'black', fontSize: '15px' }}>
								QR CODE
							</p>
						</Badge>
						<Stack>
							<p style={{ marginTop: '-10px' }}>Nama Item :</p>
							<p style={{ marginTop: '-30px' }}>Lokasi Rak :</p>
						</Stack>
					</Group>
				</>
			);
		}
	}

	return (
		<>
			<h2>Pilih Jenis Transaksi</h2>
			<Radio.Group value={selectedRadio} onChange={value => setSelectedRadio(value)}>
				<Space />
				<Group>
					<Radio value="Masuk" label="Transaksi Masuk" />
					<Radio value="Keluar" label="Transaksi Keluar" />
				</Group>
			</Radio.Group>
			<Divider size="md" mt="md" />
			<Group>{selectInput()}</Group>
		</>
	);
};

SimpleTable.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default SimpleTable;
