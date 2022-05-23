
// Tạo lớp đối tượng nhân vien

function NhanVien(_tenTaiKhoan, _hoTen, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLam) {
    this.tenTaiKhoan = _tenTaiKhoan;
    this.hoTen = _hoTen;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.xepLoai = "";

    //Hàm tính tổng lương nhân viên

    this.tinhTongLuong = function () {

        //Sử dụng switch..scase

        switch(this.chucVu){
            case "Sếp":
                this.tongLuong = this.luongCoBan * 3;
                break;
            case "Trưởng phòng":
                this.tongLuong = this.luongCoBan * 2;
                break;

            case "Nhân viên":
                this.tongLuong = this.luongCoBan;
                break;

        }
        /*
        // Sử dụng if..else
        
        if (this.chucVu === "Sếp") {
            this.tongLuong = this.luongCoBan * 3;
        }
        else if (this.chucVu === "Trưởng phòng") {
            this.tongLuong = this.luongCoBan * 2;

        } else if (this.chucVu === "Nhân viên") {
            this.tongLuong = this.luongCoBan
        }*/

    }

    // Hàm xếp loại nhân viên

    this.xepLoaiNV = function () {
        if (this.gioLam >= 192) {

            this.xepLoai = "Xuất sắc";
        }
        else if (this.gioLam < 192 && this.gioLam >= 176) {

            this.xepLoai = "Giỏi";

        } else if (this.gioLam >= 160 && this.gioLam < 176) {

            this.xepLoai = "Khá";

        } else {

            this.xepLoai = "Yếu";

        }

    }


}