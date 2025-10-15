# Hệ thống Quản lý Công nghệ Thông tin

Một hệ thống quản lý tài sản IT toàn diện được xây dựng bằng React TypeScript với giao diện hiện đại và tính năng đầy đủ.

## ✨ Tính năng chính

### 🔐 Xác thực và Phân quyền
- Đăng nhập/đăng ký với hệ thống phân quyền chi tiết
- Quản lý vai trò: Admin, Trưởng đơn vị, Nhân viên
- Bảo mật với mật khẩu mặc định và yêu cầu đổi mật khẩu

### 📊 Dashboard Tổng quan
- Thống kê tổng hợp về tài sản, nhân viên, yêu cầu hỗ trợ
- Biểu đồ trực quan (Pie Chart, Bar Chart, Line Chart)
- Hiển thị hoạt động gần đây và bảo trì sắp tới

### 💻 Quản lý Tài sản IT
- Theo dõi laptop, máy tính, thiết bị với trạng thái chi tiết
- Quản lý thông tin: mã tài sản, serial, bảo hành, người sử dụng
- Phân loại theo loại thiết bị, nhà sản xuất
- Tìm kiếm và lọc nâng cao

### 👥 Quản lý Nhân viên
- Danh sách nhân viên với thông tin liên hệ đầy đủ
- Phân theo đơn vị/phòng ban
- Quản lý quyền hạn và vai trò
- Theo dõi trạng thái làm việc

### 🎫 Hệ thống Yêu cầu Hỗ trợ
- Tạo và quản lý tickets hỗ trợ kỹ thuật
- Phân loại theo độ ưu tiên: Thấp, Trung bình, Cao, Khẩn cấp
- Theo dõi trạng thái xử lý: Mở, Đang xử lý, Đã giải quyết, Đã đóng
- Phân công nhân viên xử lý

### 🔧 Lịch Bảo trì
- Lên lịch bảo trì định kỳ cho tài sản IT
- Phân loại: Sửa chữa, Nâng cấp, Bảo trì định kỳ
- Theo dõi tiến độ và trạng thái thực hiện
- Thống kê hiệu quả bảo trì

### 🏢 Quản lý Hệ thống
- Quản lý loại thiết bị với mã tiền tố
- Danh mục nhà sản xuất và thông tin liên hệ
- Cơ cấu đơn vị/phòng ban
- Cài đặt hệ thống và phân quyền

## 🎨 Giao diện

### Thiết kế Hiện đại
- Tông màu slate chuyên nghiệp và thanh lịch
- Dark mode/Light mode tự động
- Animations mượt mà và hiệu ứng chuyển tiếp
- Icons từ Heroicons cho giao diện nhất quán

### Responsive Design
- Hoạt động tốt trên desktop, tablet, mobile
- Sidebar có thể thu gọn trên màn hình nhỏ
- Bảng dữ liệu cuộn ngang trên mobile
- Touch-friendly interface

### UX Tối ưu
- Navigation sidebar với các module chính
- Breadcrumb và search toàn cục
- Toast notifications cho phản hồi tức thì
- Loading states và error handling

## 🚀 Công nghệ sử dụng

- **Frontend**: React 19 + TypeScript
- **Routing**: React Router DOM 7
- **Styling**: Tailwind CSS với custom theme
- **Charts**: Recharts cho visualization
- **Icons**: Heroicons React
- **State Management**: React Context API
- **Data Storage**: localStorage (mô phỏng database)

## 📱 Tính năng nổi bật

### Thông báo Realtime
- Hệ thống thông báo với badge đếm
- Phân loại: Info, Warning, Error
- Đánh dấu đã đọc và quản lý thông báo

### Tìm kiếm và Lọc
- Tìm kiếm toàn văn bản
- Lọc theo nhiều tiêu chí
- Sắp xếp và phân trang dữ liệu

### Quản lý Dữ liệu
- CRUD operations đầy đủ
- Validation form chi tiết
- Xác nhận trước khi xóa
- Export/Import dữ liệu

## 🔧 Cài đặt và Chạy

```bash
# Clone repository
git clone [repository-url]

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build
```

## 👤 Tài khoản Demo

**Admin:**
- Username: `admin`
- Password: `Admin@345`

**Nhân viên:**
- Username: `emp001`
- Password: `Admin@345` (sẽ yêu cầu đổi mật khẩu)

## 📁 Cấu trúc Project

```
src/
├── components/          # React components
│   ├── layout/         # Layout components
│   ├── auth/           # Authentication components
│   └── common/         # Shared components
├── pages/              # Page components
├── contexts/           # React contexts
├── services/           # API và database services
├── types.ts            # TypeScript type definitions
└── utils/              # Utility functions
```

## 🔮 Tính năng sắp tới

- [ ] Báo cáo chi tiết và export Excel/PDF
- [ ] Quản lý license phần mềm
- [ ] Theo dõi network và infrastructure
- [ ] API integration với hệ thống bên ngoài
- [ ] Mobile app companion
- [ ] Advanced analytics và AI insights

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng tạo issue hoặc pull request.

---

**Phát triển bởi**: IT Management Team  
**Phiên bản**: 1.0.0  
**Cập nhật**: 2024-10-15