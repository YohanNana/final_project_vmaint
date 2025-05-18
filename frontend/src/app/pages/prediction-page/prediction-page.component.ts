import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { PredictionService } from '../../services/prediction.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-prediction-page',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './prediction-page.component.html',
  styleUrls: ['./prediction-page.component.css']
})
export class PredictionPageComponent implements OnInit {
  vehicles: any[] = [];
  formData = { mileage: '', engine_temperature:'', speed:'', battery_voltage:'', tire_pressure:'', vehicleId: '' };
  predictionResult: boolean|null = null;
  loading = false;
  history: any[] = [];
  selectedVehicleId: string = '';
  chart!: Chart;

  constructor(
    private vs: VehicleService,
    private ps: PredictionService
  ) {}

  ngOnInit() {
    const email = localStorage.getItem('userEmail')!;
    // fetch user’s vehicles
    this.vs.getVehiclesByOwner(email).subscribe(vs => this.vehicles = vs);

    // fetch past predictions
    this.ps.listByUser(email).subscribe(hist => this.history = hist);

    this.initializeChart();
    this.onVehicleChange(); // draws initial chart (all vehicles)
  }

  makePrediction() {
    this.loading = true;
    this.predictionResult = null;

    // call your ML API
    fetch('http://127.0.0.1:5000/predict', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify(this.formData)
    })
    .then(r=>r.json())
    .then((res:{maintenance_required:number, confidence?:number})=> {
      this.predictionResult = !!res.maintenance_required;
      // now save to our DB
      const payload = {
        ownerEmail: localStorage.getItem('userEmail'),
        vehicleId: this.formData.vehicleId,
        inputData: { ...this.formData },
        maintenanceRequired: this.predictionResult,
        confidence: res.confidence ?? null
      };
      this.ps.save(payload).subscribe(rec => {
        this.history.unshift(rec);
        this.loading = false;
      });
    })
    .catch(e=> {
      console.error(e);
      this.loading = false;
    });
  }

  /** Called whenever the user picks a new vehicle (or blank for “all”) */
  onVehicleChange() {
    // filter history
    const data = this.history
      .filter(h => !this.selectedVehicleId || h.vehicleId._id === this.selectedVehicleId)
      .sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    // map to labels & values
    const labels = data.map(h => new Date(h.createdAt).toLocaleDateString());
    const values = data.map(h => h.confidence ?? 0);

    // update chart
    if (this.chart) {
      this.chart.data.labels = labels;
      (this.chart.data.datasets[0].data as number[]) = values;
      this.chart.update();
    }
  }

  initializeChart() {
    const ctx = document.getElementById('predictionChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],       // start empty
        datasets: [{
          label: 'Prediction Confidence (%)',
          data: [],
          fill: false,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }



  // … initializeChart() same as before …
  // initializeChart() {
  //   const ctx = document.getElementById('predictionChart') as HTMLCanvasElement;
  //   if (!ctx) return;
  //   new Chart(ctx, {
  //     type: 'line',
  //     data: {
  //       labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  //       datasets: [{
  //         label: 'Maintenance Confidence',
  //         data: [70, 65, 80, 50, 90, 60],
  //         fill: false,
  //         borderColor: 'rgb(75, 192, 192)',
  //         tension: 0.1
  //       }]
  //     },
  //     options: { responsive: true, maintainAspectRatio: false }
  //   });
  // }

  // In your component.ts
    // getConfidence(confidence?: number): number {
    //   if (confidence !== undefined && confidence !== null) {
    //     return confidence;
    //   }

    //   // Randomly select one of [95, 96, 97]
    //   const fallback = [95, 96, 97,95.5, 96.5, 97.5];
    //   // Generate a random index
    //   const randomIndex = Math.floor(Math.random() * fallback.length);
    //   return fallback[randomIndex];
    // }



}
