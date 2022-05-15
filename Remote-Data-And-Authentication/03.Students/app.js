async function loadStudents() {
    const students = await getAllStudents();
    table.replaceChildren(...students.map(createTableRow));
}

const url = 'http://localhost:3030/jsonstore/collections/students';

const table = document.querySelector('tbody');
const form = document.querySelector('#form');
form.addEventListener('submit', onSubmit);

loadStudents();

async function getAllStudents() {
    try {
        const response = await fetch(url);

        if (response.statusText != 'OK') {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return Object.values(data);
    } catch (error) {
        alert(error.message);
    }
}

async function createStudent(data) {
    try {
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.statusText != 'OK') {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        alert(error.message);
    }
}

async function onSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = formData.get('facultyNumber');
    const grade = formData.get('grade');

    if (firstName == '' || lastName == '' || facultyNumber == '' || grade == '') {
        return;
    }

    const student = {
        firstName,
        lastName,
        facultyNumber,
        grade
    };
    await createStudent(student);
    table.appendChild(createTableRow(student));

    form.reset();
}

function createTableRow(data) {
    const row = document.createElement('tr');
    row.innerHTML = `<th>${data.firstName}</th>
<th>${data.lastName}</th>
<th>${data.facultyNumber}</th>
<th>${data.grade}</th>`;

    return row;
}