// Importamos los componentes y el useState y useEffect
import { useState, useEffect } from "react"
import Filter from './sections/Filter'
import PersonForm from "./sections/PersonForm"
import Persons from "./sections/Persons"
import { getAll as getAllPersons, add as addNewPerson, deletePerson, updateNumber } from "./services/persons/server/index"
import Loader from "./components/Loader"
import SwitchMode from "./components/SwitchMode"
import { Notification, NotificationError } from "./components/Notifications"

const App = () => {
  const [persons, setPersons] = useState([]) // Estado para almacenar a las personas

  const [newData, setNewData] = useState({ // Estado para obtener el valor del nombre y numero
    name: '',
    number: ''
  })

  const [searchPerson, setSearchPerson] = useState('') // Estado para filtrar personas

  const [loading, setLoading] = useState(false) // Estado de carga

  const [message, setMessage] = useState(null) // Estado para mostrar mensaje de notificacion

  const [messageError, setMessageError] = useState(null) // Estado par mostrar mensaje de error en notificacion

  useEffect(() => {
    // Actualizamos el estado de carga a true 
    setLoading(true)

    // Funcion para obtener personas
    const fetchPersons = async () => {
      try {
        // Usamos un time out que durara 2 segundos
        await new Promise(resolve => setTimeout(resolve, 2000))

        //Llama a la funcio que obtiene las personas del backend
        const persons = await getAllPersons()
        //Mostramos las persons
        setPersons(persons)
      } finally {
        // Actualizamos el estado de carga a false
        setLoading(false)
      }

    }
    // Se ejecuta la funcion
    fetchPersons()
  }, [])

  // Actualizamos en el estado el valor de name
  const handleChangeName = (event) => {
    setNewData({
      ...newData,
      name: event.target.value
    })
  }

  // Actualizamos en el estado el valor de number
  const handleChangeNumber = (event) => {
    setNewData({
      ...newData,
      number: event.target.value
    })
  }

  // Actualizamos el estado para filtrar personas con el valor del buscador
  const handleSearch = (event) => {
    setSearchPerson(event.target.value)
  }

  // Funcion para agregar personas
  const handleAddPerson = async (event) => {
    // Evitamos el comportamiento por defecto
    event.preventDefault()

    // Si se intenta agregar un nombre ya existente le saldra una alerta para actualizar el numero de la persona
    if (persons.some(person => person.name.toLocaleLowerCase() === newData.name.toLocaleLowerCase())) {
      // Si se le da 'ok' a la alerta se actualiza el numero de la persona
      if (window.confirm(`${newData.name} ya ah sido registrado con otro numero, desea reemplazar el numero viejo con el numero nuevo??`)) {

        // Filtramos las personas que coincidan con el nombre por agregar
        const personFilter = persons.filter(person => {
          const coincidencia = person.name.toLocaleLowerCase() === newData.name.toLocaleLowerCase()
          return coincidencia
        })

        // Obtenemos el id de la persona filtrada
        const personID = personFilter[0].id

        // Obtenemos el nuevo numero y lo guardamos en un objeto
        const newNumber = {
          number: Number(newData.number)
        }

        try {
          // Llamamos a la funcion que actualiza el numero y le pasamos el id y el nuevo  numero
          const updatedNumber = await updateNumber(personID, newNumber)

          // Buscamos la persona y la actualizamos
          setPersons(persons.map(person => {
            return person.id === personID ? { ...person, number: updatedNumber.number } : person
          }))


          // Mostramos mensaje de exito
          setMessage(`${updatedNumber.name} ha actualizado su numero`)
          // Quitamos la notificacion
          setTimeout(() => {
            setMessage(null)
          }, 2000)

          //Limpiamos los inputs
          setNewData({
            name: '',
            number: ''
          })
        } catch (error) {
          // Si hay un error le avisamos al usuario 
          setMessageError(`La informacion de ${newData.name} ya ha sido eliminada del servidor`)
          //Quitamos a la persona que se intenta actualizar
          setPersons(persons.filter(person => person.id !== personID))
          // Borramos la notificaicon
          setTimeout(() => {
            setMessageError(null)
          }, 3000)
          // Limpiamos los inputs
          setNewData({
            name: '',
            number: ''
          })
        }

        return
      } else {
        // Si se le dice que no a la alerta salimos de la funcion
        return
      }
    }

    // Creamos un nuevo objeto que almacenara los datos de la persona
    const newPerson = {
      name: newData.name,
      number: Number(newData.number),
    }

    // Actualizamos el estado con los datos de la nueva persona
    try {
      // Llamamos a la funcion que agrega las personas
      const addedPerson = await addNewPerson(newPerson)

      // Agregamos a la persona y le informamos al usuario
      setPersons(prevPersons => prevPersons.concat(addedPerson))
      setMessage(`${newPerson.name} ha sido agregado`)

      // Borramos la notificacion
      setTimeout(() => {
        setMessage(null)
      }, 2000)

      // Limpiamos los inputs
      setNewData({ name: '', number: '' })
    } catch (error) {
      // SI hay un error le informamos al usuario
      setMessageError(`Ha ocurrido un error al agregar a '${newData.name}'`)

      // Borramos la notificacion
      setTimeout(() => {
        setMessageError(null)
      }, 3000)
    }
  }

  const handleDeletePerson = async (event) => {
    // Obtenemos el nombre de la persona por eliminar
    const personName = event.target.parentElement.previousSibling.previousSibling.firstChild.textContent

    // Le preguntamos si desea eliminarla
    if (window.confirm(`Desea eliminar a ${personName} de la agenda?`)) {
      const personID = event.target.parentElement.parentElement.id

      //Eliminamos a la persona y actualizamos su estado
      try {
        // Llamamos a la funcion que elimina a las personas y le pasamos el id
        const deletedPerson = await deletePerson(personID)

        // Filtramos para que no aparezca la persona eliminada
        setPersons(persons.filter(person => person.id !== personID))
        // Se le avisa al usuario
        setMessage(`${deletedPerson.name} se ha eliminado correctamente`)

        // Eliminamos la notificacion
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      } catch (error) {
        // SI hay un error se le avisa al usuario
        setMessageError(`Ha ocurrido un error al eliminar a la persona`)

        //Borramos la notificacion
        setTimeout(() => {
          setMessageError(null)
        }, 3000)
      }

    } else {
      return
    }
  }



  return (
    <div className="flex flex-col bg-royal-blue-400 dark:bg-[#2e4281] p-5 mx-5 my-3 h-[95%] rounded-md">
      <div className="flex flex-row">
        <div className="">
          <SwitchMode />
          <h2 className="font-bold text-3xl mt-3 dark:text-white">Phonebook</h2>
          <Filter onChange={handleSearch} value={searchPerson} />

          <PersonForm
            onSubmit={handleAddPerson}
            onChangeName={handleChangeName}
            onChangeNumber={handleChangeNumber}
            newData={newData} />
          <Notification message={message} />
          <NotificationError message={messageError} />
        </div>

        {/** Si loading es true mostrara una animacion de carga y si es false muestra la lista de personas */}

        <div className="mx-[300px]">
          {loading ? <Loader /> : <Persons persons={persons} searchPerson={searchPerson} onClick={handleDeletePerson} />}
        </div>
      </div>
    </div>
  )
}

export default App