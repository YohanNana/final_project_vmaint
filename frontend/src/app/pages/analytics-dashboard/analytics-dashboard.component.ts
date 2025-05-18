// src/app/pages/analytics-dashboard/analytics-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { VehicleService } from '../../services/vehicle.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    SidebarComponent,
  ],
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.css']
})
export class AnalyticsDashboardComponent implements OnInit {
  vehicles: any[] = [];
  selectedVehicleId = '';
  email = localStorage.getItem('userEmail')!;
  // will hold { vehicles, maints, preds }
  analyticsData: { maints: any[]; preds: any[] } = { maints: [], preds: [] };

  totalCost: number = 0;
  avgMonthlyCost: number = 0;
  costVariance: number = 0;
  mostFrequentService: string = '';
  costliestService: string = '';
  costliestAmount: number = 0;
  avgServiceInterval: string = '';


  // keep track of chart instances so we can destroy before re-rendering
  private charts: Record<string, Chart> = {};

  constructor(
    private vehicleService: VehicleService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    // 1️⃣ load vehicles for the selector
    this.vehicleService
      .getVehiclesByOwner(this.email)
      .subscribe(vs => (this.vehicles = vs));

    // 2️⃣ initial load of analytics (all vehicles)
    this.loadAnalytics();
  }

  /** called whenever you change the vehicle dropdown */
  onVehicleChange() {
    this.loadAnalytics();
  }

  private loadAnalytics() {
    this.analyticsService
      .getAnalytics(this.email, this.selectedVehicleId)
      .subscribe(data => {
        // data should be { maints: [...], preds: [...] }
        this.analyticsData = data;
        this.updateCharts();
      });
  }

  /** rebuild all five charts */
  private updateCharts() {
    const { maints, preds } = this.analyticsData;

    // 1️⃣ Service Frequency (bar)
    const freq: Record<string, number> = {};
    maints.forEach(m => {
      freq[m.serviceType] = (freq[m.serviceType] || 0) + 1;
    });
    this.renderChart(
      'frequencyChart',
      'bar',
      Object.keys(freq),
      Object.values(freq),
      'Service Count',
      '#3b82f6'
    );

    // 2️⃣ Cost Over Time (line)
    const cost: Record<string, number> = {};
    maints.forEach(m => {
      const key = new Date(m.serviceDate).toLocaleString('default', {
        month: 'short',
        year: 'numeric'
      });
      cost[key] = (cost[key] || 0) + m.cost;
    });
    this.renderChart(
      'costChart',
      'line',
      Object.keys(cost),
      Object.values(cost),
      'Maintenance Cost (Rs)',
      '#10b981'
    );

    // 3️⃣ Mileage Growth (line)
    const sortedM = [...maints].sort(
      (a, b) => new Date(a.serviceDate).getTime() - new Date(b.serviceDate).getTime()
    );
    this.renderChart(
      'mileageChart',
      'line',
      sortedM.map(m => new Date(m.serviceDate).toLocaleDateString()),
      sortedM.map(m => m.mileage),
      'Mileage (km)',
      '#6366f1'
    );

    // 4️⃣ Prediction Status Breakdown (pie)
    let yes = 0,
      no = 0;
    preds.forEach(p => (p.maintenanceRequired ? yes++ : no++));
    this.renderChart(
      'breakdownChart',
      'pie',
      ['Required', 'Not Required'],
      [yes, no],
      'Prediction Status',
      ['#ef4444', '#10b981']
    );

    // 5️⃣ Prediction Confidence Over Time (line)
    const sortedP = [...preds].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    this.renderChart(
      'intervalChart',
      'line',
      sortedP.map(p => new Date(p.createdAt).toLocaleDateString()),
      sortedP.map(p => p.confidence ?? 0),
      'Prediction Confidence (%)',
      '#f59e0b'
    );


    // TOTAL & AVERAGE COST
      const now = new Date();
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(now.getFullYear() - 1);

      const yearMaints = maints.filter((m: any) => new Date(m.serviceDate) >= oneYearAgo);
      const monthlyBuckets: Record<string, number> = {};

      yearMaints.forEach((m: any) => {
        const month = new Date(m.serviceDate).getMonth();
        monthlyBuckets[month] = (monthlyBuckets[month] || 0) + m.cost;
      });

      const total = Object.values(monthlyBuckets).reduce((a, b) => a + b, 0);
      const months = Object.keys(monthlyBuckets).length || 1;
      const avg = total / months;
      const variance = Math.sqrt(
        Object.values(monthlyBuckets)
          .map(v => Math.pow(v - avg, 2))
          .reduce((a, b) => a + b, 0) / months
      );

      this.totalCost = total;
      this.avgMonthlyCost = avg;
      this.costVariance = variance;

      // MOST FREQUENT SERVICE TYPE
      const serviceFreq: Record<string, number> = {};
      yearMaints.forEach((m: any) => {
        serviceFreq[m.serviceType] = (serviceFreq[m.serviceType] || 0) + 1;
      });
      const mostFrequent = Object.entries(serviceFreq).sort((a, b) => b[1] - a[1])[0];
      this.mostFrequentService = mostFrequent?.[0] || '—';

      // COSTLIEST SERVICE TYPE (by average cost)
      const serviceCostMap: Record<string, number[]> = {};
      yearMaints.forEach((m: any) => {
        if (!serviceCostMap[m.serviceType]) serviceCostMap[m.serviceType] = [];
        serviceCostMap[m.serviceType].push(m.cost);
      });
      const avgServiceCosts = Object.entries(serviceCostMap).map(([type, costs]) => {
        const avgCost = costs.reduce((a, b) => a + b, 0) / costs.length;
        return { type, avgCost };
      });
      avgServiceCosts.sort((a, b) => b.avgCost - a.avgCost);
      this.costliestService = avgServiceCosts[0]?.type || '—';
      this.costliestAmount = avgServiceCosts[0]?.avgCost || 0;



  }

  /**
   * Generic helper to (re)render a Chart.js chart.
   * If a chart with the same ID already exists, destroy it first.
   */
  private renderChart(
    canvasId: string,
    type: 'bar' | 'line' | 'pie',
    labels: string[],
    data: number[],
    label = '',
    color: string | string[]
  ) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    // destroy old chart
    if (this.charts[canvasId]) {
      this.charts[canvasId].destroy();
    }

    this.charts[canvasId] = new Chart(canvas, {
      type,
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            backgroundColor: Array.isArray(color)
              ? color
              : type === 'pie'
              ? [color, '#ddd']
              : color,
            borderColor: Array.isArray(color) ? color : color,
            fill: type === 'line' ? false : true,
            tension: 0.2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales:
          type === 'pie'
            ? {}
            : {
                y: {
                  beginAtZero: true
                }
              },
        plugins: {
          legend: { display: true }
        }
      }
    });
  }
}
