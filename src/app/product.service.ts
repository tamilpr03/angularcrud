import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from './product';
import { map } from 'rxjs/operators';
 
@Injectable()
 
// Service for products data.
export class ProductService {
 
    // We need Http to talk to a remote server.
    constructor(private _http : Http){ }
 
    // Get list of products from remote server.
    readProducts(): Observable<Product[]>{
 
        return this._http
            .get("http://localhost/REST/api/product/read.php")
            .pipe(map((res: Response) => res.json()));
    }

    // Send product data to remote server to create it.
    createProduct(product): Observable<Product>{
 
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
    
        return this._http.post(
            "http://localhost/REST/api/product/create.php",
            product,
            options
        ).pipe(map((res: Response) => res.json()));
    }

    // Get a product details from remote server.
    readOneProduct(product_id): Observable<Product>{
        return this._http
            .get("http://localhost/REST/api/product/read-one.php?id="+product_id)
            .pipe(map((res: Response) => res.json()));
    }
    // Send product data to remote server to update it.
    updateProduct(product): Observable<Product>{
    
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
    
        return this._http.post(
            "http://localhost/REST/api/product/update.php",
            product,
            options
        ).pipe(map((res: Response) => res.json()));
    }

    // Send product ID to remote server to delete it.
    deleteProduct(product_id){
    
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
    
        return this._http.post(
            "http://localhost/REST/api/product/delete.php",
            { id: product_id },
            options
        ).pipe(map((res: Response) => res.json()));
    }
 
}