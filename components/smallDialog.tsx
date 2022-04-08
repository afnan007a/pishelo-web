
function SmallDialog({ text }) {
    return (
        <div className={`flex absolute justify-center w-fit h-fit -mt-10`}>
            <div className={`bg-black hidden group-hover:block px-2 py-1 rounded-md`}>
                <h1 className={`text-sm`}>{`${text}`}</h1>
            </div>
        </div>
    )
}

export default SmallDialog