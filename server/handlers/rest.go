package handlers

import (
    "encoding/json"
    "net/http"

    "github.com/go-chi/chi/v5"
    "github.com/google/uuid"
    "go.etcd.io/bbolt"
)

type CRUDHandler struct {
	DB *bbolt.DB
	Bucket []byte
}

func (h *CRUDHandler) List(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var items []json.RawMessage
	h.DB.View(func(tx *bbolt.Tx) error {
		b := tx.Bucket(h.Bucket)
		b.ForEach(func(k, v []byte) error {
			items = append(items, append([]byte(nil), v...))
			return nil
		})
		return nil
	})
	_ = json.NewEncoder(w).Encode(map[string]any{"ok": true, "data": items})
}

func (h *CRUDHandler) Get(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    id := chi.URLParam(r, "id")
    if id == "" {
        http.Error(w, `{"ok":false,"message":"missing id"}`, http.StatusBadRequest)
        return
    }
    var out json.RawMessage
    err := h.DB.View(func(tx *bbolt.Tx) error {
        b := tx.Bucket(h.Bucket)
        if v := b.Get([]byte(id)); v != nil {
            out = append([]byte(nil), v...)
            return nil
        }
        return nil
    })
    if err != nil {
        http.Error(w, `{"ok":false}`, http.StatusInternalServerError)
        return
    }
    if len(out) == 0 {
        http.Error(w, `{"ok":false,"message":"not found"}`, http.StatusNotFound)
        return
    }
    w.Write(out)
}

func (h *CRUDHandler) Create(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	body := json.RawMessage{}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, `{"ok":false,"message":"invalid body"}`, http.StatusBadRequest)
		return
	}
	id := uuid.NewString()
	h.DB.Update(func(tx *bbolt.Tx) error {
		b := tx.Bucket(h.Bucket)
		return b.Put([]byte(id), body)
	})
	_ = json.NewEncoder(w).Encode(map[string]any{"ok": true, "id": id})
}

func (h *CRUDHandler) Update(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    id := chi.URLParam(r, "id")
    if id == "" {
        http.Error(w, `{"ok":false,"message":"missing id"}`, http.StatusBadRequest)
        return
    }
    body := json.RawMessage{}
    if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
        http.Error(w, `{"ok":false,"message":"invalid body"}`, http.StatusBadRequest)
        return
    }
    h.DB.Update(func(tx *bbolt.Tx) error {
        b := tx.Bucket(h.Bucket)
        return b.Put([]byte(id), body)
    })
    _ = json.NewEncoder(w).Encode(map[string]any{"ok": true})
}

func (h *CRUDHandler) Delete(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    id := chi.URLParam(r, "id")
    if id == "" {
        http.Error(w, `{"ok":false,"message":"missing id"}`, http.StatusBadRequest)
        return
    }
    h.DB.Update(func(tx *bbolt.Tx) error {
        b := tx.Bucket(h.Bucket)
        return b.Delete([]byte(id))
    })
    _ = json.NewEncoder(w).Encode(map[string]any{"ok": true})
}
