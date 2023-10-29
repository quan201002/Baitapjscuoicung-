const tkErr = document.getElementById("tbTKNV");
const nameErr = document.getElementById("tbTen");
const emailErr = document.getElementById("tbEmail");
const passErr = document.getElementById("tbMatKhau");
const ngayErr = document.getElementById("tbNgay");
const luongErr = document.getElementById("tbLuongCB");
const chucvuErr = document.getElementById("tbChucvu");
const giolamErr = document.getElementById("tbGiolam");
var isEdit = false;
var dsnv = [];
var indexUpdate = -1;
var dataJSON = localStorage.getItem("DSNV")
  ? JSON.parse(localStorage.getItem("DSNV"))
  : [];
dsnv = dataJSON.map(function (item) {
  return new NhanVien(
    item.tk,
    item.name,
    item.email,
    item.pass,
    item.luongCB,
    item.chucvu,
    item.gioLam,
    item.ngayLam
  );
});
showoff(dsnv);

function them() {
  var tk = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var pass = document.getElementById("password").value;
  var ngayLam = document.getElementById("datepicker").value;
  var luongCB = document.getElementById("luongCB").value * 1;
  var chucvu = document.getElementById("chucvu").value;

  var gioLam = document.getElementById("gioLam").value;
  var isValid =
    kttk(tk, 4, 6, "tbTKNV") &
    ktemail(email) &
    ktName(name) &
    ktPass(pass) &
    ktngaylam(ngayLam) &
    ktluong(luongCB) &
    ktchucvu(chucvu) &
    ktgiolam(gioLam);
  if (isValid) {
    var nhanvien = new NhanVien(
      tk,
      name,
      email,
      pass,
      luongCB,
      chucvu,
      gioLam,
      ngayLam
    );
    dsnv.push(nhanvien);
    localStorage.setItem("DSNV", JSON.stringify(dsnv));
    showoff(dsnv);
  }
}
function kttk(tk, min, max, tkError) {
  var isCor = false;
  for (var i = 0; i < dsnv.length; i++) {
    if (tk == dsnv[i].tk) {
      isCor = true;
    }
  }
  if (tk.trim() == "") {
    document.getElementById(
      tkError
    ).innerText = `tài khoản không được để trống`;
    return false;
  } else if (isCor) {
    document.getElementById(tkError).innerText = `Tài khoản đã tồn tại`;
    return false;
  } else if (tk.length >= min && tk.length <= max) {
    document.getElementById(tkError).innerText = "";
    return true;
  } else {
    document.getElementById(
      tkError
    ).innerText = `Độ dài tài khoản phải từ ${min} đến ${max} kí tự`;
    return false;
  }
}

function kttkEdit(tk, min, max, tkError) {
  var isCor = false;
  for (var i = 0; i < dsnv.length; i++) {
    if (tk == dsnv[i].tk) {
      isCor = true;
    }
  }
  if (tk.trim() == "") {
    document.getElementById(
      tkError
    ).innerText = `tài khoản không được để trống`;
    return false;
  } else if (tk.length >= min && tk.length <= max) {
    document.getElementById(tkError).innerText = "";
    return true;
  } else {
    document.getElementById(
      tkError
    ).innerText = `Độ dài tài khoản phải từ ${min} đến ${max} kí tự`;
    return false;
  }
}

function ktemail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var isValid = re.test(email);
  if (email.trim() == "") {
    document.getElementById("tbEmail").innerText = "Email không được để trống";
    return false;
  } else if (isValid) {
    document.getElementById("tbEmail").innerText = "";
    return true;
  }
  document.getElementById("tbEmail").innerText = "Email không hợp lệ";
  return false;
}

