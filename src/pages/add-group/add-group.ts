import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-add-group',
  templateUrl: 'add-group.html'
})
export class AddGroupPage {

   public form : FormGroup;

   public groupName : any;

   public hideForm : boolean = false;

   public pageTitle : string;

   public recordID : any = null;

   private baseURI : string  = "http://localhost/rfid-tag-manager/backend/";


   // Initialise module classes
   constructor(public navCtrl   : NavController,
               public http      : HttpClient,
               public NP        : NavParams,
               public fb        : FormBuilder,
               public toastCtrl : ToastController)
   {

      // Create form builder validation rules
      this.form = fb.group({
         "name" : ["", Validators.required]
      });
   }

   ionViewWillEnter() : void
   {
      this.resetFields();
      this.pageTitle = 'Adicionar grupo';
   }

   selectEntry(item : any) : void
   {
      this.groupName = item.name;
      this.recordID = item.id;
   }

   createEntry(name : string) : void
   {
      let headers : any	= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options : any	= { "key" : "create", "name" : name },
          url     : any = this.baseURI + "manage-group.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
         // If the request was successful notify the user
         this.hideForm   = true;
         this.sendNotification(`O grupo: ${name} foi criado`);
      },
      (error : any) =>
      {
         this.sendNotification('Algo deu errado!');
      });
   }

   saveEntry() : void
   {
      let name : string = this.form.controls["name"].value;

      this.createEntry(name);
   }

   resetFields() : void
   {
      this.groupName = "";
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