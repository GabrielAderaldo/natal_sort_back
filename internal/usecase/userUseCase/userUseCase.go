package userusecase

import (
	"time"

	userperson "github.com/GabrielAderaldo/natal_sort_back/internal/entity/userPerson"
)

func CreateUser(name string, pass string, email string) *userperson.UserPerson {
	now := time.Now()
	return &userperson.UserPerson{
		Name:      name,
		Pass:      pass,
		Email:     email,
		Create_at: now,
		Update_at: now,
	}
}
