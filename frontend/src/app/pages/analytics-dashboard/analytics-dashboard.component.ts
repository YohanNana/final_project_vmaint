// analytics-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    RouterLink
  ],
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.css']
})
export class AnalyticsDashboardComponent implements OnInit {

  ngOnInit(): void {
    this.checkAuth();
    this.initCharts();
  }

  // logout() {
  //   localStorage.removeItem('authToken');
  //   window.location.href = '/login';
  // }

  refreshAnalytics() {
    alert('Analytics data refreshed!');
  }

  updateCharts(event: Event) {
    const selectedVehicle = (event.target as HTMLSelectElement).value;
    console.log('Updating charts for vehicle:', selectedVehicle);
    // You can implement chart updating logic here
  }

  private checkAuth() {
    if (!localStorage.getItem('authToken')) {
      // window.location.href = '/login';
    }
  }

  private initCharts() {
    // Maintenance Cost Chart
    const costCtx = (document.getElementById('costChart') as HTMLCanvasElement).getContext('2d');
    new Chart(costCtx!, {
      type: 'bar',
      data: {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Maintenance Cost ($)',
          data: [120, 190, 90, 150, 200, 95],
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Service Frequency Chart
    const freqCtx = (document.getElementById('frequencyChart') as HTMLCanvasElement).getContext('2d');
    new Chart(freqCtx!, {
      type: 'doughnut',
      data: {
        labels: ['Oil Change', 'Tire Rotation', 'Brake Service', 'Other'],
        datasets: [{
          data: [45, 25, 15, 15],
          backgroundColor: [
            'rgba(59, 130, 246, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(245, 158, 11, 0.7)',
            'rgba(156, 163, 175, 0.7)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    // Cost Breakdown Chart
    const breakdownCtx = (document.getElementById('breakdownChart') as HTMLCanvasElement).getContext('2d');
    new Chart(breakdownCtx!, {
      type: 'pie',
      data: {
        labels: ['Parts', 'Labor', 'Fluids', 'Other'],
        datasets: [{
          data: [55, 30, 10, 5],
          backgroundColor: [
            'rgba(99, 102, 241, 0.7)',
            'rgba(14, 165, 233, 0.7)',
            'rgba(20, 184, 166, 0.7)',
            'rgba(244, 114, 182, 0.7)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    // Mileage vs Service Chart
    const mileageCtx = (document.getElementById('mileageChart') as HTMLCanvasElement).getContext('2d');
    new Chart(mileageCtx!, {
      type: 'line',
      data: {
        labels: ['30k', '35k', '40k', '45k', '50k'],
        datasets: [
          {
            label: 'Mileage (km)',
            data: [30000, 35000, 40000, 45000, 50000],
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 2,
            yAxisID: 'y'
          },
          {
            label: 'Service Events',
            data: [2, 3, 1, 4, 2],
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            borderColor: 'rgb(245, 158, 11)',
            borderWidth: 2,
            type: 'bar',
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Mileage (km)'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Service Events'
            },
            grid: {
              drawOnChartArea: false
            }
          }
        }
      }
    });

    // Service Interval Chart
    const intervalCtx = (document.getElementById('intervalChart') as HTMLCanvasElement).getContext('2d');
    new Chart(intervalCtx!, {
      type: 'radar',
      data: {
        labels: ['Oil Change', 'Tire Rotation', 'Brake Check', 'Filter Change', 'Fluid Check'],
        datasets: [
          {
            label: 'Your Average',
            data: [3.2, 6.5, 12, 8, 5],
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 2
          },
          {
            label: 'Recommended',
            data: [3, 6, 12, 6, 6],
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 12
          }
        }
      }
    });
  }
}
