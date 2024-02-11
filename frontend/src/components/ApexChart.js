// ApexChart.js
import React, { Component, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends Component {
  constructor(props) {
    
    super(props);
    let label = this.props.label;

    this.state = {
      series: [this.props.value || 0],
      options: {
        chart: {
          height: 350,
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
              size: '70%',
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
                fontSize: '17px',
              },
              value: {
                formatter: function (val) {
                  // Check if val is defined and not null before calling toString
                  return val != null ? val.toString() : 'N/A';
                },
                color: '#111',
                fontSize: '36px',
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
            shadeIntensity: 0.5,
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
        labels: [], // Default to 'Data' if label is not provided
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        series: [this.props.value || 'Error Reading'],
      });
    }
    if (this.props.label !== prevProps.label) {
      this.setState({
        options: {
          ...this.state.options,
          labels: [this.props.label],
        },
      });
    }
  }

  render() {
    return (
      <div>
        <div id="card">
          <div id="chart">
            <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={350} />
          </div>
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ApexChart;
