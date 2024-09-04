import CampoInput from "../CampoInput/CampoInput"
import { useForm } from "react-hook-form"
import { AuthContext} from "../../Auth/AuthContext"
import { useContext, useEffect, useState } from "react"
import imagen from '../../assets/imagenPerfil.jpg';
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import getDatosUser from "../../Datos/ObtenerCalculoCalorias"
import EditarDataAutorizacion from "../../Datos/EditarDataAutorizacion"
import styles from '../EditarPerfil/EditarPerfil.module.css'

export default function EditarPerfil(){
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);
    const { fecha } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState();
    let imagenPerfil = imagen;

    if (data) {
        if (data.imgUrl !== "" && data.imgUrl !== null) {
            const BaseUrl = import.meta.env.VITE_API_BASE_IMGURL;
            imagenPerfil = `${BaseUrl}${data.imgUrl}`;
        } else {
            imagenPerfil = imagen;
        }
    }

    const obtenerDatosUser = async () => {
        const BaseUrl = import.meta.env.VITE_API_BASE_MIPERFIL;
        const url = `${BaseUrl}id=${user.id}`;
        try {
            const response = await getDatosUser(url, user.jwToken);
            setData(response);
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        if (data) {
            reset({
                file: user.ImgUrl,
                PrimerNombre: user.primerNombre,
                Apellido: user.apellido,
                UserName: data ? data.nombreUsuario : ''
            });
        }
    }, [data]);

    useEffect(() => {
        obtenerDatosUser();
    }, [])

    const onEdit = handleSubmit(async (data) => {
        const newData = {
            PrimerNombre: data.PrimerNombre,
            Apellido: data.Apellido,
            UserName: data.UserName,
            file: data.file
        }

        const formData = new FormData();
        for (const key in newData) {
            formData.append(key, newData[key]);
        }
        if (newData.file && newData.file[0]) {
            formData.append('file', newData.file[0]);
        }

        const loadingAlert = swal({
            title: "Actualizando...",
            text: "Por favor, espera mientras se actualizan los datos.",
            icon: "info",
            buttons: false,
            closeOnClickOutside: false,
            closeOnEsc: false,
            timer: 120000,
        });

        const BaseUrl = import.meta.env.VITE_API_BASEEDITARPERFILUSUARIO;
        const url = `${BaseUrl}id=${user.id}`;

        try {
            const response = await EditarDataAutorizacion(url, formData, user, true);

            swal.close();

            if (response.status === 200) {
                swal({
                    title: "Aviso",
                    text: "Datos actualizados",
                    icon: "success",
                    buttons: {
                        confirm: {
                            text: "OK",
                            value: true,
                            visible: true,
                            className: "btn btn-primary",
                            closeModal: true
                        }
                    }
                }).then((value) => {
                    if (value) {
                        navigate(`/PaginaPrincipal/${fecha}`);
                    }
                });
            }

        } catch (error) {
            console.error('Ocurrió un error:', error);

            swal.close();

            swal("Error", "Hubo un problema al actualizar los datos.", "error");
            throw error;
        }

    });

    return <>
    <div className={styles.imagenPerfil}>
        <p className='fw-bold'>Foto de perfil.</p>
        <img src={imagenPerfil ? imagenPerfil : imagenPerfilExtra} alt="Imagen de perfil" />
    </div>
    
    <form className={styles.formulario} onSubmit={onEdit}>
        <CampoInput
            name='file'
            type='file'
            register={register}
            required={false}
            errors={errors}
            placeholder='Foto de perfil'
        />

        <CampoInput
            name='PrimerNombre'
            type='text'
            label={'Nombre'}
            register={register}
            required={true}
            classFom={'form-control'}
            errors={errors}
            placeholder='Primer nombre'
        />

        <CampoInput
            name='Apellido'
            label={'Apellido'}
            type='text'
            register={register}
            required={true}
            classFom={'form-control'}
            errors={errors}
            placeholder='Apellido'
        />

        <CampoInput
            name='UserName'
            label={'Nombre de Usuario'}
            type='text'
            register={register}
            required={true}
            classFom={'form-control'}
            errors={errors}
            placeholder='Nombre de usuario'
        />
        <div>
            <button className='btn btn-primary float-end w-25'>Editar</button>
        </div>
    </form>
</>

}