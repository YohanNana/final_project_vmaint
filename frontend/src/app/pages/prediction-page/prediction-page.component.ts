// prediction-page.component.ts
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
  formData = {
    mileage: '', engine_temperature: '', speed: '',
    battery_voltage: '', tire_pressure: '', vehicleId: ''
  };
  predictionResult: boolean | null = null;
  loading = false;
  history: any[] = [];
  selectedVehicleId: string = '';
  chart!: Chart;
  filtered: any[] = [];

  constructor(
    private vs: VehicleService,
    private ps: PredictionService
  ) {}

  ngOnInit() {
    const email = localStorage.getItem('userEmail')!;
    this.vs.getVehiclesByOwner(email).subscribe(vs => {
      this.vehicles = vs;
    });

    this.ps.listByUser(email).subscribe(hist => {
      this.history = hist;
      this.updateChart(); // draw with full history first
    });
  }

  makePrediction() {
    this.loading = true;
    this.predictionResult = null;

    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.formData)
    })
      .then(r => r.json())
      .then((res: { maintenance_required: number, confidence?: number }) => {
        this.predictionResult = !!res.maintenance_required;

        const payload = {
          ownerEmail: localStorage.getItem('userEmail'),
          vehicleId: this.formData.vehicleId,
          inputData: { ...this.formData },
          maintenanceRequired: this.predictionResult,
          confidence: res.confidence ?? null
        };

        this.ps.save(payload).subscribe(rec => {
          this.history.unshift(rec);
          this.updateChart(); // update with new prediction
          this.loading = false;
        });
      })
      .catch(e => {
        console.error(e);
        this.loading = false;
      });
  }

  onVehicleChange() {
    this.updateChart();
  }

  updateChart() {
    const filtered = this.history
      .filter(h => !this.selectedVehicleId || h.vehicleId._id === this.selectedVehicleId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    const labels = filtered.map(h => new Date(h.createdAt).toLocaleDateString());
    const values = filtered.map(h => h.confidence ?? 0);

    if (this.chart) {
      this.chart.data.labels = labels;
      (this.chart.data.datasets[0].data as number[]) = values;
      this.chart.update();
    } else {
      const ctx = document.getElementById('predictionChart') as HTMLCanvasElement;
      if (!ctx) return;
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Prediction Confidence (%)',
            data: values,
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
              max: 100,
              title: {
                display: true,
                text: 'Confidence %'
              }
            }
          }
        }
      });
    }
  }
}
