export default function CampoInput({ name, type, errors, label, register, required, validate, options, value, placeholder, classFom }) {
    return (
        <div className={type === 'hidden' ? 'd-none' : 'mb-3'}>
            {type !== 'hidden' && <label htmlFor={name} className="form-label">{label}</label>}
            {type === 'select' ? (
                <select
                    className={classFom}
                    id={name}
                    {...register(name, {
                        required: {
                            value: required,
                            message: `El campo ${label} es requerido`,
                        },
                        validate: validate
                    })}
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    className={classFom}
                    id={name}
                    placeholder={placeholder}
                    value={value}
                    {...register(name, {
                        required: {
                            value: required,
                            message: `El campo ${label} es requerido`,
                        },
                        validate: validate
                    })}
                />
            )}
            {errors[name] && <span>{errors[name].message}</span>}
        </div>
    );
}
