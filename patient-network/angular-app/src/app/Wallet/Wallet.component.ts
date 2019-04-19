import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Wallet } from 'app/org.example.patientnewtork';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-wallet',
  templateUrl: './Wallet.component.html',
  styleUrls: ['./Wallet.component.css'],
  providers: []
})
export class WalletComponent implements OnInit {
  private NAMESPACE = 'Wallet';

  constructor (private dataService: DataService<Wallet>) {
    console.log('');
  }

  ngOnInit(): void {
    
  }

  public importWallet(itemToAdd: any): Observable<Wallet> {
    return this.dataService.upload(this.NAMESPACE, itemToAdd);
  }

  public setDefaultWallet(id: any, itemToUpdate: any): Observable<Wallet> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

}