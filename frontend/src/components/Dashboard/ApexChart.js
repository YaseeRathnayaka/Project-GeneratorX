import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = (props) => {
  const [series, setSeries] = useState([props.value || 0]);
  const [options, setOptions] = useState({
    chart: {
      height: 250,
      type: 'radialBar',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '80%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0,
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '18px',
          },
          value: {
            formatter: function (val) {
              return val != null ? val.toString() : 'N/A';
            },
            color: '#111',
            fontSize: '30px',
            show: true,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.9,
        gradientToColors: ['#ABE5A1'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: [],
  });

  useEffect(() => {
    if (props.value) {
      setSeries([props.value]);
    }
  }, [props.value]);

  useEffect(() => {
    if (props.label) {
      setOptions({
        ...options,
        labels: [props.label],
      });
    }
  }, [props.label]);

  return (
    <div>
      <div id="card">
        <div id="chart">
          <h1>{props.guageType}</h1>
          <ReactApexChart options={options} series={series} type="radialBar" height={300} />
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;