
function SmallDialog({ text, align = 'top', placement = 'center' }) {

    let aligningtoolcss = ''
    let placementtoolcss = ''

    switch (align) {
        case 'top':
            aligningtoolcss = '-mt-10'
            break
        case 'bottom':
            aligningtoolcss = 'mt-10'
            break
    }

    switch(placement) {
        case 'right':
            placementtoolcss = 'right-2'
            break
        case 'left':
            placementtoolcss = 'left-2'
            break
        case 'center':
            placementtoolcss = ''
            break
    }

    return (
        <div className={`flex absolute overflow-hidden justify-center w-fit h-fit ${placementtoolcss} ${aligningtoolcss}`}>
            <div className={`bg-black hidden group-hover:block transition-all px-2 py-1 text-center rounded-md`}>
                <h1 className={`text-sm`}>{`${text}`}</h1>
            </div>
        </div>
    )
}

export default SmallDialog