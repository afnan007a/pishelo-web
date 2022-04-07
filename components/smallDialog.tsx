
function SmallDialog({ text }) {
    return (
        <div className={`flex justify-center`}>
            <div className={`bg-black hidden group-hover:block px-2 py-1 rounded-md absolute -mt-10`}>
                <h1 className={`text-sm`}>{`${text}`}</h1>
            </div>
        </div>
    )
}

export default SmallDialog