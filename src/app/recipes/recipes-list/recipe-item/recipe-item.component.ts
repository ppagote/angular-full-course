import { Recipie } from './../../recipe.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipie: Recipie;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
    console.log(this.recipie);
  }


}