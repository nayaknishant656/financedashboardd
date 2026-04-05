import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function Insightstime({ data, range }) {
    const series = [{
        name: 'XYZ MOTORS',
        data: data || []
    }];

    const options = {
        chart: {
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom',
                show: true,
                tools: {
                    download: false,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: false,
                    reset: true
                }
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        colors: ['#2563EB'],
        dataLabels: { enabled: false },
        markers: { size: 0 },
        stroke: { curve: 'smooth', width: 3 },
        title: {
            text: `Market Trends - Viewing by ${range.toUpperCase()}`,
            align: 'left',
            style: { fontSize: '11px', fontWeight: 900, color: '#64748B', textTransform: 'uppercase' }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [20, 100, 100, 100]
            },
        },
        yaxis: {
            labels: {
                formatter: (val) => `${(val / 1000000).toFixed(1)}M`,
                style: { colors: '#64748B', fontSize: '9px', fontWeight: 'bold' }
            },
        },
        xaxis: {
            type: 'datetime',
            labels: {
                style: { colors: '#64748B', fontSize: '9px', fontWeight: 'bold' }
            }
        },
        tooltip: {
            shared: false,
            theme: 'dark',
            y: {
                formatter: (val) => `${(val / 1000000).toFixed(2)}M USD`
            }
        },
        grid: {
            borderColor: 'rgba(203, 213, 225, 0.1)',
            strokeDashArray: 4
        }
    };

    return (
        <div className="px-8 pb-8">
            <div className="bg-card p-6 rounded-2xl border border-divider shadow-sm">
                <div id="chart">
                    <ReactApexChart
                        key={range} // Force re-render on range change for clean animations
                        options={options}
                        series={series}
                        type="area"
                        height={360}
                    />
                </div>
            </div>
        </div>
    );
}
