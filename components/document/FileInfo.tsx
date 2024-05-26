import Image from "next/image";

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover";

const FileInfo = () => {
    return ( 
        <div className="flex h-10 items-center">
            <div className="flex h-full items-center hover:bg-gray-100">
                <p className="pl-[10px] pt-1 typo-Body4 w-60">Week1</p>
                <div className="flex pt-1 pr-2">
                <Popover>
                    <PopoverTrigger>
                        <Image src="/icons/folder_setting.svg" alt="folder setting" width={3} height={18} className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverClose asChild>
                            <div>파일명 수정</div>
                        </PopoverClose>
                    </PopoverContent>
		        </Popover>
                </div>
            </div>
            <div className="w-14" />
        </div>
    );
}
 
export default FileInfo;