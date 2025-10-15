package storage

import (
	"errors"
	"time"

	"go.etcd.io/bbolt"
)

type BoltStore struct {
	DB *bbolt.DB
}

func Open(path string) (*BoltStore, error) {
	db, err := bbolt.Open(path, 0600, &bbolt.Options{Timeout: 1 * time.Second})
	if err != nil {
		return nil, err
	}
	store := &BoltStore{DB: db}
	return store, store.ensureBuckets()
}

var (
	bucketUsers       = []byte("users")
	bucketAssets      = []byte("assets")
	bucketEmployees   = []byte("employees")
	bucketTickets     = []byte("tickets")
	bucketMaintenance = []byte("maintenance")
)

func (s *BoltStore) ensureBuckets() error {
	return s.DB.Update(func(tx *bbolt.Tx) error {
		buckets := [][]byte{bucketUsers, bucketAssets, bucketEmployees, bucketTickets, bucketMaintenance}
		for _, b := range buckets {
			if _, err := tx.CreateBucketIfNotExists(b); err != nil {
				return err
			}
		}
		return nil
	})
}

func (s *BoltStore) Close() error {
	if s.DB == nil {
		return errors.New("db is nil")
	}
	return s.DB.Close()
}
