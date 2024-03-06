const URL = 'https://crudcrud.com/api/4c88c827d13d4dddb43c91ede0491c0e/details'
async function handleClick(event){
    event.preventDefault()

const details = {
    name:event.target.userName.value,
    email:event.target.userEmail.value,
    phone:event.target.phone.value,
    select:event.target.bus.value
}

// console.log(details)

    const res =  await axios.post(`${URL}`,details)
    console.log(res.data)
    displayItem(res.data)

document.getElementById('userName').value = "";
document.getElementById('userEmail').value = "";
document.getElementById('phone').value = "";
document.getElementById('bus').value = "";

}


function displayItem(details){
const userList = document.getElementById('userList')
listItem = document.createElement('li')
listItem.appendChild(document.createTextNode(`${details.name} ${details.email} ${details.phone} ${details.select}`))
userList.appendChild(listItem)

const deleteBtn = document.createElement('button')
deleteBtn.appendChild(document.createTextNode('Delete'))
listItem.appendChild(deleteBtn)


const editBtn = document.createElement('button')
editBtn.appendChild(document.createTextNode('Edit'))
listItem.appendChild(editBtn)


deleteBtn.addEventListener('click',(event)=>{
const userId = details._id
deleteUser(userId,listItem)
})


editBtn.addEventListener('click',(event)=>{
userList.removeChild(event.target.parentElement)
const userId = details._id
updateUser(userId)
})


}

async function getUserData(){
    
        const res = await axios.get(`${URL}`)
        const existingUser = res.data
    
}

async function deleteUser(userId,listItem){
    
        const res = await axios.delete(`${URL}/${userId}`)
        listItem.remove();

}

async function updateUser(userId){

const res = await axios.get(`${URL}/${userId}`)
const existing = res.data;
document.getElementById('userName').value = existing.name;
document.getElementById('userEmail').value = existing.email;
document.getElementById('phone').value = existing.phone;
document.getElementById('bus').value = existing.select;
    
}



//filter dropdown
document.getElementById('filter').addEventListener('change', handleFilterChange);

async function handleFilterChange(event) {
    const selectedBus = event.target.value;
    await getUserData(selectedBus);
}

async function getUserData(selectedBus) {
    

    
    const res = await axios.get(`${URL}`)
        const data = res.data;
       
        const userList = document.getElementById('userList');
        userList.innerHTML = '';

        
        const filteredData = selectedBus ? data.filter(item => item.select === selectedBus) : data;

        filteredData.forEach(item => displayItem(item));
    }
  


