import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";


function User(Props) {


    let tokenaccess = JSON.parse(localStorage.getItem("auth")).access
    //follow action
    const followaction = () => {
        axios.get(`https://mini-twitter-app2.herokuapp.com/follow/${Props.info.username}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(tokenaccess)
            }
        })
            .then((res) => { console.log(res.data, res.status); })
            .catch((err) => console.log(err))
    }

    return (
        <div className="follower m-4 p-3" style={{ border: "2px solid grey", borderRadius: "4px", position: "relative" }} onClick={() => { window.location.href = `/${Props.info.username}` }}>
            {Props.info.propic ? (
                <img src={`https://mini-twitter-app2.herokuapp.com${Props.info.propic}`} style={{ width: "80px", height: "80px", borderRadius: "80px" }} />
            ) : (
                <img src="https://via.placeholder.com/350x150" style={{ width: "80px", height: "80px", borderRadius: "80px" }} />
            )}

            <h1>{Props.info.username}</h1>
            <Link className="text-decoration-none" to={`/${Props.info.username}/followers`} onClick={e => { e.stopPropagation() }}><span className="h5">Followers : {Props.info.followers}</span></Link>
            <button type="button" className="btn btn-light" style={{ color: "white", position: "absolute", top: "70%", left: "75%", width: "20%", backgroundColor: "cadetblue" }} onClick={(e) => { e.stopPropagation(); followaction(); }}>{Props.info.ifollow ? "unfollow" : "follow"}</button>
        </div >
    )
}

export default User;