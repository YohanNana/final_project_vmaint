import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [
            CommonModule,
            RouterModule,
          ],
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.css']
})
export class VehicleCardComponent {
  @Input() vehicle: any;

  constructor(private router: Router) {}

  viewDetails() {
    this.router.navigate(['/vehicle-details', this.vehicle._id]);
  }

  deleteVehicle() {
    // TODO: Implement deletion logic
    alert(`Delete ${this.vehicle.licensePlate}`);
  }
}
