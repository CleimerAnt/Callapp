export default function calcularCalorias(peso, altura, edad, nivelActividad, objetivo, genero) {
    const pesoKg = peso * 0.453592;
    let TMB;
    let caloriasDiarias;
    let totalCalorias;

    if (genero === 'masculino') {
        TMB = 88.362 + (13.397 * pesoKg) + (4.799 * altura) - (5.677 * edad);
    } else if (genero === 'femenino') {
        TMB = 447.593 + (9.247 * pesoKg) + (3.098 * altura) - (4.330 * edad);
    }

    caloriasDiarias = TMB * nivelActividad;

    if (objetivo === '-500') {
        totalCalorias = caloriasDiarias - 500;
    } else if (objetivo === '+500') {
        totalCalorias = caloriasDiarias + 500;
    } else {
        totalCalorias = caloriasDiarias;
    }

    return parseFloat(totalCalorias);
}
