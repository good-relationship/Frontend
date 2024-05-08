'use client'

import { useEffect, useState } from "react";

import FloatingButton from "./FloatingButton";

import { useAuth } from "@/hooks/auth";

const FloatingInfo = () => {
    const [hasToken, setHasToken] = useState(false);

    const { useGetAccessToken } = useAuth();

	const checkToken = () => {
        const accessToken = useGetAccessToken();
		setHasToken(!!accessToken); 
	};

	useEffect(() => {
		checkToken();
	}, []);

    return(
        <>
        {hasToken && <FloatingButton />}
        </>
    )

}
export default FloatingInfo;