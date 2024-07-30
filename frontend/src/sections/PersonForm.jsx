const PersonForm = ({ onSubmit, onChangeName, onChangeNumber, newData }) => {
    return (
        <form action="" onSubmit={onSubmit}>
            <div className="">
                <h2 className="mb-2 font-bold text-xl dark:text-white">Add a new person</h2>

                <div className="flex flex-col gap-y-3">
                    <input type="text" onChange={onChangeName} value={newData.name} placeholder="add name" className="input" required />

                    <input type="number" name="" id="" onChange={onChangeNumber} value={newData.number} placeholder="add number" className="input" required />
                </div>

            </div>
            <div>
                <button type="submit" className="button">Add</button>
            </div>
        </form>
    )
}

export default PersonForm