import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-maintenance-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.css']
})
export class MaintenanceFormComponent {
  @Input() vehicles: any[] = [];
  @Input() formData: any = {};
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  submit() {
    this.save.emit();
  }

  closeModal() {
    this.close.emit();
  }
}
