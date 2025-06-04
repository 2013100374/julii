import useUtility from '@/app/_hooks/useUtility';
import React from 'react'
import Chart from "react-apexcharts";

export default function ChartWidget({ data }) {

    const { trans, gs } = useUtility();
    const month = data?.purchase_data?.map((item) => item.month) || [];
    const amount = data?.purchase_data?.map((item) => item.purchased) || [];

  

    const series = [{
        name: trans('Total Purchased'),
        data: amount
    }];
    const chartOptions = {
        cchart: {
            type: 'bar',
            height: 350
          },

          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '10%',
              borderRadius: 5,
              borderRadiusApplication: 'end'
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: month,
          },
        
          fill: {
            opacity: 1
          },
          colors: ["#2F00EA"],
          tooltip: {
            y: {
              formatter: function (val) {
                return gs('cur_sym') + parseFloat(val).toFixed(2); 
              }
            }
          },
        
        }
      

  

    return (
        <div className="dashboard-graph mt-4">
            <div className="row gy-4">
                <div className="col-lg-12">
                    <div className="custom--card card h-100">
                        <div className="card-header flex-between">
                            <h6 className="card-header__title mb-0">{trans(`Course Sales Overview`)}</h6>
                        </div>
                        <div className="card-body">
                            <div className="courseOverviewChart-wrapper">
                                <Chart options={chartOptions} series={series} type="bar" height={350} />
                            </div>
                        </div>
                    </div>
                </div>
             
            </div>
        </div>
    );
}
