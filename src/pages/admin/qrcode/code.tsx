import React from 'react';
import { useQRCode } from 'next-qrcode';
import { Group, Space } from '@mantine/core';

function App() {
	const { Canvas } = useQRCode();

	return (
		<>
			<Group position="center">
				<Canvas
					text="https://github.com/Bunlong/next-qrcode"
					options={{
						level: 'L',
						margin: 2,
						scale: 5,
						width: 150,
						color: {
							dark: '#000000',
							light: '#ffffff',
						},
					}}
				/>
			</Group>
			<Group position="center">
				<div>
					<div style={{ display: 'flex' }}>
						<p>NAMA ITEM:</p>
						<Space w="xl" />
						<p>NAMA PRODUCT</p>
					</div>
					<Group position="center">
						<div style={{ display: 'flex' }}>
							<p>QTY:</p>
							<Space w="xl" />
							<p>Pcs</p>
						</div>
					</Group>
				</div>
			</Group>
		</>
	);
}

export default App;
