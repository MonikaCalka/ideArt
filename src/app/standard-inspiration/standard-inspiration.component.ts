import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetPictureDataService } from '../services/get-picture-data.service';
import { categories } from '../../assets/consts/categories.json';
import { SafeUrl } from '@angular/platform-browser';
import { Category } from '../categories/category';
import { Subcategory } from '../categories/subcategory';
import { SubcategoryDialogComponent } from '../subcategory-dialog/subcategory-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PhotoResponse } from '../categories/photoResponse';

@Component({
  selector: 'app-standard-inspiration',
  templateUrl: './standard-inspiration.component.html',
  styleUrls: ['./standard-inspiration.component.scss']
})
export class StandardInspirationComponent implements OnInit {
  randomMode = false;
  categoriesList: Category[];
  selectedCategories: Category[];
  subcategoriesList?: Subcategory[];
  randomCategory?: Category | null;
  randomSubcategory?: Subcategory | null;
  onOpenSubcategoriesDialog: Function;
  photo?: PhotoResponse;

  constructor(private pictureService: GetPictureDataService, public dialog: MatDialog) {
    this.selectedCategories = Array<Category>();
    this.categoriesList = categories;

    this.onOpenSubcategoriesDialog = function () {
      const dialogRef = this.dialog.open(SubcategoryDialogComponent, {
        data: {
          categoriesList: this.selectedCategories
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          //List of categories to generate
          this.selectedCategories = result.filter((category: { subcategories: Subcategory[] }) => {
            return category.subcategories.filter((s: { state: boolean; active: boolean; }) => s.state && s.active).length > 0;
          });
        }
      });
    }
  }

  ngOnInit(): void {
  }

  changeSelected(category: Category) {
    category.state = !category.state;
    const index = this.selectedCategories.map(x => x.id).indexOf(category.id);
    if (index >= 0) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(category);
    }
  }

  onGenerate(): void {
    if (this.randomMode) {
      this.pictureService.getRandomPhoto().subscribe({
        next: (response: PhotoResponse) => {
          this.photo = response;
          this.randomCategory = null;
          this.randomSubcategory = null;
        }, error: (error) => {
          console.log(error);
        }
      });
    } else {
      this.randomCategory = this.pictureService.getRandomCategory(this.selectedCategories);
      const subcategories = this.randomCategory ? this.randomCategory.subcategories.filter((s: Subcategory) => s.active && s.state) : null;

      if (this.randomCategory && subcategories) {
        this.randomSubcategory = this.pictureService.getRandomSubCategory(subcategories);

        if (this.randomSubcategory) {
          this.pictureService.getPhotoForSubcategory(this.randomSubcategory).subscribe((response: PhotoResponse) => {
            this.photo = response;
          }, (error) => {
            console.log(error);
          });
        }
      }
    }

  }
}
