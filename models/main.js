
// Hàm getEle
function getEle(id) {
    return document.getElementById(id);
}

// Tạo đối tượng danh sách nhân viên từ lớp đối tượng danh sách nhân viên
var dsnv = new DanhSachNhanVien();
var validation = new Validation();

//Load dữ liệu lên trang web khi reload lại trang web
getLocalStorage();

//Hàm thêm nhân viên
function layThongTinNV(isAdd) {
    var _tenTaiKhoan = getEle("tknv").value;
    var _hoTen = getEle("name").value;
    var _email = getEle("email").value;
    var _matKhau = getEle("password").value;
    var _ngayLam = getEle("datepicker").value;
    var _luongCoBan = getEle("luongCB").value;
    var _chucVu = getEle("chucvu").value;
    var _gioLam = getEle("gioLam").value;

    //flag (cờ) - isValid la true hợp lệ / false: k hợp lệ
    var isValid = true;

    //Check validation
    if (isAdd) {
        ////Kiểm tra tên tài khoản
        isValid &= validation.kiemTraRong(_tenTaiKhoan, "tbTKNV", "(*) Vui lòng nhập tài khoản")
            && validation.kiemTraDoDaiKiTu(_tenTaiKhoan, "tbTKNV", 4, 6, "(*) Tên tài khoản phải có độ dài từ 4-6 ký tự")
            && validation.kiemTraTenTaiKhoanTonTai(_tenTaiKhoan, "tbTKNV", "(*) Tài khoản đã tồn tại", dsnv.arrNhanVien);
    }



    //Kiểm tra họ và tên
    isValid &=
        validation.kiemTraRong(_hoTen, "tbTen", "(*) Vui lòng nhập họ và tên") &&
        validation.kiemTraChuoiKiTu(_hoTen, "tbTen", "(*) Họ và tên nhân viên phải là chữ");

    //Kiểm tra Email
    isValid &= validation.kiemTraRong(_email, "tbEmail", "(*)Vui lòng nhập email")
        && validation.kiemTraEmail(_email, "tbEmail", "(*)Mail không đúng định dạng");

    //Kiểm tra mật khẩu
    isValid &= validation.kiemTraRong(_matKhau, "tbMatKhau", "(*) Vui lòng nhập mật khẩu")
        && validation.kiemTraDoDaiKiTu(_matKhau, "tbMatKhau", 6, 10, "(*) Mật khẩu phải có độ dài từ 6-10 ký tự, chứa it nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt")
        && validation.kiemTraMatKhau(_matKhau, "tbMatKhau","(*) Mật khẩu phải có độ dài từ 6-10 ký tự, chứa it nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt");

    //Kiểm tra ngày làm
    isValid &= validation.kiemTraRong(_ngayLam, "tbNgay", "(*) Ngày làm không được để trống");

    //Kiểm tra lương cơ bản
    isValid &= validation.kiemTraRong(_luongCoBan, "tbLuongCB", "(*) Vui lòng nhập lương cơ bản")
        && validation.kiemTraSo(_luongCoBan, "tbLuongCB", "(*) Lương cơ bản phải là số từ [0-9]");
    // && validation.kiemTraDoDaiKiTu(_luongCoBan, "tbLuongCB","(*) Lương cơ bản phải là số từ 1.000.000 đến 20.000.000");


    //Kiểm tra chức vụ
    isValid &= validation.kiemTraChucVu("chucvu", "tbChucVu", "(*) Vui lòng chọn chức vụ");

    //Kiểm tra giờ làm
    isValid &= validation.kiemTraRong(_gioLam, "tbGiolam", "(*) Vui lòng nhập giờ làm")
        && validation.kiemTraSo(_gioLam, "tbGiolam", "(*) Giờ làm phải là số từ [0-9]");


    if (!isValid) return;

    //Tạo đối tượng nhân viên từ lớp đối tượng nhân viên
    var nhanVien = new NhanVien(_tenTaiKhoan, _hoTen, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLam);
    nhanVien.tinhTongLuong();
    nhanVien.xepLoaiNV();
    return nhanVien;
}

//Hàm thêm nhân viên
function themNhanVien() {
    var nhanVien = layThongTinNV(true);
    if (nhanVien) {
        //Thêm sinh viên
        dsnv.themNV(nhanVien);
        taoBang(dsnv.arrNhanVien);
        setLocalStorage();
    }

}

//Hàm tạo bảng hiện thị danh sách khi người dùng thêm nhân viên
function taoBang(data) {
    var content = "";
    data.forEach(function (item) {
        content += `
          <tr>
              <td>${item.tenTaiKhoan}</td>
              <td>${item.hoTen}</td>
              <td>${item.email}</td>
              <td>${item.ngayLam}</td>
              <td>${item.chucVu}</td>
              <td>${item.tongLuong}</td>
              <td>${item.xepLoai}</td>
              <td>
                <button class="btn btn-info" onclick="suaNV('${item.tenTaiKhoan}')"data-toggle="modal"
                data-target="#myModal">Sửa</button>
                <button class="btn btn-danger" onclick="xoaNV('${item.tenTaiKhoan}')">Xoá</button>
              </td>
          </tr>
      `;
    });
    getEle("tableDanhSach").innerHTML = content;
}

//Hàm xóa nhân viên
function xoaNV(id) {
    dsnv.xoaNV(id);
    taoBang(dsnv.arrNhanVien);
    setLocalStorage();
}

//Hàm sửa nhân viên
function suaNV(id) {
    var nv = dsnv.suaNV(id);
    if (nv) {

        //DOM tới các thẻ input hiện thị giá trị từ nhân viên

        getEle("tknv").value = nv.tenTaiKhoan;
        getEle("name").value = nv.hoTen;
        getEle("email").value = nv.email
        getEle("password").value = nv.matKhau;
        getEle("datepicker").value = nv.ngayLam;
        getEle("luongCB").value = nv.luongCoBan;
        getEle("chucvu").value = nv.chucVu;
        getEle("gioLam").value = nv.gioLam;

        //Khóa không cho người dùng chỉnh sửa được tên tài khoản.
        getEle("tknv").disabled = true;

    }
}

//Hàm cập nhật nhân viên
function capNhatNV() {
    var nhanVien = layThongTinNV(false);
    dsnv.capNhat(nhanVien);
    taoBang(dsnv.arrNhanVien);
    setLocalStorage();
}


//Hàm tìm kiếm
getEle("searchName").addEventListener("keyup", function () {
    var searchName = getEle("searchName").value;
    var arrSearch = dsnv.timNV(searchName);
    taoBang(arrSearch);
});

//Reset form
function reset() {
    getEle("huy").reset();
    getEle("tknv").disabled = false;
}
//Hàm lưu dữ liệu xuống Local storage
function setLocalStorage() {
    //Convert from JSON to String
    var dataString = JSON.stringify(dsnv.arrNhanVien);
    //luu xuong localStorage
    localStorage.setItem("DSNV", dataString);
}

//Hàm load liệu từ Local storage
function getLocalStorage() {
    if (localStorage.getItem("DSNV")) {
        var dataString = localStorage.getItem("DSNV");
        //Convert from String to JSON
        var dataJson = JSON.parse(dataString);
        dsnv.arrNhanVien = dataJson;
        taoBang(dsnv.arrNhanVien);
    }
}

