package models

import "time"

type User struct {
	ID       string   `json:"id"`
	Email    string   `json:"email"`
	Name     string   `json:"name"`
	Password string   `json:"-"`
	Role     string   `json:"role"`
	Unit     string   `json:"unit,omitempty"`
	Perms    []string `json:"perms,omitempty"`
}

type Asset struct {
	ID              string    `json:"id"`
	AssetTag        string    `json:"assetTag"`
	DeviceName      string    `json:"deviceName"`
	DeviceType      string    `json:"deviceType"`
	SerialNumber    string    `json:"serialNumber"`
	AssignedTo      string    `json:"assignedTo"`
	Status          string    `json:"status"`
	PurchaseDate    time.Time `json:"purchaseDate"`
	WarrantyEndDate time.Time `json:"warrantyEndDate"`
	Supplier        string    `json:"supplier"`
	OperatingSystem string    `json:"operatingSystem"`
	IPAddress       string    `json:"ipAddress"`
	Notes           string    `json:"notes"`
	Unit            string    `json:"unit"`
}

type Employee struct {
	ID        string `json:"id"`
	EmployeeID string `json:"employeeId"`
	FullName  string `json:"fullName"`
	Email     string `json:"email"`
	Phone     string `json:"phone"`
	Unit      string `json:"unit"`
	Position  string `json:"position"`
	Role      string `json:"role"`
	Status    string `json:"status"`
	Gender    string `json:"gender"`
	MustChangePassword bool `json:"mustChangePassword"`
}

type Ticket struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	Description string  `json:"description"`
	Priority  string    `json:"priority"`
	Status    string    `json:"status"`
	CreatedBy string    `json:"createdBy"`
	Assignee  string    `json:"assignee"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type Maintenance struct {
	ID        string    `json:"id"`
	AssetID   string    `json:"assetId"`
	Type      string    `json:"type"`
	StartDate time.Time `json:"startDate"`
	EndDate   time.Time `json:"endDate"`
	Status    string    `json:"status"`
	Notes     string    `json:"notes"`
	Unit      string    `json:"unit"`
}
