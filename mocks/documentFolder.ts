import { GetDocumentFolderInfoDTO } from "@/models/document/getDocumentFolderInfoDTO";

export const mockGetDocumenFoldertInfoData:GetDocumentFolderInfoDTO[] = [
    {
        folderName: 'folder1',
        isOpen: true,
    },
    {
        folderName: 'folder2', 
        isOpen: false
    },
    {
        folderName: 'Untitled', 
        isOpen: false
    },

]