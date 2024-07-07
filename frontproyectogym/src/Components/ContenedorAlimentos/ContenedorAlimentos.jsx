
export default function ContenedorAlimentos({aray = []}){
    return<>
    <table className="table table-striped" style={{width: '500px'}}>
        <thead>
            <tr>
                <th>Alimento</th>
                <th>Calorias</th>
            </tr>
        </thead>
        <tbody>
            {aray.map((element, index) => (
            <tr key={index}>
                <td>{element.nombreAlimento}</td>
                <td>{element.caloriasDelAlimento}</td>
            </tr>
            ))}
        </tbody>
    </table>
    
    </>
}