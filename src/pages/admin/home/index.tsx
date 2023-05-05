import { PageContainer } from '@/components/PageContainer';
import { StatsGroup } from '@/components/StatsGroup';
import { mockData } from '@/components/StatsGroup/mock';
import { AdminLayout } from '@/layouts/AdminLayout';
import { NextPageWithLayout } from '@/pages/_app';
// import LineChart from '../../../components/StatsGroup/BarChart';
import ChartComponent from '../../../components/StatsGroup/ChartComponent';
import { Group } from '@mantine/core';

const Dashboard: NextPageWithLayout = () => {
	return (
		<>
			<h2 style={{ textAlign: 'center', textDecoration: 'underline' }}>STOCK SAAT INI</h2>
			<ChartComponent />
			{/* <StatsGroup data={mockData} /> */}
		</>
	);
};

Dashboard.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default Dashboard;
