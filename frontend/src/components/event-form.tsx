import { Button, DatePicker, Form, Input } from 'antd';
import type { IEvent } from '../types/Event';
import dayjs, { Dayjs } from 'dayjs';

type FormInputs = Omit<IEvent, 'id'>;

interface Props {
	initialValues?: Omit<IEvent, 'date'> & { date: Dayjs };
	onSubmit: (values: FormInputs) => void;
	isLoading: boolean;
}

export function EventForm({ onSubmit, isLoading, initialValues }: Props) {
	const [form] = Form.useForm();
	const imageUrl = Form.useWatch('image', form);

	return (
		<Form layout="vertical" onFinish={onSubmit} form={form} initialValues={initialValues}>
			<Form.Item<FormInputs> name="name" label="Name" rules={[{ required: true }]}>
				<Input />
			</Form.Item>

			<Form.Item<FormInputs>
				name="image"
				label="Image Url"
				rules={[{ required: true }, { type: 'url' }]}
			>
				<Input type="url" />
			</Form.Item>

			{imageUrl && (
				<div className="w-full h-[80vh] bg-gray-400 mb-8">
					<img src={imageUrl} alt="" className="object-cover h-full w-full" />
				</div>
			)}

			<Form.Item<FormInputs> name="description" label="Description" rules={[{ required: true }]}>
				<Input.TextArea autoSize={{ minRows: 6, maxRows: 12 }} />
			</Form.Item>

			<Form.Item<FormInputs> name="location" label="Location" rules={[{ required: true }]}>
				<Input />
			</Form.Item>

			<Form.Item<FormInputs> name="date" label="Date" rules={[{ required: true }]}>
				<DatePicker
					format="DD-MM-YYYY"
					disabledDate={(current) => {
						return current.isBefore(dayjs(), 'day');
					}}
				/>
			</Form.Item>

			<Button
				type="primary"
				htmlType="submit"
				className="mt-10 w-full"
				size="large"
				loading={isLoading}
			>
				Submit
			</Button>
		</Form>
	);
}
