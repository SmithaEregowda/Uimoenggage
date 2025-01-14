export  function getAllFiltersByUserId(requestOptions,userId) {
    const data =fetch(`http://localhost:3030/list/${userId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }