package userperson

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserPerson struct {
	ID        primitive.ObjectID `bson:"_id"`
	Name      string             `bson:"name" json:"name"`
	Pass      string             `bson:"pass" json:"pass"`
	Email     string             `bson:"email" json:"email"`
	Create_at time.Time          `bson:"create_at" json:"create_at"`
	Update_at time.Time          `bson:"update_at" json:"update_at"`
}
