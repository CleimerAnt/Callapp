import CampoInput from '../CampoInput/CampoInput';
import Modal  from '../Modal/Modal';

export default function FormularioAgregarAlimentos({id,comida, userId}){
    const urlPostContenedor = `https://localhost:7051/api/v1/ContenedorAlimentos`;

        return <>
        <Modal url={urlPostContenedor} id={id} titulo={'Agregar Alimento'} body={({ register, errors }) => (
            <>
            <CampoInput 
            name='horario'
            type={'hidden'}
            register={register}
            value={comida}
            required={true}
            errors={errors}
            />
            
            <CampoInput 
            name={'usuarioIdString'}
            type={'hidden'} 
            register={register}
            required={true}
            value={userId}
            errors={errors}
            />

            <CampoInput 
            name={'alimentosId'}
            type={'hidden'}
            register={register}
            required={true}
            value={id}
            errors={errors}
            />

            <CampoInput 
            name={'porcion'}
            type={'number'}
            placeholder={'Porcion'}
            register={register}
            required={true}
            classFom={'form-control'}
            errors={errors}
            />
        
            </>
        )
        }/>
        </>
        
    }


