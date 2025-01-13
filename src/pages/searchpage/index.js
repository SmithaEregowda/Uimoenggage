import React, { useState } from 'react';
import { validResponseCodes } from '../../util';
import { Button, Input } from 'antd';
import styles from './searchpage.module.scss'

const  SearchPage=()=> {
  const [filter, setFilter] = useState('');
  const [images, setImages] = useState([]);

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
  
    responseCodes.forEach((code) => {
      imageContainer.push(`${baseURL}${code}.jpg`);
    });

    setImages(imageContainer);
  };

  const savefilterhandler=()=>{

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
      <div> <Button onClick={savefilterhandler} type='primary'>Save This Filter</Button></div>
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