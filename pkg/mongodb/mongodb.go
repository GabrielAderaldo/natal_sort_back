package mongodb

import (
	"context"
	"errors"
	"fmt"
	"sync"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type ClientSingleton struct {
	client *mongo.Client
}

var (
	clientSingleton *ClientSingleton
	once            sync.Once
	mu              sync.Mutex
)

func GetMongoInstance() *ClientSingleton {
	once.Do(
		func() {
			clientSingleton = &ClientSingleton{}
		})

	return clientSingleton
}

func SetMongoInstance(client *mongo.Client) {
	mu.Lock()
	defer mu.Unlock()
	if clientSingleton == nil {
		GetMongoInstance()
	}
	clientSingleton.client = client
}

func ConnectMongo(uri string) (int, error) {

	serverApi := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverApi)
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		return -1, errors.New("fails to connect to mongodb database")
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	var result bson.M
	if err := client.Database("natal").RunCommand(context.TODO(), bson.D{{"ping", 1}}).Decode(&result); err != nil {
		return -1, errors.New("fails to connect to mongodb database")
	}

	SetMongoInstance(client)

	fmt.Println("[DATABASE] - MongoDb Connected with Success")
	return 1, nil
}
