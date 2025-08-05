const form = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');
let students = JSON.parse(localStorage.getItem('students')) || [];

//save to local storage
function saveToLocalStorage(){
    localStorage.setItem('students', JSON.stringify(students));
}

//Render students entries
function renderStudents(){
    studentList.innerHTML = '';
    students.forEach((student,index)=>{
        const div = document.createElement('div');
        div.className = 'student-entry';
        div.innerHTML = `
        <span><strong>${student.name}</strong> | ID: ${student.id} | Email: ${student.email} | Contact: ${student.contact}</span>
        <div class="actions">
        <button onClick="editStudent(${index})"><i class="fas fa-edit"></i> Edit</button>
        <button onClick="deleteStudent(${index})"><i class="fas fa-trash-alt"></i> Delete</button>
         </div>
        `;
        studentList.appendChild(div);
    });

    //scrollbar
    setTimeout(()=>{
        const thresholdHeight = 200;
        if(studentList.scrollHeight>thresholdHeight){
            studentList.style.overflowY = 'auto';
        }else{
            studentList.style.overflowY = 'hidden';
        }
    })

}

// Validate input entries

function validateForm(name, id, email, contact) {
    const nameVal = /^[A-Za-z]+$/;
    const idVal = /^[0-9]+$/;
    const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactVal = /^[0-9]{10,}$/;

    if(!nameVal.test(name)) return alert("Name must contain only letters");
    if(!idVal.test(id)) return alert("Student id must be numeric");
    if(!emailVal.test(email)) return alert("Invalid email format");
    if(!contactVal.test(contact)) return alert("Contact must have atleast 10 digits");

    return true;
}

//Form submit
form.addEventListener('submit',function(e){
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const id = document.getElementById('studentId').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();

    if(!name || !id || !email || !contact) {
        alert('Please fill in all fields. ');
        return;
    }

    if(!validateForm(name,id,email,contact)) return;

    //For unique student ID

    const duplicate = students.some(student => student.id === id);
    if(duplicate){
        alert("Student ID already exists.");
        return;
    }

    students.push({ name , id , email , contact});
    saveToLocalStorage();
    renderStudents();
    form.reset();
})

//Edit student entry
function editStudent(index){
    const student = students[index];
    document.getElementById('name').value = student.name;
    document.getElementById('studentId').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;
    
    students.splice(index, 1);
    saveToLocalStorage();
    renderStudents();
}

//Delete Student entry
function deleteStudent(index){
    if(confirm("Are you sure you want to delete this record ? ")){
        students.splice(index, 1);
        saveToLocalStorage();
        renderStudents();
    }
    

}

renderStudents();