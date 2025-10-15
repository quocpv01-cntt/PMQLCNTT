package main

import (
    "encoding/json"
    "log"
    "net/http"
    "os"
    "time"

    "github.com/alexedwards/scs/v2"
    "github.com/go-chi/chi/v5"
    "github.com/go-chi/chi/v5/middleware"
    "go.etcd.io/bbolt"

    "it-asset-mgmt/server/handlers"
    "it-asset-mgmt/server/storage"
    "it-asset-mgmt/server/seed"
)

type App struct {
    Session *scs.SessionManager
    DB      *bbolt.DB
}

type jsonResponse struct {
	OK      bool        `json:"ok"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

func (a *App) health(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(jsonResponse{OK: true, Message: "server up"})
}

func (a *App) routes() http.Handler {
	r := chi.NewRouter()
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
    r.Use(a.Session.LoadAndSave)

	r.Get("/api/health", a.health)
    // Auth
    auth := &handlers.AuthHandler{Session: a.Session, DB: a.DB}
    r.Post("/api/auth/login", auth.Login)
    r.Post("/api/auth/logout", auth.Logout)

    // Dashboard
    dash := &handlers.DashboardHandler{DB: a.DB}
    r.Get("/api/dashboard/summary", dash.Summary)

    // CRUD endpoints
    r.Route("/api", func(api chi.Router) {
        api.Route("/assets", func(cr chi.Router) {
            h := &handlers.CRUDHandler{DB: a.DB, Bucket: []byte("assets")}
            cr.Get("/", h.List)
            cr.Get("/{id}", h.Get)
            cr.Post("/", h.Create)
            cr.Put("/{id}", h.Update)
            cr.Delete("/{id}", h.Delete)
        })
        api.Route("/employees", func(cr chi.Router) {
            h := &handlers.CRUDHandler{DB: a.DB, Bucket: []byte("employees")}
            cr.Get("/", h.List)
            cr.Get("/{id}", h.Get)
            cr.Post("/", h.Create)
            cr.Put("/{id}", h.Update)
            cr.Delete("/{id}", h.Delete)
        })
        api.Route("/tickets", func(cr chi.Router) {
            h := &handlers.CRUDHandler{DB: a.DB, Bucket: []byte("tickets")}
            cr.Get("/", h.List)
            cr.Get("/{id}", h.Get)
            cr.Post("/", h.Create)
            cr.Put("/{id}", h.Update)
            cr.Delete("/{id}", h.Delete)
        })
        api.Route("/maintenance", func(cr chi.Router) {
            h := &handlers.CRUDHandler{DB: a.DB, Bucket: []byte("maintenance")}
            cr.Get("/", h.List)
            cr.Get("/{id}", h.Get)
            cr.Post("/", h.Create)
            cr.Put("/{id}", h.Update)
            cr.Delete("/{id}", h.Delete)
        })
    })
	return r
}

func main() {
	addr := ":8080"
	if v := os.Getenv("PORT"); v != "" {
		addr = ":" + v
	}

    session := scs.New()
	session.Lifetime = 24 * time.Hour
	session.Cookie.Persist = true
	session.Cookie.SameSite = http.SameSiteLaxMode
	session.Cookie.Secure = false

    store, err := storage.Open("./data.db")
    if err != nil {
        log.Fatalf("open bolt: %v", err)
    }
    defer store.Close()

    // Seed demo data (idempotent)
    if err := seed.Run(store.DB); err != nil {
        log.Printf("seed error: %v", err)
    }

    app := &App{Session: session, DB: store.DB}

	srv := &http.Server{Addr: addr, Handler: app.routes()}
	log.Printf("server listening on %s", addr)
	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatal(err)
	}
}
