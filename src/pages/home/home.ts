import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   constructor(public navCtrl: NavController,
               public http   : HttpClient)
   {

   }

   openAddGroup() : void
   {
      this.navCtrl.push('AddGroupPage');
   };

   viewEntry(param : any) : void
   {
      this.navCtrl.push('AddGroupPage', param);
   }

}