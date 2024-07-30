const Filter = ({ onChange, value }) => {
    return (
        <div>
            <input type="text" onChange={onChange} value={value} placeholder="search" className="input my-3" />
        </div>
    )
}

export default Filter