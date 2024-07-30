import axios from 'axios'

const baseURL = 'http://localhost:3001/api/persons'


export const getAll = async () => {
    try {
        const response = await axios.get(baseURL)
        const { data } = response

        return data
    } catch (error) {
        console.error(`Error al obtener las personas ${error}`)
        throw error
    }
}

export const add = async ({ name, number }) => {
    try {
        const response = await axios.post(baseURL, { name, number })
        const { data } = response

        return data
    } catch (error) {
        console.error(`Error al crear persona ${error}`)
        throw error
    }
}

export const deletePerson = async (id) => {
    try {
        const response = await axios.delete(`${baseURL}/${id}`)
        const { data } = response

        return data
    } catch (error) {
        console.error(`Error al eliminar persona ${error}`)
        throw error
    }
}

export const updateNumber = async (id, newNumber) => {
    try {
        const response = await axios.patch(`${baseURL}/${id}`, newNumber)
        const { data } = response

        return data
    } catch (error) {
        console.error(`Error al actualizar numero`)
        throw error
    }
}