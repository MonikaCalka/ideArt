import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetPictureDataService } from '../get-picture-data.service';
import { CATEGORIES } from '../categories/categories';
import { SafeUrl } from '@angular/platform-browser';
import { Category } from '../categories/category';
import { Subcategory } from '../categories/subcategory';

@Component({
  selector: 'app-standard-inspiration',
  templateUrl: './standard-inspiration.component.html',
  styleUrls: ['./standard-inspiration.component.scss']
})
export class StandardInspirationComponent implements OnInit {

  resultImgSrc?: SafeUrl;
  randomMode = false;
  categoriesList?: Category[];
  selectedCategories: Category[] = Array<Category>();
  randomCategory?: Category;
  randomSubcategory? : Subcategory;

  constructor(private pictureService: GetPictureDataService) {

   }

  ngOnInit(): void {
    this.categoriesList = CATEGORIES;
  }

  changeSelected(query: Category) {
    const index = this.selectedCategories.indexOf(query);
    if (index >= 0) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(query);
    }
  }

  onGenerate(): void {


    if (this.randomMode) {
      console.log("generuję losowy")
      this.pictureService.getRandomPhoto().subscribe((response) => {
        this.resultImgSrc = this.pictureService.createImgSrc(response);
      }, (error) => {
        console.log(error);
      });
    } else {
      console.log("generuję według kategori");

      let randomCategory = this.pictureService.getRandomCategory(this.selectedCategories);
      
      let subcategories = randomCategory.subcategories.filter((s : Subcategory) => s.active);

      let randomSubCategory = this.pictureService.getRandomSubCategory(subcategories);

      if(randomCategory !== null && randomSubCategory !== null) {
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
