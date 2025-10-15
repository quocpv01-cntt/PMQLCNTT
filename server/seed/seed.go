package seed

import (
	"encoding/json"
	"time"

	"github.com/google/uuid"
	"go.etcd.io/bbolt"
)

type SeedData struct {
	Employees []map[string]any
	Assets    []map[string]any
	Tickets   []map[string]any
	Maint     []map[string]any
}

func Run(db *bbolt.DB) error {
	return db.Update(func(tx *bbolt.Tx) error {
		// employees
		if b := tx.Bucket([]byte("employees")); b != nil {
            if b.Stats().KeyN == 0 {
                adminPerms := map[string]any{
                    "dashboard": map[string]bool{"view": true},
                    "equipment": map[string]bool{"view": true, "add": true, "edit": true, "delete": true},
                    "equipment-types": map[string]bool{"view": true},
                    "staff": map[string]bool{"view": true, "edit": true},
                    "manufacturers": map[string]bool{"view": true},
                    "units": map[string]bool{"view": true},
                    "licenses": map[string]bool{"view": true},
                    "network": map[string]bool{"view": true},
                    "allocation": map[string]bool{"view": true},
                    "maintenance": map[string]bool{"view": true},
                    "repairs": map[string]bool{"view": true},
                    "usage-history": map[string]bool{"view": true},
                    "transfers": map[string]bool{"view": true},
                    "reports": map[string]bool{"view": true},
                    "settings": map[string]bool{"view": true},
                    "permissions": map[string]bool{"view": true},
                    "roles": map[string]bool{"view": true},
                    "database-explorer": map[string]bool{"view": true},
                }
                empPerms := map[string]any{
                    "dashboard": map[string]bool{"view": true},
                    "equipment": map[string]bool{"view": true},
                    "staff": map[string]bool{"view": true},
                    "maintenance": map[string]bool{"view": true},
                    "reports": map[string]bool{"view": true},
                }
                items := []map[string]any{
                    {"id": uuid.NewString(), "employeeId": "admin", "fullName": "Quản trị", "email": "admin@example.com", "phone": "0123456789", "unit": "CNTT", "position": "Admin", "role": "ADMIN", "status": "Đang hoạt động", "gender": "Nam", "mustChangePassword": false, "permissions": adminPerms},
                    {"id": uuid.NewString(), "employeeId": "E001", "fullName": "Nguyễn Văn A", "email": "a@example.com", "phone": "0901 111 222", "unit": "CNTT", "position": "Nhân viên", "role": "EMPLOYEE", "status": "Đang hoạt động", "gender": "Nam", "mustChangePassword": true, "permissions": empPerms},
                }
				for _, it := range items {
					buf, _ := json.Marshal(it)
					_ = b.Put([]byte(it["id"].(string)), buf)
				}
			}
		}
		// assets
		if b := tx.Bucket([]byte("assets")); b != nil {
			if b.Stats().KeyN == 0 {
				items := []map[string]any{
					{"id": uuid.NewString(), "assetTag": "AS-001", "deviceName": "Laptop HP", "deviceType": "Laptop", "serialNumber": "SN123", "assignedTo": "E001", "status": "Sẵn sàng", "purchaseDate": time.Now().AddDate(-1,0,0), "warrantyEndDate": time.Now().AddDate(0,6,0), "supplier": "HP", "operatingSystem": "Windows 11", "ipAddress": "192.168.1.10", "notes": "-", "unit": "CNTT"},
				}
				for _, it := range items {
					buf, _ := json.Marshal(it)
					_ = b.Put([]byte(it["id"].(string)), buf)
				}
			}
		}
		// tickets
		if b := tx.Bucket([]byte("tickets")); b != nil {
			if b.Stats().KeyN == 0 {
				items := []map[string]any{
					{"id": uuid.NewString(), "title": "Sửa máy in", "description": "Máy in phòng A bị kẹt giấy", "priority": "Cao", "status": "Mở", "createdBy": "E001", "assignee": "admin", "createdAt": time.Now(), "updatedAt": time.Now()},
				}
				for _, it := range items {
					buf, _ := json.Marshal(it)
					_ = b.Put([]byte(it["id"].(string)), buf)
				}
			}
		}
		// maintenance
		if b := tx.Bucket([]byte("maintenance")); b != nil {
			if b.Stats().KeyN == 0 {
				items := []map[string]any{
					{"id": uuid.NewString(), "assetId": "", "type": "Bảo trì định kỳ", "startDate": time.Now().AddDate(0,0,7), "endDate": time.Now().AddDate(0,0,7), "status": "Đã lên lịch", "notes": "Bảo trì tuần sau", "unit": "CNTT"},
				}
				for _, it := range items {
					buf, _ := json.Marshal(it)
					_ = b.Put([]byte(it["id"].(string)), buf)
				}
			}
		}
		return nil
	})
}
