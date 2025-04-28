// prediction-page.component.ts
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';


@Component({
  selector: 'app-prediction-page',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink  // Assuming you have a NavbarComponent for the navigation bar
    // Add any other necessary imports here
  ],
  templateUrl: './prediction-page.component.html',
  styleUrl: './prediction-page.component.css'
})
export class PredictionPageComponent implements OnInit {

  ngOnInit(): void {
    // this.checkAuth();
    this.initializeChart();
  }

  // checkAuth() {
  //   const token = localStorage.getItem('authToken');
  //   if (!token) {
  //     window.location.href = '/prediction';
  //   }
  // }

  // logout() {
  //   localStorage.removeItem('authToken');
  //   window.location.href = '/prediction';
  // }

  refreshPredictions() {
    alert('Predictions refreshed!');
  }

  updatePredictions(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    console.log('Showing predictions for vehicle:', selectElement.value);
  }

  initializeChart() {
    const ctx = document.getElementById('predictionChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [{
            label: 'Maintenance Predictions',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Prediction Confidence (%)'
              }
            }
          }
        }
      });
    }
  }

}
