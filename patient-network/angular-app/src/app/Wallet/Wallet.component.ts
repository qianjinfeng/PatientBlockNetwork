import { Component, OnInit } from '@angular/core';
import { Wallet } from 'app/org.example.patientnewtork';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-wallet',
  templateUrl: './Wallet.component.html',
  styleUrls: ['./Wallet.component.css'],
  providers: [AuthService]
})
export class WalletComponent implements OnInit {
  private NAMESPACE = 'Wallet';
  wallet = 'CurrentWallet';
  message: string;

  constructor (private http: HttpClient, private authService: AuthService) {
    console.log(authService.getAccessToken());
  }

  ngOnInit(): void {
    // this.importWallet('test1');
    // this.importWallet('test2');
  }
  onPicked(input: HTMLInputElement) {
    const file = input.files[0];
    if (file) {
      this.importWallet(file).subscribe(
        msg => {
          input.value = null;
        }
      );
    }
  }

  public importWallet(file: File) {
    if (!file) { return; }
    let formData = new FormData();
    // formData.append("name","admin@patient-network");
    formData.append("file", file);

    File fe = new File("../asset/");

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data; boundary=ABCD'
      })
    };

    // Create the request object that POSTs the file to an upload endpoint.
    // The `reportProgress` option tells HttpClient to listen and return
    // XHR progress events.
    const req = new HttpRequest('POST', 'http://localhost:3000/api/wallet/import?name=admin', formData, httpOptions);

    return this.http.request(req);

    // return this.http.post<Wallet>('/wallet', formData, {
    //   headers: {
    //     'Content-Type', multipart/form-data
    //   }
    // }).subscribe(
    //   res => console.log(res),
    //   err => console.log(err)
    // );
  }

  public setDefaultWallet(name: any, itemToUpdate: any) {
    return this.http.post<Wallet>('http://localhost:3000/api/wallet/' + name + '/setDefault', itemToUpdate)
    .subscribe(
      res => console.log(res)
    );
  }

}