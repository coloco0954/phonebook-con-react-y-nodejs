import { tailspin } from 'ldrs'

const Loader = () => {
    tailspin.register()
    return (
        <div className='flex flex-col items-center justify-center my-[150px] mx-[100px] gap-y-2'>

            <p className='dark:text-white'>Cargando...</p>

            <l-tailspin
                size="40"
                stroke="5"
                speed="0.9"
                color="white"
            ></l-tailspin>
        </div>
    )
}

export default Loader