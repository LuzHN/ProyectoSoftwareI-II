import React from 'react';
import {withRouter} from "react-router-dom";

export default class Register extends React.Component {
    state = {
        email : '',
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: ''

    }

    onSubmit = e => {
        e.preventDefault();

        let validator = 0;
        //Validaciones
        if(this.state.email == ''){
            document.getElementById('email_error').style.color = "red";
            email_error.textContent = "*Email is required";
            validator = 1;
        }else{
            email_error.innerHTML = "";
        }
        if(this.state.username == ''){
            document.getElementById('username_error').style.color = "red";
            username_error.textContent = "*Username is required";
            validator = 1;
        }else{
            username_error.innerHTML = "";
        }
        if(this.state.password == ''){
            document.getElementById('password_error').style.color = "red";
            password_error.textContent = "*Password is required";
            validator = 1;
        }else{
            password_error.innerHTML = "";
        }
        if(this.state.confirmPassword != this.state.password){
            document.getElementById('confirmPassword_error').style.color = "red";
            confirmPassword_error.textContent = "Password does not match";
            validator = 1;
        }else{
            confirmPassword_error.innerHTML = "";
        }
        if(this.state.firstName == ''){
            document.getElementById('firstName_error').style.color = "red";
            firstName_error.textContent = "*First Name is required";
            validator = 1;
        }else{
            firstName_error.innerHTML = "";
        }
        if(this.state.lastName == ''){
            document.getElementById('lastName_error').style.color = "red";
            lastName_error.textContent = "*Last Name is required";
            validator = 1;
        }else{
            lastName_error.innerHTML = "";
        }
        if(this.state.phoneNumber == ''){
            document.getElementById('phoneNumber_error').style.color = "red";
            phoneNumber_error.textContent = "*Phone Number is required";
            validator = 1;
        }else{
            phoneNumber_error.innerHTML = "";
        }
        if(this.state.address == ''){
            document.getElementById('address_error').style.color = "red";
            address_error.textContent = "*Address is required";
            validator = 1;
        }else{
            address_error.innerHTML = "";
        }

        if(validator==0){
            
            console.log(this.state);
            
            this.setState({
            email : '',
            username: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: ''
            });
            email_error.innerHTML = "";
            username_error.innerHTML = "";
            password_error.innerHTML = "";
            confirmPassword_error.innerHTML = "";
            firstName_error.innerHTML = "";
            lastName_error.innerHTML = "";
            phoneNumber_error.innerHTML = "";
            address_error.innerHTML = "";

            //redirigir pagina
            this.props.history.push("/hola");

        }

    };

    

    render(){
        return (
            <body className="container">
                <div className="wrapper">
                    <div className="contact">
                    <div className="image"></div>​
                        <form>
                            <div className="container-1">
                                <div className="box-1">
                                    <p>
                                        <label>Email</label>
                                        <input type="email" placeholder='Enter Email' maxlength='140' value={this.state.email}
                                        onChange={e => this.setState({email: e.target.value})} />
                                        <div id="email_error"></div>
                                    </p>
                                </div>
                                <div className="box-2">
                                    <p>
                                        <label>Username</label>
                                        <input type="text" placeholder='Enter Username' maxlength='140' value={this.state.username} 
                                        onChange={e => this.setState({username: e.target.value})} />
                                        <div id="username_error"></div>
                                    </p>
                                </div>
                            </div>
                            <div className="container-1">
                                <div className="box-1">
                                    <p>
                                        <label>Password</label>
                                        <input type="password" placeholder='Enter Password' value={this.state.password} 
                                        onChange={e => this.setState({password: e.target.value})} />
                                        <div id="password_error"></div>
                                    </p>
                                </div>
                                <div className="box-2">
                                    <p>
                                        <label>Confirm Password</label>
                                        <input type="password" placeholder='Confirm Password' value={this.state.confirmPassword} 
                                        onChange={e => this.setState({confirmPassword: e.target.value})} />
                                        <div id="confirmPassword_error" ></div>
                                    </p>
                                </div>
                            </div>
                           
                            <div className="container-1">

                                <div className="box-1">
                                    <p>
                                        <label>First Name</label>
                                        <input type="text" placeholder='Enter First Name' maxlength='140' value={this.state.firstName} 
                                        onChange={e => this.setState({firstName: e.target.value})} />
                                        <div id="firstName_error" ></div>
                                    </p>
                                </div>
                                <div className="box-2">
                                    <p>
                                        <label>Last Name</label>
                                        <input type="text" placeholder='Enter Last Name' maxlength='140' value={this.state.lastName} 
                                        onChange={e => this.setState({lastName: e.target.value})} />
                                        <div id="lastName_error"></div>
                                    </p>
                                </div>
                            </div> 
                            <p>
                                <label>Phone Number</label>
                                <input type="number" placeholder='Enter Phone Number' value={this.state.phoneNumber} 
                                onChange={e => this.setState({phoneNumber: e.target.value})} />
                                <div id="phoneNumber_error" ></div>
                            </p>
                            <p>
                                <label>Address</label>
                                <textarea  rows="5" placeholder='Enter Address' maxlength='140' value={this.state.address} 
                                onChange={e => this.setState({address: e.target.value})}></textarea>
                                <div id="address_error"></div>
                            </p>

                            <p>
                                <button onClick={e => this.onSubmit(e)}>Register</button>    
                            </p>
                        </form>
                    </div>
                </div>
            </body>
            
            
        );
    }
}