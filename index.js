const URL = 'https://crudcrud.com/api/46ccaced62f74452ba5e3e6a21d5b794/detail'
function handleClick(event){
    event.preventDefault()

const details = {
    name:event.target.userName.value,
    email:event.target.userEmail.value,
    phone:event.target.phone.value,
    select:event.target.bus.value
}

// console.log(details)
axios.post(`${URL}`,details).then((res) => {
    console.log(res.data)
    displayItem(res.data)
}).catch((err) => {
    console.log(err)
});

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

function getUserData(){
    axios.get(`${URL}`).then((res)=>{
        console.log(res.data)
        const existingUser = res.data
    }).catch((err)=>{console.log(err)})
}

function deleteUser(userId,listItem){
axios.delete(`${URL}/${userId}`).then(()=>{
    listItem.remove();
}).catch((err)=>{console.log(err)})
}

function updateUser(userId){
    axios.get(`${URL}/${userId}`).then((res)=>{
const existing = res.data;
document.getElementById('userName').value = existing.name;
document.getElementById('userEmail').value = existing.email;
document.getElementById('phone').value = existing.phone;
document.getElementById('bus').value = existing.select;
    }).catch((err)=>{
        console.log(err)
    })
}



//filter dropdown
document.getElementById('filter').addEventListener('change', handleFilterChange);

function handleFilterChange(event) {
    const selectedBus = event.target.value;
    getUserData(selectedBus);
}

function getUserData(selectedBus) {
    axios.get(`${URL}`).then((res) => {
        const data = res.data;
       
        const userList = document.getElementById('userList');
        userList.innerHTML = '';

        
        const filteredData = selectedBus ? data.filter(item => item.select === selectedBus) : data;

        filteredData.forEach(item => displayItem(item));
    }).catch((err) => {
        console.log(err);
    });
}
