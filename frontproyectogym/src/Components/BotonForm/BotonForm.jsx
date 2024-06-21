
export default function BotonForm({texto}){
    return<>
    <div className="mb-3 float-end">
        <button type="submit" className='btn btn-primary'>{texto}</button>
    </div>
    </>
}