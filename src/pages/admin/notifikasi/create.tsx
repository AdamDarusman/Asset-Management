import React, { useEffect, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { AdminLayout } from '@/layouts/AdminLayout';
import {
	Button,
	Group,
	Image,
	Space,
	Text,
	Input,
	Radio,
	Select,
	Checkbox,
} from '@mantine/core';
import { useId } from '@mantine/hooks';
import { IMaskInput } from 'react-imask';
import api from '@/lib/axios';

const SimpleTable: NextPageWithLayout = () => {
	const [searchValue, onSearchChange] = useState('');
	const [selectedRadio, setSelectedRadio] = useState('Customer');

	const id = useId();

	const [customers, setCustomers] = useState([]);
	const customerOptions = customers.map(customer => ({
		value: customer.id,
		label: customer.name,
	}));

	const [contactNumber, setContactNumber] = useState('');

	const [isFormValid, setFormValid] = useState(false);

	useEffect(() => {
		const getCustomer = async () => {
			const res = await api.get('/api/show-all-user');
			setCustomers(res.data);
		};
		getCustomer();
	}, []);

	useEffect(() => {
		const isInputValid =
			selectedRadio === 'User'
				? customerOptions.length > 0
				: customerOptions.length > 0 && contactNumber !== '';
		setFormValid(isInputValid);
	}, [selectedRadio, customerOptions, contactNumber]);

	function selectInput() {
		if (selectedRadio === 'Customer') {
			return (
				<>
					<Select
						style={{ width: '300px' }}
						label="Choose Customer"
						placeholder="Pick one"
						required
						data={customerOptions}
					/>
					<Select
						style={{ width: '300px' }}
						label="Choose Division"
						required
						placeholder="Pick one"
						data={[
							{ value: 'PPIC', label: 'PPIC' },
							{ value: 'Accounting', label: 'Accounting' },
						]}
					/>
					<Input.Wrapper
						required
						id={id}
						style={{ width: '300px' }}
						label="Contact Number"
					>
						<Input<any>
							component={IMaskInput}
							mask="+62 000-0000-0000"
							id={id}
							value={contactNumber}
							onChange={e => setContactNumber(e.target.value)}
							style={{ cursor: 'not-allowed' }}
							placeholder="Input Your Contact"
						/>
					</Input.Wrapper>
				</>
			);
		} else if (selectedRadio === 'User') {
			return (
				<>
					<Select
						style={{ width: '300px' }}
						label="Choose Identity"
						required
						placeholder="Pick one"
						data={customerOptions}
					/>
					<Input.Wrapper
						required
						id={id}
						style={{ width: '300px' }}
						label="Contact Number"
					>
						<Input<any>
							component={IMaskInput}
							mask="+62 000-0000-0000"
							id={id}
							value={contactNumber}
							onChange={e => setContactNumber(e.target.value)}
							style={{ cursor: 'not-allowed' }}
							placeholder="Input Your Contact"
						/>
					</Input.Wrapper>
				</>
			);
		}
	}

	function renderCheckboxes() {
		if (selectedRadio === 'Customer') {
			return (
				<>
					<Checkbox
						value="customer"
						style={{ marginLeft: '50px', paddingBottom: '20px', marginTop: '-15px' }}
						label="Incorrect Incoming Process"
					/>
				</>
			);
		} else if (selectedRadio === 'User') {
			return (
				<>
					<Checkbox
						value="user"
						style={{ marginLeft: '50px', paddingBottom: '20px', marginTop: '-15px' }}
						label="Incorrect Incoming Process"
					/>
					<Space h="xs" />
					<Checkbox
						value="user"
						style={{ marginLeft: '50px', paddingBottom: '20px', marginTop: '-15px' }}
						label="Reminder Need to Finish DN"
					/>
					<Space h="xs" />
					<Checkbox
						value="user"
						style={{ marginLeft: '50px', paddingBottom: '20px', marginTop: '-15px' }}
						label="Reminder waiting time baking"
					/>
				</>
			);
		}
	}

	return (
		<>
			<h3>Create New Notification WhatsApp</h3>
			<Radio.Group value={selectedRadio} onChange={value => setSelectedRadio(value)}>
				<Space h="sm" />
				<Group mt="xs">
					<Radio value="Customer" label="Customer" />
					<Radio value="User" label="Internal" />
				</Group>
			</Radio.Group>
			<Space h="md" />
			<Group>{selectInput()}</Group>
			<Group>
				<Group
					style={{
						width: '100%',
						border: 'gray 1px solid',
						borderRadius: '10px',
						marginTop: '20px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-start',
						alignItems: 'flex-start',
					}}
				>
					<h5 style={{ marginLeft: '50px' }}>Choose Type of Notifications *</h5>
					{renderCheckboxes()}
				</Group>
			</Group>
			<Space h="xl" />
			<Group position="right">
				<Button component="a" href="/admin/form/common" variant="outline">
					Back
				</Button>
				<Button disabled={!isFormValid}>Save</Button>
			</Group>
		</>
	);
};

SimpleTable.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default SimpleTable;
