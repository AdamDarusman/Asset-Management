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
	Badge,
	Stack,
	ActionIcon,
	Table,
	Paper,
} from '@mantine/core';
import { useId } from '@mantine/hooks';
import { IconQrcode } from '@tabler/icons-react';
import api from '@/lib/axios';
import { format } from 'date-fns';

const SimpleTable: NextPageWithLayout = () => {
	const [selectedRadio, setSelectedRadio] = useState('Customer');
	const [code, setCode] = useState('');
	const [label, setLabel] = useState<any>([]);
	const [item, setItem] = useState<any>([]);
	const [scanSuccess, setScanSuccess] = useState(false);
	const [scanFailed, setScanFailed] = useState(false);
	const [storeScanSuccess, setStoreScanSuccess] = useState(false);
	const [showSuccessBadge, setShowSuccessBadge] = useState(false);
	const [showFailedBadge, setShowFailedBadge] = useState(false);

	const currentDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

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

					await api.patch(`label/${label.id}/edit`, {
						scanIn: currentDate,
					});
					setShowSuccessBadge(true);
					setTimeout(() => {
						setShowSuccessBadge(false);
					}, 2000);
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
					if (res.data.scanIn === null) {
						setScanSuccess(true);
						setScanFailed(false);
						setShowFailedBadge(false);
					} else {
						setScanFailed(true);
						setScanSuccess(false);
						setShowFailedBadge(true);
						setTimeout(() => {
							setShowFailedBadge(false);
						}, 2000);
					}
				} catch (error) {
					setScanFailed(true);
					setScanSuccess(false);
					setShowFailedBadge(true);
					setTimeout(() => {
						setShowFailedBadge(false);
					}, 2000);
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
		}, 2000);
	};

	const [scanOutSuccess, setScanOutSuccess] = useState(false);
	const [scanOutFailed, setScanOutFailed] = useState(false);
	const [resCode, setResCode] = useState('');
	const [resNum, setResNum] = useState<any>([]);
	const [codeOut, setCodeOut] = useState('');

	const outScanTime = useRef(null);
	const handleInputChangeScanOut = e => {
		clearTimeout(outScanTime.current);
		outScanTime.current = setTimeout(() => {
			setCodeOut(e.target.value);
		}, 2000);
	};
	const timeoutRefOut = useRef(null);
	const handleInputChangeOut = e => {
		clearTimeout(timeoutRefOut.current);

		timeoutRefOut.current = setTimeout(() => {
			setResCode(e.target.value);
		}, 2000);
	};
	useEffect(() => {
		if (resCode) {
			const getReservasi = async resCode => {
				const res = await api.get(`reservasi/${resCode}`);
				setResNum(res.data);
			};
			getReservasi(resCode);
		}
	});
	useEffect(() => {
		if (resCode) {
			const searchReservasiNumber = async resCode => {
				try {
					const resCodeComp = resCode.replace(/\s/g, '');
					const res = await api.get(`reservasi/${resCodeComp}`);
					// setResNum(res.data);

					if (!(res.data && res.data.length === 0)) {
						setStoreScanSuccess(true);
						setScanOutSuccess(true);
						setScanOutFailed(false);
						setShowFailedBadge(false);
						setShowSuccessBadge(true);
						setTimeout(() => {
							setShowSuccessBadge(false);
						}, 2000);
					} else {
						// setScanOutFailed(true);
						// setScanOutSuccess(false);
						setShowFailedBadge(true);
						setTimeout(() => {
							setShowFailedBadge(false);
						}, 2000);
					}
				} catch (error) {
					// setScanOutFailed(true);
					// setScanOutSuccess(false);
					setShowFailedBadge(true);
					setTimeout(() => {
						setShowFailedBadge(false);
					}, 2000);
				}
			};
			searchReservasiNumber(resCode);
		}
	}, [resCode]);

	useEffect(() => {
		if (codeOut) {
			const searchLabel = async codeOut => {
				try {
					const res = await api.get(`label/${codeOut}`);

					const item = await api.get(
						`item/${res.data.item ? res.data.item.id : ''}/show`
					);

					await api.post(`reservasi/${resCode}/scanOut`, {
						item: parseInt(res.data.item ? res.data.item.id : ''),
						noLabel: codeOut,
					});

					await api.patch(`label/${res.data.id}/edit`, {
						scanOut: currentDate,
					});
					setTimeout(() => {
						setShowSuccessBadge(false);
					}, 2000);
					setItem(item);
					setLabel(res.data);
					setScanOutSuccess(true);
					setScanOutFailed(false);
					setShowFailedBadge(false);
					setShowSuccessBadge(true);
					setTimeout(() => {
						setShowSuccessBadge(false);
					}, 2000);
				} catch (error) {
					// setScanOutFailed(true);
					// setScanOutSuccess(false);
					setShowFailedBadge(true);
					setTimeout(() => {
						setShowFailedBadge(false);
					}, 2000);
				}
			};
			searchLabel(codeOut);
		}
	}, [codeOut]);

	function selectInput() {
		if (selectedRadio === 'Masuk') {
			return (
				<>
					<Group my="20px" style={{ display: 'flex', flexDirection: 'column' }}>
						<Input.Wrapper label="Scan in here" size="15px">
							{showSuccessBadge && (
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
							{showFailedBadge && (
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
								// disabled={storeScanSuccess}
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

			const rows = resNum.map((res, index) => (
				<tr key={res.item}>
					<td>{index + 1}</td>
					<td>{res.item?.partName}</td>
					<td>{res.qtyReservasi}</td>
					<td>{res.qtyScan}</td>
					<td>
						{res.status == 1 ? <span className="failure"></span> : ''}
						{res.status == 2 ? <span className="warn"></span> : ''}
						{res.status == 3 ? <span className="success"></span> : ''}
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

				.warn {
				display: inline-block;
				width: 10px;
				height: 10px;
				border-radius: 50%;
				background-color: yellow;
				margin-right: 5px;
				}

				.status-text {
				display: none;
				}
      `;

			return (
				<>
					<style>{styles}</style>
					<Group my="20px" style={{ display: 'flex', flexDirection: 'column' }}>
						<Input.Wrapper label="Scan out here" size="15px">
							<Input
								placeholder="QR CODE"
								miw="1000px"
								icon={<IconQrcode size="0.8rem" />}
								disabled={storeScanSuccess}
								onChange={handleInputChangeOut}
							/>
						</Input.Wrapper>
					</Group>
					{scanOutSuccess && (
						<>
							<Group style={{ width: '400px', marginTop: '-260px' }}>
								<p>
									Nomor Reservasi:{' '}
									<span
										style={{
											background: '#CCCCCC',
											paddingLeft: '2px',
											paddingRight: '2px',
											borderRadius: '3px',
										}}
									>
										{resNum[0].reservasiNumber}
									</span>
								</p>
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
								<Input.Wrapper label="Scan out here" size="15px">
									{showSuccessBadge && (
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
									{showFailedBadge && (
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
										w="450px"
										icon={<IconQrcode size="0.8rem" />}
										onChange={handleInputChangeScanOut}
									/>
								</Input.Wrapper>
								{scanOutSuccess && (
									<>
										<Stack>
											<p style={{ marginTop: '-10px' }}>Nama Item : {item.partName}</p>
										</Stack>
									</>
								)}
							</Group>
						</>
					)}
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
					{selectedRadio != 'Customer' ? (
						<>
							<Radio value="Masuk" disabled label="Transaksi Masuk" />
							<Radio value="Keluar" disabled label="Transaksi Keluar" />
						</>
					) : (
						<>
							<Radio value="Masuk" label="Transaksi Masuk" />
							<Radio value="Keluar" label="Transaksi Keluar" />
						</>
					)}
				</Group>
			</Radio.Group>
			<Divider size="md" mt="md" />
			<Group>{selectInput()}</Group>
		</>
	);
};

SimpleTable.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default SimpleTable;
