import React, { useContext, useState } from 'react';
import './Login.css';
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import firebaseConfig from "../firebase.config";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import { UserContext } from '../../App';
import { useHistory } from 'react-router-dom';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

const Login = () => {

    let history = useHistory();

    const [loggedInUser, setLoggedInUser] = useContext( UserContext);
    const [input, setInput] = useState ({ email: null, password: null})
    const [data, setData] = useState({
                                          email: null,
                                          name: null,
                                          mobile: null,
                                          password: null
                                        })


    console.log ("data", data);
    console.log ("input", input)

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
            history.push("/confirmOrder");

           }).catch((error) => {
             var errorCode = error.code;
             var errorMessage = error.message;
             var email = error.email;
             var credential = error.credential;
           });

           }

    const [ haveAccount, setHaveAccount ] = useState (false);
    
    const onChangeHandler = e => {
        const inputEmail = {...input};
        inputEmail.email = e.target.value;
        setInput (inputEmail);
       fetch ('https://immense-citadel-20616.herokuapp.com/users?email=' + e.target.value) 
       .then (res => res.json())
       .then (user => setData (user[0]))
    }

    const inputPasswordHandler = e => {
        const newPassword ={...input};
        newPassword.password = e.target.value;
        setInput (newPassword);
     }

             //    Login 
             const click = (e) => {
                let isPasswordAndEmailRight;
                isPasswordAndEmailRight = input.password === data.password && input.email === data.email;

                if (isPasswordAndEmailRight) {
                    // const newUser = {...loggedInUser};
                    // newUser.email = data.email;
                    // newUser.name = data.firstName;
                    // newUser.password = data.password;
                    // newUser.mobile = data.mobile;
                    setLoggedInUser (data);
                    history.push("/confirmOrder");
                }
                
                else {
                    alert ("invalid email or password");
                }
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
                fetch ('https://immense-citadel-20616.herokuapp.com/addUser', {
                  method: 'POST',
                  headers: {'content-type': 'application/json'}, 
                  body: JSON.stringify (data)
                 })
                 .then (res => res.json())
                 alert ("Successfully signed up")
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
           </div>
              :
           <div className="login">
               <form action="">
               <h1>Login</h1>
                  <input {...register("email")} onChange={onChangeHandler} type="text" required placeholder="Email" />
                  <br />
                  <input {...register("password")} onChange={inputPasswordHandler} type="password" required placeholder="Password" />
                  <br />
                  <button onClick={() => click ()} type="submit"  className="submit-btn">Login</button>
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