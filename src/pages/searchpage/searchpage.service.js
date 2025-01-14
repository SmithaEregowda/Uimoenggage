export  function saveFilterSet(requestOptions) {
    const data =fetch(`https://nodemoenggage.vercel.app/list/create`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }
   export  function updateFilterSet(requestOptions,listId) {
    const data =fetch(`https://nodemoenggage.vercel.app/list/${listId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function getFilterSet(requestOptions,listId) {
    const data =fetch(`https://nodemoenggage.vercel.app/list/single/${listId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }