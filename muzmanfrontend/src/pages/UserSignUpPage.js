import React from 'react';
import { signup } from '../api/apiCalls';
import Input from '../components/input';


class UserSignUpPage extends React.Component{

    state = { // burdaki değerler inputun name çzellğiği ile aynı olmak zorında
        username: null, 
        displayName: null,
        password:null,
        passwordRepeat:null,
        pendingApiCall: false,
        errors:{}
    }
    onChange = event =>{
        const {name , value} = event.target;// inputun name özelliğini al sonbra yazılan değeri al
        const errors = {...this.state.errors}// satatei kopyaladık
        errors[name] = undefined
        this.setState({
            [name] : value, // value burda inputun içi field da state keyi
            errors
        });

    };
    onClickSignUP = async event =>{
        event.preventDefault();
        const { username, displayName, password} = this.state;// javanın özelliğijsonda value ve key değeri aynıysa tekini yaz yeter
        const body ={
            username,
            displayName,
            password
        };
        this.setState({pendingApiCall: true});

        try {
            const response = await signup(body);
        } catch (error) {
            if(error.response.data.validationErrors){// error varsa calıstır yoksa calıstırma kontrolu yoksa sayfa patlıyor
                this.setState({errors: error.response.data.validationErrors}); 
            }
            
        }
        
        this.setState({pendingApiCall: false});
    };

        //bu inputun içini tutmak için uzun yol
    // onChangeUsername = (event) =>{
    //     this.setState({
    //       username: event.target.value.trim()  
    //     })
    // };
    // onChangeDisplayname = (event) =>{
    //     this.setState({
    //         displayName: event.target.value.trim()
    //     })
    // }
    // onChangePassword = (event)=>{
    //     this.setState({
    //         password: event.target.value.trim()
    //     })
    // }
    // onChangePasswordRepeat = (event)=>{
    //     this.setState({
    //         passwordRepeat: event.target.value.trim()
    //     })
    // }
    render(){
        const {pendingApiCall, errors} = this.state;
        const { username, displayName } = errors;
        return (
            <div className="container">
                <form>
                    <div>
                    <h1 className="text-center">Kayıt Formu</h1>
                    <Input name="username" label="Kullanıcı adı" error={username} onChange={this.onChange}/>
                    <Input name="displayName" label="Takma adınız" error={displayName} onChange={this.onChange}/>
                        <div  className="form-group">
                        <br></br>
                            <input type="password" className="form-control" name="password" onChange={this.onChange} placeholder="Şifrenizi girin.." />
                        </div>
                        <div  className="form-group">
                        <br></br>
                            <input type="password" className="form-control" name="passwordRepeat" onChange={this.onChange} placeholder="Şifrenizi tekrar girin.." />
                        </div>
                        <div className="text-center">
                            <br></br>
                            <button className="btn btn-primary"  onClick={this.onClickSignUP} disabled={this.state.pendingApiCall} >
                            {pendingApiCall  && <span className="spinner-border spinner-border-sm"></span>}Kayıt ol
                            </button>
                        </div>                       
                    </div>
                </form>
                

            </div>
        );
    }
}

export default UserSignUpPage;