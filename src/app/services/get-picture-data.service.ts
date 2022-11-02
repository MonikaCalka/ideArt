import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Category } from '../categories/category';
import { Subcategory } from '../categories/subcategory';
import ConfigJson from '../../config.json';
import { PhotoResponse } from '../categories/photoResponse';

@Injectable({
  providedIn: 'root'
})
export class GetPictureDataService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {

  }

  apiUrl = "https://api.unsplash.com/";
  randomPhotoUrl = this.apiUrl + "photos/random"
  headerDict = {
    'Authorization': ConfigJson.unsplashClientId
  }

  getRandomPhoto() {
    return this.getPhoto(this.randomPhotoUrl);
  }

  getPhotoForSubcategory(subcategory: Subcategory) {
    let url = this.randomPhotoUrl;
    if (subcategory.collectionId == undefined)
      url += "?query=" + subcategory.tag;
    else
      url += "?collections=" + subcategory.collectionId;

    return this.getPhoto(url);
  }

  private getRandomValue(array: Array<any>) {
    return array[Math.floor(Math.random() * array.length)];
  }

  private getPhoto(url: string) {
    return this.http.get(url, { headers: this.headerDict }) as Observable<PhotoResponse>;
  }

  getRandomCategory(selectedCategories: Category[]) {
    return this.getRandomValue(selectedCategories);
  }

  getRandomSubCategory(subcategories: Subcategory[]) {
    if (subcategories.length > 1) {
      subcategories = subcategories.filter((s: Subcategory) => s.idSubCategory % 100 != 0);
    }
    return this.getRandomValue(subcategories);
  }

}
