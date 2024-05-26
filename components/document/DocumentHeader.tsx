import Image from "next/image";

const DocumentHeader = () => {
    return ( 
        <div className="w-full typo-Header4 flex gap-3">
            <div>
                기록
            </div>
            <Image src="/icons/add_folder.svg" alt="add folder button" width={32} height={32} />
        </div>
     );
}
 
export default DocumentHeader;