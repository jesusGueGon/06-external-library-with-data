import { Component, OnInit } from '@angular/core';
import { GraficData } from 'src/app/interfaces/grafic-data';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component implements OnInit {

  datas: GraficData[] = [];

  datesLabel: string[] = [];
  deathIncrease: any = [];
  death: any = [];

  reg = /^2021-02/;

  constructor(private apiService: ApiServiceService) { }

  data: any;

  options: any;


  ngOnInit(): void {

    this.apiService.searchCovid().subscribe((data) => {
      this.datas = [...data];
      console.log(this.datas);

      for (let i = 0; i < data.length; i++) {

        if(this.reg.test(data[i]['dateChecked']))
        {
          this.datesLabel.unshift(data[i]['dateChecked']);

          this.death.unshift(data[i]['death']);

          this.deathIncrease.unshift(data[i]['deathIncrease']);

        }

      }

    });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');



    this.data = {
      labels: this.datesLabel,
      datasets: [
        {
          label: 'Fallecidos por Covid',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: this.death
        },
        {
          label: 'Incremento de fallecidos por Covid',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: this.deathIncrease
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
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
            color: textColorSecondary,
            font: {
              weight: 500
            }
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
