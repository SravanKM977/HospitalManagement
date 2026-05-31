import { Component } from '@angular/core';
import { Card } from '../../../../shared/components/card/card';
import { HoverShadowDirective } from '../../../../shared/directives/hover-shadow-directive';

@Component({
  selector: 'app-dashboard',
  imports: [Card, HoverShadowDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
