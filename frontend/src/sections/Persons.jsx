const Persons = ({ persons, searchPerson, onClick }) => {
    return (
        <div className="">
            <div className="h-[2px] -ml-3 w-[520px] bg-black dark:bg-white mb-2"></div>

            <div className="flex flex-row gap-x-[180px] mb-3 font-bold text-xl dark:text-white">
                <div>
                    <p>Name</p>
                </div>
                <div>
                    <p>Number</p>
                </div>
            </div>
            <div className="h-[2px] -ml-3 w-[520px] bg-black dark:bg-white mb-2"></div>

            {/** Hacemos un renderizado condicional */}
            {persons.length === 0 ? <p className="dark:text-white">No hay personas agregadas</p> : persons
                .filter(person => {
                    {/** Si el nombre de la persona incluye alguna letra buscada devuelve el objeto que coincide */ }
                    if (person.name.toLocaleLowerCase().includes(searchPerson.toLocaleLowerCase())) {
                        return person
                    }
                })
                .map(person => {
                    return (
                        <div key={person.id} id={person.id} className="flex flex-row dark:text-slate-300">
                            <div className="flex flex-row mb-4 w-[200px] ">
                                <span>{person.name} </span>
                            </div>
                            <div className="ml-10 w-[200px]">
                                <span>({person.number})</span>
                            </div>
                            <div>
                                <button onClick={onClick} className="button-delete">delete</button>
                            </div>

                        </div>
                    )
                })}
        </div>
    )
}

export default Persons