import { Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

const data1 = [
	{ month: 'Jan', sales: 3000 },
	{ month: 'Feb', sales: 6000 },
	{ month: 'Mar', sales: 2000 },
	{ month: 'Apr', sales: 8000 },
	{ month: 'May', sales: 5000 },
	{ month: 'Jun', sales: 1000 },
	{ month: 'Jul', sales: 9000 },
	{ month: 'Aug', sales: 8000 },
	{ month: 'Sep', sales: 3000 },
	{ month: 'Oct', sales: 4000 },
	{ month: 'Nov', sales: 7000 },
	{ month: 'Dec', sales: 12000 },
];

const data2 = [
	{ month: 'Jan', sales: 7000 },
	{ month: 'Feb', sales: 3000 },
	{ month: 'Mar', sales: 5000 },
	{ month: 'Apr', sales: 2000 },
	{ month: 'May', sales: 9000 },
	{ month: 'Jun', sales: 1000 },
	{ month: 'Jul', sales: 3000 },
	{ month: 'Aug', sales: 6000 },
	{ month: 'Sep', sales: 8000 },
	{ month: 'Oct', sales: 4000 },
	{ month: 'Nov', sales: 12000 },
	{ month: 'Dec', sales: 10000 },
];

const MonthChart = () => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div style={{ display: 'flex', marginTop: '60px' }}>
			<div>
				<Typography variant="h6" align="center">
					Stock Report
				</Typography>
				<ResponsiveContainer width={470} height={270}>
					<BarChart data={data1} margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
						<XAxis dataKey="month" />
						<YAxis />
						<CartesianGrid strokeDasharray="3 3" />
						<Tooltip />
						<Bar dataKey="sales" fill="#8884d8" />
					</BarChart>
				</ResponsiveContainer>
				{!mounted && (
					<style jsx global>{`
						.recharts-text.recharts-label {
							font-size: 0 !important;
						}
					`}</style>
				)}
			</div>
			<div>
				<Typography variant="h6" align="center">
					Reservasi Report
				</Typography>
				<ResponsiveContainer width={470} height={270}>
					<BarChart data={data2} margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
						<XAxis dataKey="month" />
						<YAxis />
						<CartesianGrid strokeDasharray="3 3" />
						<Tooltip />
						<Bar dataKey="sales" fill="#82ca9d" />
					</BarChart>
				</ResponsiveContainer>
				{!mounted && (
					<style jsx global>{`
						.recharts-text.recharts-label {
							font-size: 0 !important;
						}
					`}</style>
				)}
			</div>
		</div>
	);
};

export default MonthChart;
