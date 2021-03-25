import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetPictureDataService } from '../get-picture-data.service';
import { CATEGORIES } from '../categories/categories';
import { SafeUrl } from '@angular/platform-browser';
import { Category } from '../categories/category';
import { Subcategory } from '../categories/subcategory';
import { SubcategoryDialogComponent } from '../subcategory-dialog/subcategory-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-standard-inspiration',
  templateUrl: './standard-inspiration.component.html',
  styleUrls: ['./standard-inspiration.component.scss']
})
export class StandardInspirationComponent implements OnInit {

  resultImgSrc?: SafeUrl;
  randomMode = false;
  categoriesList: Category[];
  selectedCategories: Category[];
  subcategoriesList?: Subcategory[];
  randomCategory?: Category;
  randomSubcategory?: Subcategory;
  onOpenSubcategoriesDialog: Function;

  constructor(private pictureService: GetPictureDataService, public dialog: MatDialog) {
    this.selectedCategories = Array<Category>();
    this.categoriesList = CATEGORIES;

    this.onOpenSubcategoriesDialog = function () {
      const dialogRef = this.dialog.open(SubcategoryDialogComponent, {
        data: {
          categoriesList: this.selectedCategories
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          //List of categories to generate
          this.selectedCategories = result.filter((category: { subcategories: any[] }) => {
            return category.subcategories.filter((s: { state: any; active: any; }) => s.state && s.active).length > 0;
          });
          //Clear list of data if item was unselected by subcategories dialog
          this.categoriesList.forEach(category => {
            if (!this.selectedCategories.find(selected => category.id == selected.id)) {
              category.state = false;
              category.subcategories.forEach((subCategory: Subcategory) => {
                subCategory.state = true;
              });
            }
          });
        }
      });
    }
  }

  ngOnInit(): void {
  }

  changeSelected(category: Category) {
    category.state = !category.state;
    const index = this.selectedCategories.indexOf(category);
    if (index >= 0) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(category);
    }
  }

  onGenerate(): void {


    if (this.randomMode) {
      this.pictureService.getRandomPhoto().subscribe((response) => {
        this.resultImgSrc = this.pictureService.createImgSrc(response);
      }, (error) => {
        console.log(error);
      });
    } else {
      let randomCategory = this.pictureService.getRandomCategory(this.selectedCategories);

      let subcategories = randomCategory.subcategories.filter((s : Subcategory) => s.active && s.state);
      let randomSubCategory = this.pictureService.getRandomSubCategory(subcategories);

      if (randomCategory !== null && randomSubCategory !== null) {
        this.randomCategory = randomCategory;
        this.randomSubcategory = randomSubCategory;
      }
      this.pictureService.getPhotoForSubcategory(randomSubCategory).subscribe((response) => {
        this.resultImgSrc = this.pictureService.createImgSrc(response);
      }, (error) => {
        console.log(error);
      });
    }

  }
}
