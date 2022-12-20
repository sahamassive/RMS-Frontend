import React, { useState } from 'react';
import './EmployeeRegistration.css';
import AccountDetails from'./AccountDetails';
import Address from './Address';
import Others from './Others';
import Password from './Password';
import { Link } from 'react-router-dom';

function EmployeeRegistration() { 
    const [accountDetails, setAccountDetails] = useState(true);
    const [address, setAddress] = useState(false);
    const [password, setPassword] = useState(false);
    const [others, setOthers] = useState(false);
    
    const AccountDetails2 = () => {
        setAccountDetails(true);
        setAddress(false);
        setOthers(false);
        setPassword(false);
    }
    
    const Address2 = () => {
        setAccountDetails(false);
        setAddress(true);
        setPassword(false);
        setOthers(false);
    }

    const Password2 = () => {
        setPassword(true);
        setAddress(false);
        setOthers(false);
        setAccountDetails(false);
    }

    const Others2 = () => {
        setOthers(true);
        setAddress(false);
        setPassword(false);
        setAccountDetails(false);
    }
    return (
        <div>
            <form>
                <div className='two_part'>
                    <div className="col-sm-3 background">
                        <p className="text_style space"><span className="text_style"><i className="bi bi-folder2-open"></i>Account Setting</span><br></br>Personal Information</p>
                        <Link onClick={AccountDetails2}><p className="btn_style_active icon2"><i className="bi bi-person-fill"></i>Account Details</p></Link>
                        <Link onClick={Address2}><p className="btn_style_inactive icon2"><i className="fa-brands fa-sellcast icon"></i>Address</p></Link>
                        <Link onClick={Password2}><p className="btn_style_inactive icon2"><i class="bi bi-lock-fill"></i>Password</p></Link>
                        <Link onClick={Others2}><p className="btn_style_inactive icon2"><i className="fa-solid fa-users icon"></i>Others</p></Link>
                    </div>           
                    <div className="col-sm-9 background">
                        <div className="col-sm-6">
                            <h4 className='space'><i className='bi bi-info-square-fill'></i>Personal Information</h4>
                        </div>
                        <div>
                            {accountDetails ? <AccountDetails /> : null}
                            {address ? <Address /> : null}
                            {password ? <Password /> : null}
                            {others? <Others /> : null}
                        </div>
                    </div>      
                </div>
            </form> 
        </div>
    );
}


export default EmployeeRegistration;