function ktName(name) {
  const re =
    /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/gm;
  if (name.trim() == "") {
    document.getElementById("tbTen").innerText = "Tên không được để trống";
    return false;
  } else if (!re.test(name)) {
    document.getElementById("tbTen").innerText =
      "Tên không hợp lệ vui lòng nhập lại";
    return false;
  } else {
    document.getElementById("tbTen").innerText = "";
    return true;
  }
}
function ktngaylam(ngayLam) {
  var re = /^\d{2}([./-])\d{2}\1\d{4}$/;
  if (ngayLam.length == 0) {
    document.getElementById("tbNgay").innerText =
      "Ngày làm không được để trống";
    return false;
  } else if (!ngayLam.match(re)) {
    document.getElementById("tbNgay").innerText =
      "Ngày phải đúng định dạng mm/dd/yyyy";
    return false;
  } else {
    document.getElementById("tbNgay").innerText = "";
    return true;
  }
}
function ktluong(luongCB) {
  if (luongCB == "") {
    document.getElementById("tbLuongCB").innerText = "lương không để trống";
    return false;
  } else if (luongCB < 1000000 || luongCB > 20000000) {
    document.getElementById("tbLuongCB").innerText =
      "lương cơ bản phải từ 1.000.000 đến 20.000.000";
    return false;
  } else {
    document.getElementById("tbLuongCB").innerText = "";
    return true;
  }
}
function ktchucvu(chucvu) {
  if (chucvu == "Sếp" || chucvu == "Trưởng phòng" || chucvu == "Nhân viên") {
    document.getElementById("tbChucVu").innerText = "";
    return true;
  } else {
    document.getElementById("tbChucVu").innerText = "chức vụ không hợp lệ";
    return false;
  }
}
function ktgiolam(gioLam) {
  if (gioLam.trim() == "") {
    document.getElementById("tbGiolam").innerText =
      "Giờ làm không được để trống";
  } else if (gioLam >= 80 && gioLam <= 200) {
    document.getElementById("tbGiolam").innerText = "";
    return true;
  } else {
    document.getElementById("tbGiolam").innerText =
      "Giờ làm phải từ 80 đến 200 giờ";
    return false;
  }
}
function ktPass(pass) {
  const re = /(?=.*\d.*)(?=.*[a-zA-Z].*)(?=.*[!#\$%&\?].*).{6,}/;
  if (pass.trim() == "") {
    document.getElementById("tbMatKhau").innerText =
      "Mật khẩu không được để trống";
    return false;
  } else if (!pass.match(re) || pass.length > 10) {
    document.getElementById("tbMatKhau").innerText =
      "Mật khẩu từ 6 - 10 kí tự (chứa ít nhất một kí tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
    return false;
  } else {
    document.getElementById("tbMatKhau").innerText = "";
    return true;
  }
}
function update() {
  var tk = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var pass = document.getElementById("password").value;
  var ngayLam = document.getElementById("datepicker").value;
  var luongCB = document.getElementById("luongCB").value * 1;
  var chucvu = document.getElementById("chucvu").value;
  var gioLam = document.getElementById("gioLam").value;
  var isValid =
    kttkEdit(tk, 4, 6, "tbTKNV") &
    ktemail(email) &
    ktName(name) &
    ktPass(pass) &
    ktngaylam(ngayLam) &
    ktluong(luongCB) &
    ktchucvu(chucvu) &
    ktgiolam(gioLam);
  if (isValid) {
    dsnv[indexUpdate] = new NhanVien(
      tk,
      name,
      email,
      pass,
      luongCB,
      chucvu,
      gioLam,
      ngayLam
    );
    localStorage.setItem("DSNV", JSON.stringify(dsnv));
    showoff(dsnv);
  }
}
function sua(tk) {
  var vitri = dsnv.findIndex(function (item) {
    return item.tk == tk;
  });
  isEdit = true;
  document.getElementById("btnThemNV").style.visibility = "hidden";
  document.getElementById("tknv").value = dsnv[vitri].tk;
  document.getElementById("tknv").disabled = true;
  document.getElementById("name").value = dsnv[vitri].name;
  document.getElementById("email").value = dsnv[vitri].email;
  document.getElementById("password").value = dsnv[vitri].pass;
  document.getElementById("datepicker").value = dsnv[vitri].ngayLam;
  document.getElementById("luongCB").value = dsnv[vitri].luongCB;
  document.getElementById("chucvu").value = dsnv[vitri].chucvu;
  document.getElementById("gioLam").value = dsnv[vitri].gioLam;
  indexUpdate = vitri;
}
function xoa(tk) {
  var vitri = dsnv.findIndex(function (item) {
    return item.tk == tk;
  });
  dsnv.splice(vitri, 1);
  localStorage.setItem("DSNV", JSON.stringify(dsnv));
  showoff(dsnv);
}
function timkiem() {
  var xeploai = document.getElementById("searchName").value;
  var dstk = [];
  dsnv.map(function (item) {
    if (item.xeploai() == xeploai) {
      dstk.push(item);
    }
  });
  showoff(dstk);
}
function showoff(dsnv) {
  var content = "";
  dsnv.map(function (item) {
    content += `
      <tr>
      <td>${item.tk}</td>
      <td>${item.name}</td>
      <td>${item.email}</td>
      <td>${item.ngayLam}</td>
      <td>${item.chucvu}</td>
      <td>${item.tongluong()}</td>
      <td>${item.xeploai()}</td>
      <td><button type="button" class="btn btn-danger" id="xoa" onclick="xoa('${
        item.tk
      }')">Xóa</button></td>
      <td><button type="button" class="btn btn-primary" id="btnSua" data-toggle="modal" data-target="#myModal" onclick="sua('${
        item.tk
      }')">Sửa</button></td>
  `;
  });
  document.getElementById("tableDanhSach").innerHTML = content;
}
function mo() {
  document.getElementById("btnThemNV").style.visibility = "visible";
  document.getElementById("tknv").disabled = false;
}
