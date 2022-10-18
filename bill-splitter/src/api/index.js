
export function saveUserData(user){
    return new Promise((resolve)=>{
   localStorage.setItem("bill-splitter-user", JSON.stringify(user));
    console.log(user)
    resolve(
        JSON.parse(localStorage.getItem('bill-splitter-user') || []),
      )
        ;})}

        export function requestUserData(){
            return new Promise((resolve)=>{
                const user = localStorage.getItem('bill-splitter-user'||[])
                console.log(JSON.parse(user))
        resolve(JSON.parse(user));});}

        export function clearUserData(){
            console.log(" clear user")
            return new Promise(()=>{
        localStorage.removeItem("bill-splitter-user");
                ;})}
        

// export function requestCategories(){
//     return new Promise((resolve)=>{
//         const categories = localStorage.getItem("categories"||[])

//         resolve(JSON.parse(categories));});}
        

// export function saveData({notes, categories}){
//     return new Promise((resolve)=>{
//    localStorage.setItem("notes", JSON.stringify(notes));
//    localStorage.setItem("categories", JSON.stringify(categories));
//     console.log(notes)
//     resolve({
//         categories: JSON.parse(localStorage.getItem('categories') || '[]'),
//         notes: JSON.parse(localStorage.getItem('notes') || '[]'),
//       })
//         ;})}

      