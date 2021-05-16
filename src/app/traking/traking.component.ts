import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MailService } from '../mail.service';
@Component({
  selector: 'app-traking',
  templateUrl: './traking.component.html',
  styleUrls: ['./traking.component.css']
})
export class TrakingComponent implements OnInit {
  map!: mapboxgl.Map;
  profileagencies: any;
  constructor(private service: MailService) { }

  ngOnInit(): void {
    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoiZGFsaW0yIiwiYSI6ImNrbnByeW1weDA1c2wycHBmbTRsN2VyajIifQ.F7r_YbITYi1iTOQxEfbNxA'

    this.map =new mapboxgl.Map({

      container:'map',
      style:'mapbox://styles/mapbox/streets-v11',
      center:[10.1815,36.8065],
      zoom:6




    });

    this.service.getProfilagencies().subscribe(data => {
      this.profileagencies = data[0];
      console.log("fff");
      console.log(this.profileagencies);
  
    })
    
    this.service.getposition()
    .subscribe(res => {
      let lat=res.map((res: { latitude: any; })=>res.latitude);

      let long=res.map((res: { longitude: any; })=>res.longitude);
      let nom=res.map((res: { nom: any; })=>res.nom);
      let prenom=res.map((res: { prenom: any; })=>res.prenom);
      let revenu=res.map((res: { solde: any; })=>res.solde);
      let photo=res.map((res: { photo: any; })=>res.photo);
      console.log("lat",lat);

      console.log("long",long);
      console.log("prenom",prenom);

      console.log("nom",nom);
      const marker = new mapboxgl.Marker({

       
      })
      .setLngLat([long,lat])
      .setPopup(new mapboxgl.Popup().setHTML('<img class="contacts-list-img" src="http://localhost:3305/file/'+photo+'">'+'<br><br><br>'+'First Name:'+nom+'<br>'+'Last Name:'+prenom+'<br>'+'Income:'+revenu+' DT')) // add popup
      .addTo(this.map)
    })
  }

}
