function NhanVien(tk, name, email, pass, luongCB, chucvu, gioLam, ngayLam) {
  this.tk = tk;
  this.name = name;
  this.email = email;
  this.pass = pass;
  this.luongCB = luongCB;
  this.chucvu = chucvu;
  this.gioLam = gioLam;
  this.ngayLam = ngayLam;
  this.tongluong = function () {
    if (this.chucvu == "Sếp") {
      return this.luongCB * 3;
    } else if (this.chucvu == "Trưởng phòng") {
      return this.luongCB * 2;
    } else {
      return this.luongCB * 1;
    }
  };
  this.xeploai = function () {
    if (this.gioLam >= 192) {
      return "xuất sắc";
    } else if (this.gioLam >= 176) {
      return "giỏi";
    } else if (this.gioLam >= 160) {
      return "khá";
    } else {
      return "trung bình";
    }
  };
}
