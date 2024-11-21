import React, { useState } from 'react';

// const SearchList = () => {
//   const [searchTerm, setSearchTerm] = useState('');
  
//   const list = [
//     { id: 1, name: 'APPLE' },
//     { id: 2, name: 'Banana' },
//     { id: 3, name: 'Orange' },
//     { id: 4, name: 'Grapes' },
//     { id: 5, name: 'Mango' }
//   ];

//   // Filter the list based on the search term
//   const filteredList = list.filter(item =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <ul>
//         {filteredList.map(item => (
//           <li key={item.id}>{item.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };
// import { useForm } from "react-hook-form"


// export default function SearchList() {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm()


//   const onSubmit = (data) => console.log(data)


//   console.log(watch("example")) 


//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//     <input defaultValue="test" {...register("example")} className='border'  /><br></br>


//       <input {...register("exampleRequired", { required: true })} className='border'/><br></br>
    
//       { errors.exampleRequired && <span>This field is required</span>}


//       <input type="submit"  className='border-1 bg-purple-600 text-white'/>
//     </form>
//   )
// }
