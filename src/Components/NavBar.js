import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import CreateTweet from "./CreateTweet";
import { CreateTweetContext } from "./CreateTweetContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";

library.add(faTwitter)
function NavBar() {

    //show message state
    const [ShowMessage, setShowMessage] = useState(false)
    const [makediffmes, setmakediffmes] = useState(false)
    const [ShowNot, setShowNot] = useState(false)
    const [makediffnot, setmakediffnot] = useState(false)

    //messagestate
    const [mes, setmes] = useState([]);
    const [not, setnot] = useState([]);

    const [showCreate, setshowCreate] = useState(false)

    const [userPropic, setPropic] = useState("")

    //get all message
    useEffect(() => {
        if (!localStorage.getItem("meslength"))
            localStorage.setItem("meslength", "0")

        if (!localStorage.getItem("notlength"))
            localStorage.setItem("notlength", "0")

        let tokenaccess = JSON.parse(localStorage.getItem("auth")).access


        const interval = setInterval(() => {
            axios.get(`https://mini-twitter-app2.herokuapp.com/getallmessages/`, {
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "multipart/form-data",
                    'Authorization': 'Bearer ' + String(tokenaccess)
                }
            })
                .then((res) => { console.log(res.data, res.status); setmes(res.data.message); setnot(res.data.notlist) })
                .catch((err) => console.log(err))

        }, 1000)

        return () => clearInterval(interval);

    }, [])

    //on fetch message
    useEffect(() => {
        if (mes.length > parseInt(localStorage.getItem("meslength"))) {
            setmakediffmes(true)

        }

    }, [mes])

    useEffect(() => {
        if (not.length > parseInt(localStorage.getItem("notlength"))) {
            setmakediffnot(true)

        }

    }, [not])

    useEffect(() => {
        setPropic(JSON.parse(localStorage.getItem("userinfo")).propic)
    }, [JSON.parse(localStorage.getItem("userinfo")).propic])

    return (
        <div style={{ backgroundColor: "#36a2b9" }} className="d-flex justify-content-between align-items-center w-100">
            <div>
                <ul className="nav d-flex align-items-center">
                    <li className="nav-item d-flex align-items-center">
                        <Link to={"/home"}>
                            <FontAwesomeIcon icon="fa-brands fa-twitter" className="text-light" style={{ fontSize: "55px", margin: "10px" }} />
                        </Link>
                        {/* <span className="h3 text-light">MiniTwitter</span> */}
                        <Link className="nav-link text-light h3" to="/home">MiniTwitter</Link>
                    </li>
                    {/* <li className="nav-item">
                    <Link className="nav-link text-light h4" to="/home">Home</Link>
                </li> */}
                    {/* <li className="nav-item">
                    <Link className="nav-link text-light h4" to={`/${JSON.parse(localStorage.getItem("userinfo")).username}`}>mytweets</Link>
                </li> */}
                    {/* <li className="nav-item">
                    <Link className="nav-link text-light h4" to={`/${JSON.parse(localStorage.getItem("userinfo")).username}/relpies`}>relpies</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-light h4" to={`/${JSON.parse(localStorage.getItem("userinfo")).username}/likes`}>likes</Link>
                </li> */}
                </ul>

            </div>
            <div>



                <ul className="nav align-items-center">
                    <div className="nav-item messagedivshow text-light" style={{ position: "relative" }}>
                        <button type="button" className={`btn ${makediffmes ? " btn-warning" : "btn-light"} btn-outline-dark `} style={{ color: "#36a2b9" }} onClick={() => { setmakediffmes(false); setShowNot(false); setShowMessage(!ShowMessage); localStorage.setItem("meslength", mes.length); }}>Messages</button>
                        <div className={ShowMessage ? "d-block" : "d-none"} style={{ position: "absolute", width: "400px", height: "600px", left: "430px", top: "75px", overflowX: "auto", backgroundColor: "cadetblue", zIndex: "2", color: "whitesmoke", borderRadius: "6px" }}>
                            <h3 className="m-3">Messages</h3>
                            {mes.map((e) => {
                                return (
                                    <div className="message d-flex" onClick={() => { window.location.href = `/message/${e.from}` }}>
                                        {e.propic ? (
                                            <img src={`https://mini-twitter-app2.herokuapp.com${e.propic}`} style={{ width: "80px", height: "80px", borderRadius: "80px", marginLeft: "15px", marginRight: "15px" }} />
                                        ) : (
                                            <img src="https://via.placeholder.com/350x150" style={{ width: "80px", height: "80px", borderRadius: "80px", marginLeft: "15px", marginRight: "15px" }} />
                                        )}
                                        <div>
                                            <h2>{e.from}</h2>
                                            <p style={{ fontSize: "20px" }}>{e.message}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <Link to="/message" type="button" className="btn btn-light btn-outline-dark ms-2" style={{ color: "#36a2b9" }}>Start A Message</Link>
                    </div>

                    <div className="nav-item messagedivshow text-light" style={{ position: "relative" }}>
                        <button type="button" className={`btn ${makediffnot ? "btn-warning" : "btn-light"} ms-2 me-2 btn-outline-dark`} style={{ color: "#36a2b9" }} onClick={() => { setmakediffnot(false); setShowMessage(false); setShowNot(!ShowNot); localStorage.setItem("notlength", not.length); }} >Notifications</button>
                        <div className={ShowNot ? "d-block" : "d-none"} style={{ position: "absolute", width: "450px", height: "600px", left: "150px", top: "75px", overflowX: "auto", backgroundColor: "cadetblue", zIndex: "2", color: "whitesmoke", borderRadius: "6px" }}>
                            <h3 className="m-3">Notifications</h3>
                            {not.map((e) => {
                                return (
                                    <div className="message d-flex" onClick={() => { window.location.href = `/tweet/${e.id}` }}>
                                        {e.propic ? (
                                            <img src={`https://mini-twitter-app2.herokuapp.com${e.propic}`} style={{ width: "80px", height: "80px", borderRadius: "80px", marginLeft: "15px", marginRight: "15px" }} />
                                        ) : (
                                            <img src="https://via.placeholder.com/350x150" style={{ width: "80px", height: "80px", borderRadius: "80px", marginLeft: "15px", marginRight: "15px" }} />
                                        )}
                                        <div>
                                            <h2>{e.username}</h2>
                                            <p style={{ fontSize: "20px" }}>{e.action} your tweet</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>


                    <li className="nav-item tweetbutton text-light">
                        <button type="button" className="btn btn-light btn-outline-dark" style={{ color: "#36a2b9" }} onClick={() => { setshowCreate(!showCreate) }}>Tweet</button>
                        <Link to="/explore" type="button" className="btn btn-light m-2 btn-outline-dark" style={{ color: "#36a2b9" }}>Explore</Link>
                        <Link to="/logout" type="button" className="btn btn-light btn-outline-dark" style={{ color: "#36a2b9" }}>Logout</Link>
                        <CreateTweetContext.Provider value={{ showCreate, setshowCreate }}>
                            <CreateTweet />
                        </CreateTweetContext.Provider>
                    </li>


                    <li className="nav-item userdatashow text-light">
                        <div className="user_info d-flex nav-link">
                            <Link className="nav-link text-light d-flex align-items-center" to={`/${JSON.parse(localStorage.getItem("userinfo")).username}`}>
                                {userPropic && (
                                    <img style={{ maxWidth: "100%", width: "50px", height: "50px", borderRadius: "30px" }} src={`https://mini-twitter-app2.herokuapp.com${userPropic}`} alt="Cinque Terre" />
                                )}
                                <h3 className="ms-2 text-light">{JSON.parse(localStorage.getItem("userinfo")).username}</h3>
                            </Link>
                        </div>
                    </li>

                </ul>
            </div >



        </div >


    )
}

export default NavBar;