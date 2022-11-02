import { Component, OnInit, Inject } from '@angular/core';
import { Category } from '../categories/category';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subcategory } from '../categories/subcategory';

@Component({
  selector: 'app-subcategory-dialog',
  templateUrl: './subcategory-dialog.component.html',
  styleUrls: ['./subcategory-dialog.component.scss']
})
export class SubcategoryDialogComponent implements OnInit {

  categories: Category[];
  selectedSubcategories: Subcategory[];

  constructor(public dialogRef: MatDialogRef<SubcategoryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.categories = JSON.parse(JSON.stringify(data.categoriesList));
    this.categories.sort((a: Category, b: Category) => a.id - b.id);
    this.selectedSubcategories = [];
  }

  ngOnInit(): void {
  }

  changeSelected(subcategory: Subcategory) {
    subcategory.state = !subcategory.state;
  }

}
