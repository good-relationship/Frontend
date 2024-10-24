'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { joinMeeting } from '@/apis/meeting';
import DeviceButton from '@/components/meeting/meetingRoom/DeviceButton';
import SquareButton from '@/components/SquareButton';
import { useLocalStream } from '@/hooks/localStream';
import { useSelectedDevices } from '@/hooks/selectedDevices';

const DeviceSettingPage = ({ params }: { params: { meetingId: string } }) => {
	const router = useRouter();
	const { getDevices } = useLocalStream();
	const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
	const [currentMic, setCurrentMic] = useState<MediaDeviceInfo>();
	const [currentSpeaker, setCurrentSpeaker] = useState<MediaDeviceInfo>();
	const [currentVideo, setCurrentVideo] = useState<MediaDeviceInfo>();
	const { setSelectedDevices } = useSelectedDevices();

	const { meetingId } = params;

	useEffect(() => {
		getDevices().then((deviceList) => {
			setDevices(deviceList);
			setCurrentMic(deviceList.find((device) => device.kind === 'audioinput'));
			setCurrentSpeaker(deviceList.find((device) => device.kind === 'audiooutput'));
			setCurrentVideo(deviceList.find((device) => device.kind === 'videoinput'));
		});
	}, []);

	const handleMicChange = async (deviceId: string) => {
		const newMic = devices.find((device) => device.deviceId === deviceId);
		setCurrentMic(newMic);
	};

	const handleSpeakerChange = (deviceId: string) => {
		const newSpeaker = devices.find((device) => device.deviceId === deviceId);
		setCurrentSpeaker(newSpeaker);
	};

	const handleVideoChange = (deviceId: string) => {
		const newVideo = devices.find((device) => device.deviceId === deviceId);
		setCurrentVideo(newVideo);
	};

	const handleClickSetButton = async () => {
		setSelectedDevices({
			constraints: {
				audio: {
					deviceId: {
						exact: currentMic?.deviceId,
					},
				},
				video: {
					deviceId: {
						exact: currentVideo?.deviceId,
					},
				},
			},
			audioOutput: currentSpeaker?.deviceId || '',
		});
		await joinMeeting({ roomId: meetingId });
		router.push(`/workspace/meeting/${meetingId}`);
	};

	return (
		<div className="flex flex-col items-center gap-4">
			<h3 className="typo-SubHeader2">스피커</h3>
			<div className="flex flex-col items-center">
				{devices
					.filter((device) => device.kind === 'audiooutput')
					.map((device) => {
						const isSelected = currentSpeaker?.deviceId === device.deviceId;
						return (
							<DeviceButton
								key={device.deviceId}
								onClick={() => handleSpeakerChange(device.deviceId)}
								isSelcted={isSelected}
								label={device.label}
							/>
						);
					})}
			</div>
			<h3 className="typo-SubHeader2">마이크</h3>
			<div className="flex flex-col items-center">
				{devices
					.filter((device) => device.kind === 'audioinput')
					.map((device) => {
						const isSelected = currentMic?.deviceId === device.deviceId;
						return (
							<DeviceButton
								key={device.deviceId}
								onClick={() => handleMicChange(device.deviceId)}
								isSelcted={isSelected}
								label={device.label}
							/>
						);
					})}
			</div>
			<h3 className="typo-SubHeader2">비디오</h3>
			<div className="flex flex-col items-center">
				{devices
					.filter((device) => device.kind === 'videoinput')
					.map((device) => {
						const isSelected = currentVideo?.deviceId === device.deviceId;
						return (
							<DeviceButton
								key={device.deviceId}
								onClick={() => handleVideoChange(device.deviceId)}
								isSelcted={isSelected}
								label={device.label}
							/>
						);
					})}
			</div>
			<SquareButton variant="Black" onClick={handleClickSetButton}>
				설정
			</SquareButton>
		</div>
	);
};

export default DeviceSettingPage;
