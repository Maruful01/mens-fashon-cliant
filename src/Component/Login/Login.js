import React, { useContext, useState } from 'react';
import './Login.css';
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import firebaseConfig from "../firebase.config";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import { UserContext } from '../../App';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext( UserContext);


    console.log (loggedInUser)

         //  google login
          const googleLogin = () => {
          var provider = new firebase.auth.GoogleAuthProvider();
           firebase.auth()
           .signInWithPopup(provider)
           .then((result) => {
             var credential = result.credential;
             var token = credential.accessToken;
             var user = result.user;
             console.log (user);
            const newUser = {...loggedInUser};
            newUser.email = user.email;
            newUser.name = user.displayName;
            newUser.image = user.photoURL;
            setLoggedInUser (newUser);

           }).catch((error) => {
             var errorCode = error.code;
             var errorMessage = error.message;
             var email = error.email;
             var credential = error.credential;
           });

           }

    const [ haveAccount, setHaveAccount ] = useState (false);
    
    const onChangeHandler = e => {
       let isFormValid = e.target.value > 5;
       console.log (e.target.value)
    }

    const [password, setPassword] = useState (" ");
    const [confirmPassword, setConfirmPassword] = useState (" ");


    let passwordValid;
    const passwordHandler = (e) => {
        passwordValid = e.target.value.length > 5;
        if (passwordValid) {
            setPassword(e.target.value);
        }
        else {
            setPassword (null);
        }
       }
    let confirmPassValid;
       const confirmPasswordHandler = (e) => {
        confirmPassValid = e.target.value === password;

        if (confirmPassValid) {
            setConfirmPassword (e.target.value);

        }
        else {
            setConfirmPassword (null);
        }

       }

       const { register, handleSubmit, watch, formState: { errors } } = useForm();

           const onSubmit = (data) => {
            if (confirmPassword) {
                fetch ('http://localhost:5000https://immense-citadel-20616.herokuapp.com/addUser', {
                  method: 'POST',
                  headers: {'content-type': 'application/json'}, 
                  body: JSON.stringify (data)
                 })
                 .then (res => res.json())
                 console.log(data);
               }
               else {
                alert ("Wrong Input")
               }
           }
    return (
        <section className="login-component">
           {
               haveAccount ?  <div className="sign-up">
               <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
                   <h3 style={{marginLeft: "5px", color: "gray"}}>Sign Up</h3>
                  <input {...register("firstName")} type="text" required placeholder="First Name" />
                   <br />
                  <input {...register("lastName")} type="text"  required placeholder="Last Name" />
                  <br />
                  <input {...register("email")}  type="email"required placeholder="Email" />
                  <br />
                  <input {...register("mobile")}  type="phone" required placeholder="Mobile" />
                  <br />
                  <input {...register("password")} onChange={passwordHandler}  type="password"  required placeholder="Password" />
                  {password ? "" : <p style={{color: "red", marginLeft: "5px", fontSize: "13px"}}>Invalid password</p> }
                  <input {...register("confirmPassword")} onChange={confirmPasswordHandler}  type="password"  required  placeholder="Confirm Password" />    
                  {confirmPassword ? "" : <p style={{color: "red", marginLeft: "5px", fontSize: "13px"}}>Password and confirm password does not match.</p> }  
                  <br />
                  <button className="submit-btn" type="submit">Submit</button>
               </form>
               <p style={{marginLeft: "5px", color: "blue", cursor: 'pointer'}}>I have a account  <button onClick={()=>setHaveAccount(false)} style={{fontSize: '15px'}} className="submit-btn">Login</button></p>
               <h3 style={{marginLeft: "5px", color: "gray"}}>Login Using</h3>
               <button onClick={() => googleLogin()} className="submit-btn google"> <i class="fab fa-google-plus-g"></i> Google</button>
               <button className="submit-btn facebook"><i class="fab fa-facebook-f"></i> Facebook</button>
           </div>
              :
           <div className="login">
               <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
               <h1>Login</h1>
                  <input {...register("email")} onChange={onChangeHandler} type="text" required placeholder="Email" />
                  <br />
                  <input {...register("password")} onChange={onChangeHandler} type="password" required placeholder="Password" />
                  <br />
                  <button className="submit-btn" type="submit">Login</button>
               </form>
               <p style={{marginLeft: "5px", color: "blue", cursor: 'pointer'}}>Create a new account  <button onClick={()=>setHaveAccount(true)} style={{fontSize: '15px'}} className="submit-btn">Sign Up</button></p>
               <h3 style={{marginLeft: "5px", color: "gray"}}>Login Using</h3>
               <button onClick={() => googleLogin()} className="submit-btn google"> <i class="fab fa-google-plus-g"></i> Google</button>
               <button className="submit-btn facebook"><i class="fab fa-facebook-f"></i> Facebook</button>
           </div>
           

           }
           
            
        </section>
    );
};

export default Login;