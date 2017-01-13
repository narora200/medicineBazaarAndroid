import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the NewService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FetchProducts {
public data: any;
public customer={
  "email": "jo@example.com",
  "password": "12234",
  "first_name": "John",
  "last_name": "Doe",
  "username": "john123",
  
  "billing": {
    "first_name": "John",
    "last_name": "Doe",
    "company": "",
    "address_1": "969 Market",
    "address_2": "",
    "city": "San Francisco",
    "state": "CA",
    "postcode": "94103",
    "country": "US",
    "email": "john.doe@example.com",
    "phone": "(555) 555-5555"
  },
  "shipping": {
    "first_name": "John",
    "last_name": "Doe",
    "company": "",
    "address_1": "969 Market",
    "address_2": "",
    "city": "San Francisco",
    "state": "CA",
    "postcode": "94103",
    "country": "US"
  }
};
  constructor(public http: Http) {
    console.log('Hello Fetch Products Provider');
  }

  //create user
  createUser()
  {
    let headers = new Headers({
      'Content-Type': 'application/json; charset=UTF-8'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = JSON.stringify(this.customer);
     console.log("stringify object",body);console.log("array customer",this.customer);
    return this.http.post("https://medicinebazaar.in/wp-json/wc/v1/customers?consumer_key=ck_3a2b7fddd1fac4e6c7ea6cec3afc19259ef76c6b&consumer_secret=cs_5653cf147e9fe76f72a98a2b0d8e3728f0e9e129", body, options)
      .map(res =>(res.json()));
  }

  //
load() {
  if (this.data) {
    // already loaded data
    return Promise.resolve(this.data);
  }

  // don't have the data yet
  return new Promise(resolve => {
    // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
    this.http.get('https://www.medicinebazaar.in/wp-json/wc/v1/products?consumer_key=ck_3a2b7fddd1fac4e6c7ea6cec3afc19259ef76c6b&consumer_secret=cs_5653cf147e9fe76f72a98a2b0d8e3728f0e9e129')
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = data;
        resolve(this.data);
      },
        err => {
        console.log("Oops!");
    },
        () => {
        console.log('Completed');
    });
  });
}
searchProducts(searchParam: string) {
console.log("Inside the searchProducts:" + searchParam );

    
return this.http.get('https://www.medicinebazaar.in/wp-json/wc/v1/products?search='+searchParam+'&per_page='+30+'&order=asc&consumer_key=ck_3a2b7fddd1fac4e6c7ea6cec3afc19259ef76c6b&consumer_secret=cs_5653cf147e9fe76f72a98a2b0d8e3728f0e9e129') 
      .map(res =>(res.json()))

  }




}