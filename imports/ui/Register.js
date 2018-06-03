import React from 'react';


export default class Register extends React.Component {
    state = {
        email : '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    }

    onSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        this.setState({
            email : '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: ''
        });
    };

    render(){
        return (
            <div className="container">
                <div className="contact">
                    <h3>Email Us</h3>
                    <form>
                        <p>
                            <label>Email</label>
                            <input type="email" placeholder='Enter Email' value={this.state.email}
                            onChange={e => this.setState({email: e.target.value})} />
                        </p>
                        <p>
                            <label>Password</label>
                            <input type="password" placeholder='Enter Password' value={this.state.password} 
                            onChange={e => this.setState({password: e.target.value})} />
                        </p>
                        <p>
                            <label>Confirm Password</label>
                            <input type="password" placeholder='Confirm Password' value={this.state.confirmPassword} 
                            onChange={e => this.setState({confirmPassword: e.target.value})} />
                        </p>
                        <p>
                            <label>First Name</label>
                            <input type="text" placeholder='Enter First Name' value={this.state.firstName} 
                            onChange={e => this.setState({firstName: e.target.value})} />
                        </p>
                        <p>
                            <label>Last Name</label>
                            <input type="text" placeholder='Enter Last Name' value={this.state.lastName} 
                            onChange={e => this.setState({lastName: e.target.value})} />
                        </p>
                        <p>
                            <button onClick={e => this.onSubmit(e)}>Register</button>    
                        </p>
                    </form>
                </div>
            </div>
            
        );
    }
}