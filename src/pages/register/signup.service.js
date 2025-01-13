export  function signup(requestOptions) {
    const data =fetch(`https://nodemoenggage.vercel.app/user/signup`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function LoginService(requestOptions) {
    const data =fetch(`https://nodemoenggage.vercel.app/user/login`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function getAllUsers(requestOptions,userId) {
    const data =fetch(`https://nodemoenggage.vercel.app/user/getusers/${userId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }