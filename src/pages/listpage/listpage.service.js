export  function getAllFiltersByUserId(requestOptions,userId) {
    const data =fetch(`https://nodemoenggage-i4sod0x5k-smithaeregowdas-projects.vercel.app/list/${userId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function deletebyListId(requestOptions,listId) {
    const data =fetch(`https://nodemoenggage-i4sod0x5k-smithaeregowdas-projects.vercel.app/list/${listId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }