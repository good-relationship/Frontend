export const getWorkspaceInfo = async (token: string | undefined) => {
    const url = '/workspace/info';
    const accessToken = token

    const workspaceConfig = {
        method : "GET",
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${accessToken}`,
        }
    }

    const response = await fetch(url, workspaceConfig);

    if (response.ok) {
        const data = await response.json();
        console.log(data)
        return data;
    } else {
        throw new Error('워크스페이스 정보 가져오기 에러');
    }
}

export const createWorkspace = async (token: string | undefined) => {
    const url = '/workspace/create';
    const accessToken = token

    const workspaceConfig = {
        method : "POST",
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            "workspaceName": "조은사이",
            "schoolName": "서울대학교"       
        })
    }

    const response = await fetch(url, workspaceConfig);

    if (response.ok) {
        const data = await response.json();
        console.log(data)
        return data;
    } else {
        throw new Error('워크스페이스 정보 가져오기 에러');
    }
}