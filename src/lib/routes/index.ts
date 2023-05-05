import { NavItem } from '@/types/nav-item';
import {
	IconDashboard,
	IconForms,
	IconTable,
	IconChartArcs,
	IconLock,
} from '@tabler/icons-react';

export const routes: NavItem[] = [
	{ label: 'Dashboard', icon: IconDashboard, link: '/admin/home' },
	{
		label: 'Management User',
		icon: IconForms,
		link: '/admin/form',
		links: [
			{ label: 'Daftar User', link: '/admin/form/common' },
			{ label: 'Daftar Vendor', link: '/admin/form/vendor' },
			{ label: 'Daftar Role', link: '/admin/role/upload' },
		],
	},
	{
		label: 'Manajement Item',
		icon: IconTable,
		link: '/admin/table',
		links: [{ label: 'Daftar Item', link: '/admin/table/simple' }],
	},
	{ label: 'Charts', icon: IconChartArcs, link: '/admin/chart' },
	{
		label: 'Manajement Machine',
		icon: IconLock,
		links: [{ label: 'Daftar Machine', link: '/admin/mesin/common' }],
	},
	{
		label: 'Transaction',
		icon: IconLock,
		links: [
			{ label: 'Label List', link: '/admin/label/common' },
			{ label: 'Reservasi List', link: '/admin/reservasi/common' },
			{ label: 'Scan', link: '/admin/scan/common' },
		],
	},
	{
		label: 'Notifikasi',
		icon: IconLock,
		links: [{ label: 'Notifikasi Whatsapp', link: '/admin/notifikasi/common' }],
	},
	{
		label: 'Stock',
		icon: IconLock,
		links: [{ label: 'Stock Item', link: '/admin/stock/common' }],
	},
];
