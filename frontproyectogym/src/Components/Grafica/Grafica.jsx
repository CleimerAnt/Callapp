import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

export default function Grafica({proteina,carbohidratos, grasa}) {

    const data = {
        labels: ["Carbohidratos", "Proteina", "Grasa"],
        datasets: [
            {
                label: 'Macronutrientes',
                data: [carbohidratos, proteina, grasa],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'rectRounded',
                    padding: 20,
                    font: {
                        size: 14,
                    },
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                bodyFont: {
                    size: 14,
                },
                bodySpacing: 10,
                padding: 10,
                cornerRadius: 4,
            },
        },
        layout: {
            padding: {
                top: 20,
                bottom: 20,
            },
        },
    };

    return (
        <div className='container' style={{ width: '250px', margin: '0 auto', textAlign: 'center' }}>
            <Pie data={data} options={options} />
        </div>
    );
}
