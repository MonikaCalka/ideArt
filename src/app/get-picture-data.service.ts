import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError, retry  } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Category } from './categories/category';
import { Subcategory } from './categories/subcategory';
import { taggedTemplate } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class GetPictureDataService {

  constructor(private http: HttpClient, private sanitizer : DomSanitizer) {

  }

  apiUrl = "https://source.unsplash.com/";

  getRandomPhoto() {
    return this.getPhoto(this.apiUrl+"random");
  }

  getPhotoForSubcategory(subcategory: Subcategory) {
    let url = this.apiUrl;
    if(subcategory.collectionId == undefined)
      url += "featured/?" + subcategory.tag;
    else 
      url += "collection/" + subcategory.collectionId;
    
    return this.getPhoto(url);
  }

  private getRandomValue(array: Array<any>){    
    return array[Math.floor(Math.random() * array.length)];
  }

  private getPhoto(url: string) {
    return this.http.get(url, {responseType: "blob"});
  }

  createImgSrc(blobImg: Blob) {
    const objectURL = URL.createObjectURL(blobImg);
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  getRandomCategory(selectedCategories: Category[]){
    return this.getRandomValue(selectedCategories);
  }

  getRandomSubCategory(subcategories: Subcategory[]) {
    return this.getRandomValue(subcategories);
  }

}
