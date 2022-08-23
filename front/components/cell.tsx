const Cell = ({ index, click}: { index: number, click:any }) => {
    return (
        <div onClick={() => click()} className={`cell`}>{index}</div>
    )
}
export default Cell