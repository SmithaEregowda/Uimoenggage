import React, { useEffect, useState } from 'react';
import { getAllFiltersByUserId } from './listpage.service';
import { useNavigate } from 'react-router';
import Cookies from "universal-cookie";
import styles from './listpage.module.scss'
import moment from 'moment';
import { Button } from 'antd';

const ListPage=()=>{
    const [filtersets,setFiltersets]=useState([]);
    const cookies = new Cookies(null, { path: '/' });
    const userId=cookies.get("user");
    const Authtoken=cookies.get("token");
    const navigate=useNavigate()

    useEffect(()=>{
       if(userId){
        const requestOptions = {
            method: 'GET',
             headers: { 'Content-Type': 'application/json',
             Authorization: `Bearer ${Authtoken}` }
          };
         getAllFiltersByUserId(requestOptions,userId)
         .then(data => {
           setFiltersets(data?.filtersets);
        },(err)=>{
            console.log(err)
        })
       }
    },[userId])



    return(
        <div className={styles.listWrapper}>
            <div className={styles.cardWrapper}>
            {filtersets?.map((item)=>(
                <div key={item?._id} className={styles.card}>
                    <div>Filter Name: {item?.filterName}</div>
                    <div>Created At : {moment(item?.createdAt).format('DD/MM/YYYY HH:mm')}</div>
                    <div>Response Codes : {item?.images?.map((img)=>img?.code)?.join(',')}</div>
                    <div className={styles.actionBtns}>
                        <div><Button onClick={()=>navigate(`/search/${item?._id}`)}>Edit</Button></div>
                        <div><Button>Delete</Button></div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    )
}
export default ListPage;