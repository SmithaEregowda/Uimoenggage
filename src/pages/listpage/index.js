import React, { useEffect, useState } from 'react';
import { deletebyListId, getAllFiltersByUserId } from './listpage.service';
import { useNavigate } from 'react-router';
import Cookies from "universal-cookie";
import styles from './listpage.module.scss'
import moment from 'moment';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const ListPage=()=>{
    const [filtersets,setFiltersets]=useState([]);
    const cookies = new Cookies(null, { path: '/' });
    const userId=cookies.get("user");
    const Authtoken=cookies.get("token");
    const navigate=useNavigate()

    useEffect(()=>{
       if(userId){
        getAllFilterSets(userId);
       }
    },[userId]);

    const getAllFilterSets=(userId)=>{
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

    const deletesethandler=(listId)=>{
        const requestOptions = {
            method: 'DELETE',
             headers: { 'Content-Type': 'application/json',
             Authorization: `Bearer ${Authtoken}` }
          };
         deletebyListId(requestOptions,listId)
         .then(data => {
           getAllFilterSets(userId);
        },(err)=>{
            console.log(err)
        })
    }



    return(
        <div className={styles.listWrapper}>
            <div className="navWrapper">
      <Link to="/search">Search List</Link>
      <Link to="/listpage">Filter List</Link>
      </div>
            <div className={styles.cardWrapper}>
            {filtersets?.map((item)=>(
                <div key={item?._id} className={styles.card}>
                    <div className={styles.title}>Filter Name: {item?.filterName}</div>
                    <div className={styles.date}>Created At : {moment(item?.createdAt).format('DD/MM/YYYY HH:mm')}</div>
                    <div className={styles.code}>Response Codes : {item?.images?.map((img)=>img?.code)?.join(',')}</div>
                    <div className={styles.actionBtns}>
                        <div className={styles.btn}><Button type='primary' onClick={()=>navigate(`/search/${item?._id}`)}>Edit</Button></div>
                        <div className={styles.btn}><Button onClick={()=>deletesethandler(item?._id)}>Delete</Button></div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    )
}
export default ListPage;