'use client';

import { BlockNoteEditor } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { useRoom } from '@liveblocks/react/suspense';
import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import { useEffect, useState } from 'react';
import * as Y from 'yjs';
import '@blocknote/mantine/style.css';

import { getUserInfo } from '@/apis/user';

const baseColorsRGB = [
	'rgb(255, 99, 71)', // Tomato Red
	'rgb(135, 206, 235)', // Sky Blue
	'rgb(34, 139, 34)', // Forest Green
	'rgb(255, 255, 0)', // Yellow
	'rgb(128, 0, 128)', // Purple
	'rgb(255, 165, 0)', // Orange
	'rgb(255, 192, 203)', // Pink
];

const Editor = () => {
	const room = useRoom();
	const [doc, setDoc] = useState<Y.Doc>();
	const [provider, setProvider] = useState<unknown>();
	const [name, setName] = useState('');

	// name 상태를 설정하는 useEffect
	useEffect(() => {
		const getName = async () => {
			try {
				const { userName } = await getUserInfo();
				setName(userName);
			} catch (error) {
				console.error('Error fetching user info:', error);
			}
		};

		getName();
	}, []);

	// Yjs 문서 및 provider 설정
	useEffect(() => {
		const yDoc = new Y.Doc();
		const yProvider = new LiveblocksYjsProvider(room, yDoc);
		setDoc(yDoc);
		setProvider(yProvider);

		return () => {
			yDoc?.destroy();
			yProvider?.destroy();
		};
	}, [room]);

	if (!doc || !provider || !name) {
		return <div>Loading...</div>;
	}

	return <BlockNote doc={doc} provider={provider} userName={name} />;
};

type EditorProps = {
	doc: Y.Doc;
	provider: unknown;
	userName: string;
};

// BlockNote 컴포넌트
function BlockNote({ doc, provider, userName }: EditorProps) {
	const editor: BlockNoteEditor = useCreateBlockNote({
		collaboration: {
			provider,
			fragment: doc.getXmlFragment('document-store'),
			user: {
				name: userName,
				color: baseColorsRGB[Math.random() % 10],
			},
		},
	});

	return (
		<div>
			<BlockNoteView editor={editor} />
		</div>
	);
}

export default Editor;
