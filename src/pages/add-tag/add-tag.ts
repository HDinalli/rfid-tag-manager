import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-add-tag',
  templateUrl: 'add-tag.html'
})
export class AddTagPage {

   public form : FormGroup;

   public group : any;


   // Initialise module classes
   constructor(public navCtrl   : NavController,
               public http      : HttpClient,
               public NP        : NavParams,
               public fb        : FormBuilder,
               public toastCtrl : ToastController)
   {

      // Create form builder validation rules
      this.form = fb.group({
         "code" : ["", Validators.required]
      });
   }

   ionViewWillEnter() : void
   {
      this.setGroup(this.NP.get("record"));
   }

   setGroup(item : any) : void
   {
     this.group = item;
   }

   createEntry(code : Array<any>) : void
   {
      let headers : any	= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options : any	= { "groupid" : this.group.groupid, "tagcode" : code },
          url     : any = "http://localhost/rfid-tag-manager/backend/add-tag.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
         this.sendNotification("A(s) tag(s) foram adicionadas com sucesso!");
         this.navCtrl.push('ManageGroupPage', {"record": this.group});
      },
      (error : any) =>
      {
         this.sendNotification('Algo deu errado!');
      });
   }

   saveEntry() : void
   {
      let code : string = this.form.controls["code"].value;
      code = code.replace(" ", "");
      code = code.toUpperCase();
      let codeArray = code.split(";");
      this.createEntry(codeArray);
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