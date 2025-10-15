package handlers

import (
	"crypto/subtle"
	"encoding/json"
	"net/http"

	"github.com/alexedwards/scs/v2"
	"go.etcd.io/bbolt"
)

type AuthHandler struct {
	Session *scs.SessionManager
	DB      *bbolt.DB
}

type LoginRequest struct {
	EmployeeID string `json:"employeeId"`
	Password   string `json:"password"`
}

type LoginResponse struct {
	OK    bool   `json:"ok"`
	Token string `json:"token"`
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"ok":false,"message":"invalid body"}`, http.StatusBadRequest)
		return
	}
	if subtle.ConstantTimeCompare([]byte(req.EmployeeID), []byte("admin")) == 1 &&
		subtle.ConstantTimeCompare([]byte(req.Password), []byte("Admin@345")) == 1 {
		// create session
		h.Session.Put(r.Context(), "userId", "admin")
		_ = json.NewEncoder(w).Encode(LoginResponse{OK: true, Token: "session"})
		return
	}
	http.Error(w, `{"ok":false,"message":"invalid credentials"}`, http.StatusUnauthorized)
}

func (h *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {
	h.Session.Destroy(r.Context())
	w.WriteHeader(http.StatusNoContent)
}
