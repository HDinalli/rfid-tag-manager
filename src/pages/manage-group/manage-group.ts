import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-manage-group',
  templateUrl: 'manage-group.html'
})
export class ManageGroupPage {

  public items : Array<any> = [];

  public group : any;

  public pageTitle : string;

   constructor(public navCtrl   : NavController,
               public NP        : NavParams,
               public http      : HttpClient,
               public toastCtrl : ToastController)
   {

   }

   ionViewWillEnter() : void
   {
      this.setGroup(this.NP.get("record"));
      this.setPageTitle(this.NP.get("record"));
      this.load(this.NP.get("record"));
   }

   setGroup(item : any) : void
   {
      this.group = item;
   }

   setPageTitle(item : any) : void
   {
      this.pageTitle = item.groupname;
   }

   load(item : any) : void
   {
      let headers : any	= new HttpHeaders({ 'Content-Type': 'application/json' }),
      options : any	= { "groupid" : item.groupid },
      url     : any = "http://localhost/rfid-tag-manager/backend/retrieve-tag.php";

      this.http.post(url, JSON.stringify(options), headers)
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

   openAddTag(item : any) : void
   {
      this.navCtrl.push('AddTagPage', item);
   }

   removeTag(item : any) : void
   {
      let headers : any	= new HttpHeaders({ 'Content-Type': 'application/json' }),
      options : any	= { "tagcode" : item.record.tagcode },
      url     : any = "http://localhost/rfid-tag-manager/backend/remove-tag.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
        this.items = [];
        this.load(this.group);
        this.sendNotification('Tag excluida com sucesso!');
      },
      (error : any) =>
      {
          console.dir(error);
      });
    }

    sendNotification(message : string)  : void
    {
      let notification = this.toastCtrl.create({
          message : message,
          duration : 3000
      });
      notification.present();
    }

}