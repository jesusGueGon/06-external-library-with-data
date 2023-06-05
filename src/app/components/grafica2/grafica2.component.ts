import { Component } from '@angular/core';
import { GraficData } from 'src/app/interfaces/grafic-data';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-grafica2',
  templateUrl: './grafica2.component.html',
  styleUrls: ['./grafica2.component.css']
})
export class Grafica2Component {

  data: any;
  options: any;


  datas: GraficData[] = [];
  datesLabel: string[] = [];

  positive: any = [];
  negative: any = [];

  reg = /^2021-02/;

  constructor(private apiService: ApiServiceService){}

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.apiService.searchCovid().subscribe((data) => {
      this.datas = [...data];
      console.log(this.datas);

      for(let i = 0; i < data.length; i++)
      {

        if(this.reg.test(data[i]['dateChecked']))
        {

          this.datesLabel.unshift(data[i]['dateChecked']);

          this.positive.unshift(data[i]['positive']);

          this.negative.unshift(data[i]['negative']);

        }

      }

    })

    this.data = {
      labels: this.datesLabel,
      datasets: [
        {
          label: 'Positive',
          data: this.positive,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        },
        {
          label: 'Negative',
          data: this.negative,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

}
