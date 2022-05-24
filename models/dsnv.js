

// Tạo lớp đối lượng danh sách nhân viên

function DanhSachNhanVien() {

    //Khai báo mảng cho lớp đối tượng nhân viên
    this.arrNhanVien = [];

    //Thêm nhân viên

    this.themNV = function (nv) {
        this.arrNhanVien.push(nv);
    };

    //Hàm tìm vị trí nhân viên

    this.timViTriNV = function (tenTaiKhoan) {
        var index = -1;
        this.arrNhanVien.forEach(function (item, i) {
            if (item.tenTaiKhoan === tenTaiKhoan) {
                index = i;
            }
        });

        return index;
    };

    // Xóa nhân viên
    this.xoaNV = function (tenTaiKhoan) {
        var index = this.timViTriNV(tenTaiKhoan);
        if (index !== -1) {
            this.arrNhanVien.splice(index, 1);
        }
    };  

    //Sửa nhân viên

    this.suaNV = function (tenTaiKhoan) {
        var index = this.timViTriNV(tenTaiKhoan);
        if (index !== -1) {
            return this.arrNhanVien[index];
        }
        return null;
    };


    //Cập nhật nhân viên

    this.capNhat = function (nv) {
        var index = this.timViTriNV(nv.tenTaiKhoan);
        if (index !== -1) {
            this.arrNhanVien[index] = nv;
        }
    };


    //Tìm nhân viên theo xếp loại nhân viên

    this.timNV = function (searchName) {

        var arrSearch = [];

        this.arrNhanVien.forEach(function (item) {
            if (item.xepLoai.toLowerCase().indexOf(searchName.toLowerCase()) > -1) {
                arrSearch.push(item);
            }
        });

        return arrSearch;
    };



}