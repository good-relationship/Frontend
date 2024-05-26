import Image from "next/image";

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover";

const FolderInfo = () => {
    return ( 
        <div className="flex h-12 items-center">
            <Image src="/icons/folder_open.svg" alt="open folder" width={28} height={28} />
            <p className="pl-[10px] pt-1 typo-Body3 w-56">회의</p>
            <div className="flex pt-1 gap-4">
            <Popover>
			    <PopoverTrigger>
                    <Image src="/icons/folder_setting.svg" alt="folder setting" width={3} height={18} className="cursor-pointer" />
			    </PopoverTrigger>
                <PopoverContent align="start">
                    <div>폴더명 수정</div>
                    <div>삭제</div>
			        <PopoverClose asChild>
				        {/* <Link href="/login" onClick={logout}>
					    로그아웃
				        </Link> */}
			        </PopoverClose>
		        </PopoverContent>
		    </Popover>
                <Image src="/icons/add_file.svg" alt="folder setting" width={16} height={16} className="cursor-pointer" />
            </div>
        </div>
    );
}
 
export default FolderInfo;