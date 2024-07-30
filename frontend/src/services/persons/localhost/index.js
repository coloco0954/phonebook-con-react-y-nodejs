import axios from "axios"

const baseURL = 'http://localhost:3000/persons'

export const getAll = () => {
    return axios.get(baseURL) // Se obtiene la respuesta
        .then(response => {
            const { data } = response // Extraemos la data 
            return data
        })
        .catch(error => {
            console.log(`Error al obtener las personas ${error}`)
            throw error
        })
}

export const add = ({ name, number }) => {
    return axios.post(baseURL, { name, number })
        .then(response => {
            const { data } = response
            return data
        })
        .catch(error => {
            console.log(`Error al agregar persona ${error}`)
            throw error
        })
}

export const deletePerson = (id) => {
    return axios.delete(`${baseURL}/${id}`)
        .catch(error => {
            console.log(`Error al eliminar persona ${error}`)
            throw error
        })
}

export const updateNumber = (id, newNumber) => {
    return axios.patch(`${baseURL}/${id}`, newNumber)
        .then(response => {
            const { data } = response
            return data
        })
        .catch(error => {
            console.log(`Error al actualizar numero ${error}`)
            throw error
        })

}