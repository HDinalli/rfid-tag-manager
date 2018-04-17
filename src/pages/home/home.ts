import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items : Array<any> = [];

   constructor(public navCtrl: NavController,
               public http   : HttpClient)
   {

   }

   ionViewWillEnter() : void
   {
      this.load();
   }

   load() : void
   {
      this.http
      .get('http://localhost/rfid-tag-manager/backend/retrieve-group.php')
      .subscribe((data : any) =>
      {
         console.dir(data);
         this.items = data;
      },
      (error : any) =>
      {
         console.dir(error);
      });
   }

   openAddGroup() : void
   {
      this.navCtrl.push('AddGroupPage');
   }

   openManageGroup(param : any) : void
   {
      this.navCtrl.push('ManageGroupPage', param);
   }

}