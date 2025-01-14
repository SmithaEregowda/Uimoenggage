export  function saveFilterSet(requestOptions) {
    const data =fetch(`http://localhost:3030/list/create`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }
   export  function updateFilterSet(requestOptions,listId) {
    const data =fetch(`http://localhost:3030/list/${listId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function getFilterSet(requestOptions,listId) {
    const data =fetch(`http://localhost:3030/list/single/${listId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }