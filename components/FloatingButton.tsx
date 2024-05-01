'use client'

const backToTop = () => {
    console.log('floating button clicked');
}

const FloatingButton = () => {
    return(
    <div className="fixed bottom-0 right-0 p-4">
    <button className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center" onClick={backToTop}>
        <img src="/icons/chatting.svg" alt="채팅아이콘" />
    </button>
    </div>
    )
}
export default FloatingButton;
