import React,{useState,useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import { delinkAssigned, getAssigned, getPackages } from "../../service/auth";
import Alert from "react-bootstrap/Alert";

export default function Packages() {
    const user_email = localStorage.getItem("email");
    const [result, setResult] = useState("");
    const [assignedUsers, setAssignedUsers] = useState("");
    const [packageType, setPackagetype] = useState("");
    const [packageLimit, setPackagelimit] = useState("");
    const [scorecard, setScorecard] = useState("");
    const [token, setToken] = useState("");
    const [created_date, setCreateddate] = useState("");
    const [showAlert, setAlert] = useState(false);
    const [showAlertMsg, setAlertMsg] = useState({ type: "", msg: "" });

    function AlertShow(props) {
        if (showAlert) {
            return (
            <Alert variant={props.type}>
                <Alert.Heading>Alert !</Alert.Heading>
                <p>{props.text}</p>
            </Alert>
            );
        }
    }

    const clickDelink = async (token, email) => {
        let delink = await delinkAssigned(email, token);
        setAlertMsg({ type: "success", msg: "User has been delinked successfully" });
        setAlert(true);
    }
    const componentDidMount = async () => {
        let result = await getPackages(user_email);
        let assignedUsers = await getAssigned(user_email);
        setAssignedUsers(assignedUsers.data);
        setToken(result.data.package_token);
        setCreateddate(result.data.created_at);

        if(result.data.package_limit == 1) {
            setPackagetype("1 User");
            setPackagelimit("1 User is allowed");
            setScorecard("1 Scorecard / month");
        }
        else if(result.data.package_limit == 10) {
            setPackagetype("1-10 Users");
            setPackagelimit("10 Users is allowed");
            setScorecard("10 Scorecards / month");
        }
        else if(result.data.package_limit == -1) {
            setPackagetype("Unlimited Users");
            setPackagelimit("Unlimited Users is allowed");
            setScorecard("Unlimited Scorecards / month");
        }
        else if(result.data.package_limit == 0) {
            setPackagetype("Free Trail for 7 days");
            setPackagelimit("1 User");
            setScorecard("1 Scorecards / 7 days");
        }
        setResult(result)
    }
    componentDidMount();
    if(!result) {
        return (
            <div>
                <div className='dashbord-page'>
                    <div className='container'>
                        <h1>Packages</h1>
                        <Card body className='no-package'>No Package has been purchased yet.</Card>
                    </div>
                </div>    
            </div>
        );
    }
    else {
        return (
            <div>
                <div className='dashbord-page'>
                    <div className='container'>
                        <h1>Packages</h1>
                        <Card body className='package'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <h6>Package Type: {packageType}</h6>
                                </div>
                                <div className='col-md-6'>
                                    <h6>Package Limit: {packageLimit}</h6>
                                </div>
                                <div className='col-md-6'>
                                    <h6>Allowed Scorecard: {scorecard}</h6>
                                </div>
                                <div className='col-md-6'>
                                    <h6>Package Token: {token}</h6>
                                </div>
                                <div className='col-md-6'>
                                    <h6>Purchased Date: {created_date}</h6>
                                </div>
                            </div>
                        </Card>
                        <h1>Assigned Users</h1>
                        <AlertShow type={showAlertMsg.type} text={showAlertMsg.msg} />
                        <table id="assigned_user" class="table table-hover table-bordered assigned-table">
                            <thead>
                                <tr>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>User Role</th>
                                <th>Delink User</th>
                                </tr>
                            </thead>
                            <tbody>
                            {assignedUsers.map((result) => {
                                return (
                                
                                    <tr>
                                    <td>{result.name}</td>
                                    <td>{result.email}</td>
                                    <td>{result.role}</td>
                                    <td><button onClick={() => clickDelink(token, result.email)}>Delink User</button></td>
                                    </tr>
                                
                                )
                            })}

                            </tbody>
                        </table>
                    </div>
                </div>    
            </div>
        );
    }
}