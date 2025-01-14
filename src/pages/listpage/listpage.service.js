export  function getAllFiltersByUserId(requestOptions,userId) {
    const data =fetch(`https://nodemoenggage.vercel.app/list/${userId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function deletebyListId(requestOptions,listId) {
    const data =fetch(`https://nodemoenggage.vercel.app/list/${listId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }