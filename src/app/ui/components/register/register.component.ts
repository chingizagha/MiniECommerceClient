import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Create_User } from 'src/app/contracts/users/createUser';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/model/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private toastrService:CustomToastrService) { }

  frm : FormGroup;
  ngOnInit(): void {
    this.frm=this.formBuilder.group({
      nameSurname:["",
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)]],
      username:["",
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)]
    ],
      email:["",
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.email]],
      password:["",
        Validators.required],
      confirmPassword:["",
        Validators.required
    ]
    },
    {
      validators : (group : AbstractControl) : ValidationErrors | null=> {
      let password = group.get("password").value;
      let confirmPassword=group.get("confirmPassword").value;
      return password=== confirmPassword ? null : {notSame: true};
    }
    });
  }

  //  get is used to create a parametr:
    get component(){
      return this.frm.controls;
    }
    submitted:boolean=false;
  async onSubmit(user: User){

    this.submitted = true;
    if(this.frm.invalid) return
    
    const result : Create_User = await this.userService.create(user);

    if(result.succeeded){
      this.toastrService.Message(result.message,"User added successfully!",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight,
        
      });
    }
    else{
      this.toastrService.Message(result.message,"Error!",{
        messageType:ToastrMessageType.Error,
        position:ToastrPosition.TopRight
      });
    }
  }
}