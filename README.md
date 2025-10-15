# Hệ thống Quản lý Công nghệ Thông tin

Một hệ thống quản lý CNTT toàn diện được xây dựng với React, TypeScript và Tailwind CSS.

## Tính năng chính

### 🔐 Xác thực và Phân quyền
- Đăng nhập/đăng xuất với mã nhân viên
- Hệ thống phân quyền theo vai trò (Admin, Nhân viên, Trưởng đơn vị)
- Tự động yêu cầu đổi mật khẩu cho tài khoản mới
- Ghi nhớ đăng nhập

### 📊 Dashboard Tổng quan
- Thống kê tổng hợp về tài sản IT, nhân viên, giấy phép
- Biểu đồ trực quan (Pie Chart, Bar Chart, Line Chart)
- Hoạt động gần đây
- Thao tác nhanh

### 💻 Quản lý Tài sản IT
- Quản lý laptop, máy tính, thiết bị mạng
- Theo dõi trạng thái thiết bị (Sẵn sàng, Đang sử dụng, Đang sửa chữa, v.v.)
- Thông tin chi tiết: Serial number, bảo hành, nhà cung cấp
- Tìm kiếm và lọc theo nhiều tiêu chí

### 👥 Quản lý Nhân viên
- Danh sách nhân viên với thông tin liên hệ
- Phân chia theo đơn vị/phòng ban
- Quản lý vai trò và quyền hạn
- Hồ sơ chi tiết từng nhân viên

### 🔧 Lịch Bảo trì
- Lên lịch bảo trì định kỳ
- Theo dõi tiến độ bảo trì
- Phân loại: Bảo trì định kỳ, Sửa chữa, Nâng cấp
- Ghi chú chi tiết công việc

### 🏢 Quản lý Tổ chức
- Danh sách đơn vị/phòng ban
- Thông tin nhà sản xuất/nhà cung cấp
- Loại thiết bị và danh mục
- Giấy phép phần mềm

### 🎨 Giao diện Hiện đại
- Thiết kế responsive, hoạt động tốt trên mọi thiết bị
- Chế độ sáng/tối (Dark/Light mode)
- Tông màu slate chuyên nghiệp
- Sidebar điều hướng trực quan
- Thông báo real-time

## Công nghệ sử dụng

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Charts**: Recharts
- **Routing**: React Router DOM
- **Build Tool**: Vite

## Tài khoản mẫu

### Admin
- **Mã nhân viên**: `admin`
- **Mật khẩu**: `Admin@345`

### Nhân viên
- **Mã nhân viên**: `NV001` hoặc `NV002`
- **Mật khẩu**: `Admin@345` (sẽ yêu cầu đổi mật khẩu)

## Cài đặt và Chạy

1. **Cài đặt dependencies**:
   ```bash
   npm install
   ```

2. **Chạy development server**:
   ```bash
   npm run dev
   ```

3. **Build cho production**:
   ```bash
   npm run build
   ```

4. **Preview build**:
   ```bash
   npm run preview
   ```

## Cấu trúc Project

```
src/
├── components/          # Các component tái sử dụng
│   ├── auth/           # Components xác thực
│   ├── forms/          # Form components
│   └── layout/         # Layout components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── pages/              # Các trang chính
├── services/           # API services
└── types.ts            # TypeScript types
```

## Tính năng nổi bật

### 🔍 Tìm kiếm và Lọc
- Tìm kiếm thông minh trên tất cả các module
- Lọc theo nhiều tiêu chí
- Kết quả real-time

### 📱 Responsive Design
- Tối ưu cho desktop, tablet, mobile
- Touch-friendly interface
- Adaptive navigation

### 🌙 Dark Mode
- Chuyển đổi theme dễ dàng
- Lưu preference người dùng
- Tối ưu cho mắt

### 🔔 Thông báo
- Thông báo real-time
- Đánh dấu đã đọc/chưa đọc
- Phân loại theo mức độ ưu tiên

### 📊 Báo cáo và Thống kê
- Dashboard trực quan
- Biểu đồ đa dạng
- Export dữ liệu

## Bảo mật

- Xác thực dựa trên session
- Phân quyền chi tiết theo module
- Validation dữ liệu đầu vào
- Bảo vệ routes theo quyền hạn

## Hỗ trợ

Hệ thống được thiết kế để dễ mở rộng và tùy chỉnh. Các module được tách biệt rõ ràng, dễ dàng thêm tính năng mới hoặc chỉnh sửa theo nhu cầu cụ thể.

## Phát triển tiếp theo

- [ ] Tích hợp database thực (PostgreSQL/MySQL)
- [ ] API backend với Node.js/Express
- [ ] Export báo cáo PDF/Excel
- [ ] Tích hợp email notifications
- [ ] Mobile app với React Native
- [ ] Tích hợp với Active Directory
- [ ] Backup và restore dữ liệu
- [ ] Audit logs chi tiết