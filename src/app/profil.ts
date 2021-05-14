export class profil{

    id:number;
    nom: string;
    prenom: string;
    email:string;
    date:Date;
    password:string;
    cin:Number;
    profession:string;
    lieuCirculation:string;

    constructor(id :number,name: string,prenom:string ,email:string,password:string,date:Date,cin:Number,profession:string,lieuCirculation:string){
        this.id=id;
        this.nom = name;
        this.prenom = prenom;
         this.email = email;
         this.password = password;
         this.date = date;
         
         this.cin = cin;
         this.profession = profession;
         this.lieuCirculation = lieuCirculation;
     }



}