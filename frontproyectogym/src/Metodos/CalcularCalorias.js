export default function calcularCalorias(peso, altura, edad, nivelActividad, objetivo, genero) {
    const pesoKg = peso * 0.453592; // Convierte el peso de libras a kilogramos
    const alturaCm = altura * 30.48; // Convierte la altura de pies a centímetros
    let TMB;
    let caloriasDiarias;
    let totalCalorias;

    // Calculo de TMB usando la fórmula de Mifflin-St Jeor
    if (genero === 'masculino') {
        TMB = (10 * pesoKg) + (6.25 * alturaCm) - (5 * edad) + 5;
    } else if (genero === 'femenino') {
        TMB = (10 * pesoKg) + (6.25 * alturaCm) - (5 * edad) - 161;
    }

    // Multiplicador de nivel de actividad física
    caloriasDiarias = TMB * nivelActividad;

    // Ajuste basado en el objetivo
    if (objetivo === '-500') {
        totalCalorias = caloriasDiarias - 500; // Déficit de 500 calorías para perder peso
    } else if (objetivo === '+500') {
        totalCalorias = caloriasDiarias + 500; // Superávit de 500 calorías para ganar peso
    } else {
        totalCalorias = caloriasDiarias; // Mantener peso
    }

    return parseFloat(totalCalorias.toFixed(2));
}
