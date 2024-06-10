'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { createMeeting } from '@/apis/meeting';
import Form from '@/components/form/Form';
import { meetingNameSchema } from '@/constants/form';
import { FormType } from '@/types/form';

const CreateMeeting = () => {
	const router = useRouter();
	const handleCreateMeeting = async (data: FormType) => {
		const { roomId } = await createMeeting({ roomName: data.meetingName });
		router.push(`/workspace/meeting/${roomId}`);
	};

	return (
		<div className="flex flex-col items-center gap-5">
			<div className="flex flex-col gap-3 items-center">
				<h3 className="typo-Header6 text-Gray-500">회의 생성하기</h3>
				<h6 className="typo-Body1 text-Gray-400">팀원들과의 회의를 생성해보아요!</h6>
			</div>
			<Image src="/images/no_internet.png" width={400} height={400} alt="no_internet" />
			<Form onSubmit={handleCreateMeeting} schema={meetingNameSchema} className="w-full flex flex-col gap-2">
				<Form.Label>회의 이름</Form.Label>
				<Form.Input name="meetingName" placeholder="회의 이름을 입력해주세요" countLimit={10} variant="Line" />
				<Form.HelperText className="px-4" name="meetingName" />
				<div className="w-full flex justify-end">
					<Form.Button buttonType="square" size="Large">
						회의 생성하기
					</Form.Button>
				</div>
			</Form>
		</div>
	);
};

export default CreateMeeting;
