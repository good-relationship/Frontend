import React, { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface DocumentInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  isEdit : boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeEdit : (editState : boolean) => void;
}

// forwardRef를 사용하여 함수 컴포넌트에 ref 전달
const DocumentInput = ({ value, isEdit, onChange, changeEdit, className } : DocumentInputProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
        if (inputRef.current) {
          if (isEdit && inputRef && !inputRef.current.contains(e.target as Node)) {
            changeEdit(false);
          }
        }
        };
    
        const handleKeyboardEnter = (e: KeyboardEvent) => {
          if (isEdit && e.key === "Enter") {
            changeEdit(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyboardEnter);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
          document.removeEventListener("keydown", handleKeyboardEnter);
        };
      }, [isEdit]);
    
      useEffect(() => {
        if (isEdit && inputRef.current) {
            inputRef.current.focus();
        }
      }, [isEdit]);
      
  return (
    <form className={cn("pl-[10px] pt-1", className)}>
      <input
        ref={inputRef}
        placeholder={value}
        className="italic text-gray-500 focus:outline-Gray-500 focus:outline-2 w-[90%]"
        onChange={onChange}
      />
    </form>
  );
};

export default DocumentInput;
