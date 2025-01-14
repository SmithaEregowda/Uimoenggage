import React, { useEffect, useState } from 'react';
import { validResponseCodes } from '../../util';
import { Button, Input } from 'antd';
import styles from './searchpage.module.scss'
import { getFilterSet, saveFilterSet, updateFilterSet } from './searchpage.service';
import { useNavigate, useParams } from 'react-router';
import Cookies from "universal-cookie";

const  SearchPage=()=> {
  const [filter, setFilter] = useState('');
  const [images, setImages] = useState([]);
  const [loading,setLoading]=useState(false)
  const cookies = new Cookies(null, { path: '/' });
  const userId=cookies.get("user");
  const Authtoken=cookies.get("token");
  const [ImageList,setImageList]=useState([])
  const {listId}=useParams();

  const navigate=useNavigate();

  console.log(listId);

  useEffect(()=>{
    if(listId){
      const requestOptions = {
        method: 'GET',
         headers: { 'Content-Type': 'application/json',
         Authorization: `Bearer ${Authtoken}` }
      };
     getFilterSet(requestOptions,listId).then(data => {
       setFilter(data?.filterset?.filterName);
       setImageList(data?.filterset?.images);
       setImages(data?.filterset?.images?.map((item)=>item?.imagelink))
        setLoading(false)
    })
    }else{
      setFilter('');
      setImageList([]);
      setImages([])
    }
  },[listId])

  const applyFilter = () => {
    const baseURL = 'https://http.dog/';
    const imageContainer = [];
    const filterValue = filter.trim();
  
    // Validate filter input
    if (!filterValue) {
      alert('Please enter a filter code');
      return;
    }

    const regex = new RegExp(`^${filterValue.replace(/x/g, '\\d')}$`);

    let responseCodes = [];

    if (filterValue.length === 3 && !isNaN(filterValue)) {
      if (validResponseCodes.includes(filterValue)) {
        responseCodes.push(filterValue);
      }
    } else if (filterValue.includes('x')) {
      for (let i = 0; i <= 9; i++) {
        const code = filterValue.replace(/x/, i);
        if(code.includes('x')){
            for (let i = 0; i <= 9; i++) {
                let newcode=code.replace(/x/, i);
                if (validResponseCodes.includes(newcode)) {
                    responseCodes.push(newcode); 
                  }
            }
        }else{
            if (validResponseCodes.includes(code)) {
                responseCodes.push(code);
              }
        }
        
      }
    } 
    let imgsobj=[];
    responseCodes.forEach((code) => {
      imgsobj.push({
        code,
        imagelink:`${baseURL}${code}.jpg`
      })
      imageContainer.push(`${baseURL}${code}.jpg`);
    });
    setImageList(imgsobj)
    setImages(imageContainer);
  };

  const savefilterhandler=()=>{
    let formData={
      name:filter.trim(),
      userId:userId,
      images:ImageList
    }
    const requestOptions = {
      method: 'POST',
       headers: { 'Content-Type': 'application/json',
       Authorization: `Bearer ${Authtoken}` },
      body: JSON.stringify(formData)
    };
   saveFilterSet(requestOptions).then(data => {
      navigate('/listpage')
      setLoading(false)
  })
  }

  const updatefilterhandler=()=>{
    let formData={
      filterName:filter.trim(),
      userId:userId,
      images:ImageList
    }
    const requestOptions = {
      method: 'PUT',
       headers: { 'Content-Type': 'application/json',
       Authorization: `Bearer ${Authtoken}` },
      body: JSON.stringify(formData)
    };
   updateFilterSet(requestOptions,listId).then(data => {
      navigate('/listpage')
      setLoading(false)
    })
  }
  


  return (
    <div className={styles.searchWrapper}>
      <div className={styles.title}>Search Satus Code</div>
      <div className={styles.inputContainer}>
      <div className={styles.inputItem}>
      <Input
        type="text"
        id="filterInput"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Enter filter code"
        width={35}
      />
     
      <Button onClick={applyFilter}>Apply Filter</Button>
      {images.length>0&&
      <div> <Button onClick={listId?updatefilterhandler:savefilterhandler} type='primary'>
        {listId?"Update This Filter":"Save This Filter"}
      </Button></div>
        }
      </div>

      </div>
      {/* Rendered Images */}
      <div className={styles.imageContainer}>
        {images.length === 0 ? (
          <p>No images to display. Please apply a filter.</p>
        ) : (
          images.map((imgSrc, index) => (
            <div key={index} className={styles.imageItem}>
                <img  src={imgSrc} alt={`HTTP ${imgSrc}`}
             style={{ maxWidth: '250px', maxHeight: '250px', objectFit: 'cover' }} />
            </div>
          ))
        )}
      </div>
    
    </div>
  );
}

export default SearchPage;