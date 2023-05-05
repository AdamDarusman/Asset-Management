import React, { useState } from 'react';
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
} from '@mantine/core';
import { useId } from '@mantine/hooks';
import { IMaskInput } from 'react-imask';

const SimpleTable: NextPageWithLayout = () => {
	const [searchValue, onSearchChange] = useState('');
	const [selectedRadio, setSelectedRadio] = useState('Customer');

	const id = useId();

	function selectInput() {
		if (selectedRadio === 'Customer') {
			return (
				<>
					<Select
						style={{ width: '300px' }}
						label="Chooise Identify"
						placeholder="Pick one"
						data={[
							{ value: 'react', label: 'React' },
							{ value: 'ng', label: 'Angular' },
							{ value: 'svelte', label: 'Svelte' },
							{ value: 'vue', label: 'Vue' },
						]}
					/>
					<Select
						style={{ width: '300px' }}
						label="Chooise Dicvision"
						placeholder="Pick one"
						data={[
							{ value: 'PPIC', label: 'PPIC' },
							{ value: 'Accounting', label: 'Accounting' },
						]}
					/>
					<Input.Wrapper id={id} style={{ width: '300px' }} label="Contact Number">
						<Input<any>
							component={IMaskInput}
							mask="+62 000-0000-0000"
							id={id}
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
						label="Chooise Identify"
						placeholder="Pick one"
						data={[
							{ value: 'react', label: 'React' },
							{ value: 'ng', label: 'Angular' },
							{ value: 'svelte', label: 'Svelte' },
							{ value: 'vue', label: 'Vue' },
						]}
					/>
					<Input.Wrapper id={id} style={{ width: '300px' }} label="Contact Number">
						<Input<any>
							component={IMaskInput}
							mask="+62 000-0000-0000"
							id={id}
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
					<Space h="md" />
					<Checkbox
						value="user"
						style={{ marginLeft: '50px', paddingBottom: '20px', marginTop: '-15px' }}
						label="Remminder Need to Finish DN"
					/>
					<Space h="md" />
					<Checkbox
						value="user"
						style={{ marginLeft: '50px', paddingBottom: '20px', marginTop: '-15px' }}
						label="Remainder waiting time baking"
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
				<table
					style={{
						width: '100%',
						border: 'gray 1px solid',
						borderRadius: '10px',
						marginTop: '20px',
					}}
				>
					<h5 style={{ marginLeft: '50px' }}>Choose Type of Notifications *</h5>
					{renderCheckboxes()}
				</table>
			</Group>
		</>
	);
};

SimpleTable.getLayout = page => <AdminLayout>{page}</AdminLayout>;

export default SimpleTable;
