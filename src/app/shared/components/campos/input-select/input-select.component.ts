import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent implements OnInit {

  @Input() titulo: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() opcoes: Array<String>;

  constructor(public validacao: ValidarCamposService) { }

  ngOnInit(): void {
  }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName]
  }
}
