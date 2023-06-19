function emailIsVal(email) {
    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)
}

function save_info() {
    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById("Email").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let gender = '';
    if (document.getElementById('male').checked) {
        gender = document.getElementById('male').value;
    } else if (document.getElementById('female').checked) {
        gender = document.getElementById('female').value;
    }

    //check fullname value
    if (fullname.trim().length == 0) {
        document.getElementById('fullname-error').innerHTML = "Vui lòng nhập họ và tên";
        fullname = '';
        return false;
    } else if (fullname.trim().length <= 2) {
        document.getElementById('fullname-error').innerHTML = "Không được nhỏ hơn hai kí tự";
        fullname = '';
        return false;
    }
    else {
        document.getElementById('fullname-error').innerHTML = "";
    }

    //check email value
    if (email.trim().length == 0) {
        document.getElementById('email-error').innerHTML = "Vui lòng nhập email";
        email = '';
        return false;
    } else if (!emailIsVal(email)) {
        document.getElementById('email-error').innerHTML = "Email không đúng định dạng";
        email = '';
        return false;
    } else {
        document.getElementById('email-error').innerHTML = "";
    }

    //check phone value
    if (phone.trim().length == 0) {
        document.getElementById('phone-error').innerHTML = "Vui lòng nhập số điện thoại";
        phone = '';
        return false;
    } else if (phone.trim().length > 10 || phone.trim().length < 10) {
        document.getElementById('phone-error').innerHTML = "Số điện thoại không đúng";
        phone = '';
        return false;
    } else {
        document.getElementById('phone-error').innerHTML = "";
    }

    //check address value
    if (address.trim().length == 0) {
        address = '';
        document.getElementById('address-error').innerHTML = "Vui lòng nhập địa chỉ";
        return false;
    }
    else {
        document.getElementById('address-error').innerHTML = "";
    }

    //check gender value
    if (gender == '') {
        document.getElementById('gender-error').innerHTML = "Vui lòng chọn giới tính";
        return false;
    } else {
        document.getElementById('gender-error').innerHTML = "";
    }

    if (fullname && email && address && gender) {
        //Lưu vào danh sách sinh viên

        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

        students.push({
            fullname: fullname,
            email: email,
            phone: phone,
            address: address,
            gender: gender,
        });

        localStorage.setItem('students', JSON.stringify(students));

        this.renderListStudent();
    }
    return true;
}

//Hiển thị danh sách sinh viên.
function renderListStudent() {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

    if (students.length === 0) {
        document.getElementById('list_student').style.display = 'none';
        return false;
    }

    document.getElementById('list_student').style.display = 'block';

    let tableContent = `<tr>
        <td width = '20'>#</td>
        <td>Họ và tên</td>
        <td>Email</td>
        <td>Số điện thoại</td>
        <td>Giới tính</td>
        <td>Địa chỉ</td>
        <td>Hành động</td>
    </tr>`;

    students.forEach((student, index) => {
        let studentId = index;
        let Gender = parseInt(student.gender) === 1 ? 'Nam' : 'Nữ';
        index++;
        tableContent += `<tr>
        <td>${index}</td>
        <td>${student.fullname}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>${Gender}</td>
        <td>${student.address}</td>
        <td>
            <a href='#' onclick='updateStudent(${studentId})'>Edit</a> | <a href='#' onclick='deleteStudent(${studentId})'>Delete</a>
        </td>
        </tr>`;
    })

    document.getElementById('listStudent').innerHTML = tableContent;
}

//Xóa sinh viên
function deleteStudent(id) {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    students.splice(id, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderListStudent();
}

//Sửa sinh viên
function updateStudent(id) {
    document.getElementById('submit').innerHTML = "Cập nhật";
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    document.getElementById('fullname').value = students[id].fullname;
    document.getElementById('Email').value = students[id].email;
    document.getElementById('phone').value = students[id].phone;
    document.getElementById('address').value = students[id].address;

    document.querySelector("#submit").onclick = function () {
        if (save_info() == true) {
            students[id].fullname = document.getElementById("fullname").value;
            students[id].email = document.getElementById("Email").value;
            students[id].phone = document.getElementById("phone").value;
            students[id].address = document.getElementById("address").value;

            localStorage.setItem('students', JSON.stringify(students));
            renderListStudent();

            document.getElementById('fullname').value = "";
            document.getElementById('Email').value = "";
            document.getElementById('phone').value = "";
            document.getElementById('address').value = "";

            document.getElementById('submit').innerHTML = "Lưu lại";
        }
    }
}


