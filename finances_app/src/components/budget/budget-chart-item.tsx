"use client"

import { useEffect, useState } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'highcharts/modules/sankey';
import type { BudgetChartItemProps } from "@/types/budget-types"; 

export default function BudgetChartItem({
datas
}: BudgetChartItemProps) {
    const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
        chart: {
                backgroundColor: "none",
                borderRadius: 3,
            },
        credits: { enabled: false },
        title: { text: '' },
        accessibility: { enabled: false },
        series: [{
            keys: ['from', 'to', 'weight'],
            type: 'sankey',
            name: '',
            data: datas.map(item => [item.from, item.to, item.amount]),
            dataLabels: {
                align: 'left',
                x: 5,
                nodeFormat: '{point.name}: {point.sum:.2f}€',
                padding: 2,
                style: {
                    fontSize: '0.75em',
                    textOutline: 'none',
                },
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                borderRadius: 3,
            },
            linkOpacity: 0.3,
            nodePadding: 20,
            curveFactor: 0.5,
            nodeWidth: 20,
        }],
        responsive: {
            rules: [{
                condition: {
                    minWidth: 700,
                },
            }],
        },
    });

    useEffect(() => {
        setChartOptions(prev => ({
            ...prev,
            series: [{
                ...(prev.series?.[0] as Highcharts.SeriesSankeyOptions),
                data: datas.map(item => [item.from, item.to, item.amount]),
            }]
        }));
    }, [datas]);

    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[1000px]">
                <HighchartsReact 
                    highcharts={Highcharts}
                    options={chartOptions}
                />
            </div>
        </div>
    )
}