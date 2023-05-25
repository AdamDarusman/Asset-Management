// import { useRouter } from 'next/router';
// import QRCodeGenerate from './create';
// import QRCode from 'qrcode.react';
// import { Paper } from '@mantine/core';
// import { useEffect, useState } from 'react';
// import api from '@/lib/axios';

// const getServerSideProps = context => {
// 	const { nolabel } = context.query;
// };

// const Home = () => {
// 	const router = useRouter();
// 	const { data } = router.query;

// 	if (data) {
// 		const [item, setData] = useState({});
// 		const parsedData = JSON.parse(data as string);
// 		const id = parseInt(parsedData.item);

// 		useEffect(() => {
// 			const getItem = async id => {
// 				const res = await api.get(`item/${Number(id)}/show`);
// 				setData(res.data);
// 			};
// 			getItem(id);
// 		}, [id]);

// 		console.log(item);
// 		return (
// 			<Paper mx="70px" my="70px" px="50px" py="50px" withBorder display="flex">
// 				<Paper>
// 					<QRCode value={`${parsedData.noLabel}`} size={140} />
// 					<Paper style={{ marginLeft: '25%' }}>{parsedData.noLabel}</Paper>
// 				</Paper>

// 				<Paper style={{ marginLeft: '20px' }}>
// 					<Paper style={{ fontWeight: 'bold' }}>Digital Label</Paper>
// 					<Paper>Item: {item.partName}</Paper>
// 					<Paper>Qty: {item.qty}</Paper>
// 				</Paper>
// 			</Paper>
// 		);
// 	}
// 	return 'loading';
// };

// export default Home;
