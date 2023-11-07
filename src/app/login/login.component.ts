import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent { // implements OnInit

  @ViewChild("formLogin") form!: NgForm;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ){}

  // ngOnInit(){
  //   this.route.params.subscribe(
  //     (params: Params) => {
  //       console.log(params['penis'])
  //     }
  //   );
  // }

  onSubmit(form: NgForm){
    // console.log(form.value.user)
    // console.log(form.value.pass)

    // form.setValue({
    //   user: "sexo",
    //   pass: "amumu"
    // })
    
    // console.log(form.value.user)
    // console.log(form.value.pass)

    //form.reset();
  }

  teste(){    
    // this.router.navigate(['cadastro-aluno']);
  }

}