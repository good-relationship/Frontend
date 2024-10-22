'use client';

import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import React, { useEffect, useRef } from 'react';
import '@blocknote/mantine/style.css';

interface EditorProps {
	onChange: (value: string) => void;
	initialContent?: string;
	editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
	const editorRef = useRef<HTMLDivElement>(null);

	const editor = useCreateBlockNote({
		initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
	});

	const onEditorChange = (editor: BlockNoteEditor) => {
		onChange(JSON.stringify(editor.document, null, 2));
	};

	useEffect(() => {
		if (editorRef.current) {
			console.log('editorRef 존재');
			console.log(editorRef.current.getElementsByClassName('bn-editor'));
		}
	}, [editor]);

	return (
		<BlockNoteView
			editor={editor}
			editable={editable}
			onChange={() => onEditorChange}
			// className="translate-x-[-54px]"
			ref={editorRef}
		/>
	);
};

export default Editor;
