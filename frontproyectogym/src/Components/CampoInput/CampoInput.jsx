
export default function CampoInput({name, type, errors,label,register, required, validate})
{
    return  <div className="mb-3">
    <label htmlFor={name} className="form-label">{label}</label>
    <input
        type={type}
        className="form-control"
        id={name}
        {...register(name, {
            required: {
            value: required,
            message: `El campo ${label} es requerido`,
        },
        validate : validate
    })}
    />
    {errors[name] && <span>{errors[name].message}</span>}
</div>
}