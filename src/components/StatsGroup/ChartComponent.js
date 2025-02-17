import React from 'react';
import BarChart from './BarChart';

const ChartComponent = () => {
	const data = {
		labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
		datasets: [
			{
				label: 'Percentage',
				data: [20, 30, 40, 50, 60],
				backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0'],
			},
		],
	};

	return (
		<div style={{ height: '500px', width: '500px' }}>
			<BarChart data={data} />
		</div>
	);
};

export default ChartComponent;
