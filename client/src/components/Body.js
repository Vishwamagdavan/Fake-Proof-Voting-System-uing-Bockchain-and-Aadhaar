import React, { useState } from 'react';
import axios from 'axios';

export default function Body({ candidate1, candidate2, candidate3, candidate4, candidate5, candidate6, accounts, votecandidate }) {
    const CANDIDATELIST = ['', 'EDAPPADI K. PALANISWAMI', 'STALIN', 'SEEMAN', 'VALLA DURAI', 'VIMAL SAI PRASAD', 'GP MUTHU']
    const [aadhar, setAadhar] = useState(0);
    const [option, setOption] = useState(0);
    const [errmsg, setErrmsg] = useState("");
    const onchangeSelect = (e) => {
        e.preventDefault();
        setOption(e.target.value);
    }
    const onsubmitform = (e) => {
        e.preventDefault();
        if (option !== 0 && aadhar !== 0) {
            const data = {
                aadhar: aadhar,
                address: accounts,
                castedto: CANDIDATELIST[option]
            }

            axios.post('http://localhost:5000/checkaadhar', data).then(res => {
                if (res.data.msg === 'ACCEPTED') {
                    votecandidate(option);
                    setErrmsg("VOTE POLLED SUCCESSFULLY");
                }
                else if (res.data.msg === 'REJECTED') {
                    window.alert("THE PERSON ALREADY VOTED");
                    setErrmsg("THE PERSON ALREADY VOTED");
                }
            }).catch(err => {
                window.alert("THE PERSON ALREADY VOTED");
                setErrmsg("THE PERSON ALREADY VOTED");
            })
        }
        else {
            window.alert("Something Went Wrong")
        }
    }
    return (
        <div className="container-fluid">
            <h2>ELECTION CANDIDATES</h2>
            <div className="row justify justify-center">
                <div className="card" style={{ width: 200 }}>
                    <img className="card-img-top" src="/eps.jpg" alt="" />
                    <div className="card-body">
                        <h5 className="card-title">Edapadi Palani Sami</h5>
                        <p className="card-text">ADMK</p>
                        <h5>CANDIDATE 1</h5>
                    </div>
                </div>
                <div className="card" style={{ width: 200 }}>
                    <img className="card-img-top" src="/stalin.jpg" alt="" />
                    <div className="card-body">
                        <h5 className="card-title">MK STALIN</h5>
                        <p className="card-text">DMK</p>
                        <h5>CANDIDATE 2</h5>
                    </div>
                </div>
                <div className="card" style={{ width: 200 }}>
                    <img className="card-img-top" src="/seeman.jpg" alt="" />
                    <div className="card-body">
                        <h5 className="card-title">SEEMAN</h5>
                        <p className="card-text">NTK</p>
                        <h5>CANDIDATE 3</h5>
                    </div>
                </div>
                <div className="card" style={{ width: 200 }}>
                    <img className="card-img-top" src="/valla.jpg" alt="" />
                    <div className="card-body">
                        <h5 className="card-title">VALLA DURAI K</h5>
                        <p className="card-text">VDK</p>
                        <h5>CANDIDATE 4</h5>
                    </div>
                </div>
                <div className="card" style={{ width: 200 }}>
                    <img className="card-img-top" src="/vimal.jpg" alt="" />
                    <div className="card-body">
                        <h5 className="card-title">VIMAL SAI PRASAD</h5>
                        <p className="card-text">RSP</p>
                        <h5>CANDIDATE 5</h5>
                    </div>
                </div>
                <div className="card" style={{ width: 200 }}>
                    <img className="card-img-top" src="/gpmuthu.jpg" alt="" />
                    <div className="card-body">
                        <h5 className="card-title">GP MUTHU</h5>
                        <p className="card-text">JMK</p>
                        <h5>CANDIDATE 6</h5>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="mt-4 text-center" style={{ color: '#000' }}>
                        <h2>Election Result</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">PARTY</th>
                                    <th scope="col">VOTES</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>{candidate1.name}</td>
                                    <td>ADMK</td>
                                    <td>{candidate1.votecount}</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>{candidate2.name}</td>
                                    <td>DMK</td>
                                    <td>{candidate2.votecount}</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>{candidate3.name}</td>
                                    <td>NTK</td>
                                    <td>{candidate3.votecount}</td>
                                </tr>
                                <tr>
                                    <th scope="row">4</th>
                                    <td>{candidate4.name}</td>
                                    <td>VDK</td>
                                    <td>{candidate4.votecount}</td>
                                </tr>
                                <tr>
                                    <th scope="row">5</th>
                                    <td>{candidate5.name}</td>
                                    <td>RSP</td>
                                    <td>{candidate5.votecount}</td>
                                </tr>
                                <tr>
                                    <th scope="row">6</th>
                                    <td>{candidate6.name}</td>
                                    <td>JMK</td>
                                    <td>{candidate6.votecount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-6">
                    <h3>CAST YOUR VOTE</h3>
                    <form className="form-group" onSubmit={(e) => onsubmitform(e)}>
                        <input className="form-control" placeholder="Enter Aadhaar ID" type="number" onChange={(e) => setAadhar(e.target.value)} />
                        <br></br>
                        <select name="candidate" className="form-control" onChange={(e) => onchangeSelect(e)}>
                            <option defaultValue value="">Select</option>
                            <option value="1">{candidate1.name}</option>
                            <option value="2">{candidate2.name}</option>
                            <option value="3">{candidate3.name}</option>
                            <option value="4">{candidate4.name}</option>
                            <option value="5">{candidate5.name}</option>
                            <option value="6">{candidate6.name}</option>
                        </select>
                        <br />
                        Your Aadhar Number: <b>{aadhar}</b>
                        <br />
                        Your Account Address : <b>{accounts}</b>
                        <br></br>
                        Chosen Candidate: <b>{CANDIDATELIST[Number(option)]}</b>
                        <br></br>
                        <button className="btn btn-primary w-100">Vote Candidate {option}</button>

                        <br></br>
                        {errmsg}
                    </form>
                </div>
            </div>
        </div>
    )
}
