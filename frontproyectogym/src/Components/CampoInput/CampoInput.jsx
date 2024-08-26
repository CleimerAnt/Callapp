export default function CampoInput({ 
    name, 
    type, 
    errors, 
    label, 
    register, 
    required, 
    validate, 
    options, 
    value, 
    placeholder, 
    classFom, 
    autocomplete, 
    decimal,
    soloLectura
}) {
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
                            message: `${label ? label : placeholder} es requerido`,
                        },
                        validate: validate
                    })}
                    disabled={soloLectura}
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={decimal ? 'number' : type}
                    className={classFom}
                    id={name}
                    autoComplete={autocomplete}
                    placeholder={placeholder}
                    value={value}
                    step={decimal ? '0.01' : undefined}
                    {...register(name, {
                        required: {
                            value: required,
                            message: `${label ? label : placeholder} es requerido`,
                        },
                        validate: validate
                    })}
                    readOnly={soloLectura} 
                />
            )}
            {errors[name] && <span className="mt-2">{errors[name].message}</span>}
        </div>
    );
}
