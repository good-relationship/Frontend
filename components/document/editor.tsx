'use client';

import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import '@blocknote/mantine/style.css';

interface EditorProps {
	onChange: (value: string) => void;
	initialContent?: string;
	editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
	const editor = useCreateBlockNote({
		initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
	});

	const onEditorChange = (editor: BlockNoteEditor) => {
		onChange(JSON.stringify(editor.document, null, 2));
	};

	return (
		<>
			<BlockNoteView editor={editor} editable={editable} onChange={() => onEditorChange} />
		</>
	);
};

export default Editor;
