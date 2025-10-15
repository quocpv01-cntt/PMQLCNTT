package handlers

import (
	"encoding/json"
	"net/http"

	"go.etcd.io/bbolt"
)

type DashboardHandler struct{ DB *bbolt.DB }

type DashboardSummary struct {
	Assets      int `json:"assets"`
	Employees   int `json:"employees"`
	TicketsOpen int `json:"ticketsOpen"`
	Maintenance int `json:"maintenance"`
}

func (h *DashboardHandler) Summary(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	s := DashboardSummary{}
	h.DB.View(func(tx *bbolt.Tx) error {
		if b := tx.Bucket([]byte("assets")); b != nil {
			s.Assets = b.Stats().KeyN
		}
		if b := tx.Bucket([]byte("employees")); b != nil {
			s.Employees = b.Stats().KeyN
		}
		if b := tx.Bucket([]byte("tickets")); b != nil {
			s.TicketsOpen = b.Stats().KeyN
		}
		if b := tx.Bucket([]byte("maintenance")); b != nil {
			s.Maintenance = b.Stats().KeyN
		}
		return nil
	})
	_ = json.NewEncoder(w).Encode(map[string]any{"ok": true, "data": s})
}
