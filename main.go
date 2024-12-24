package main

import (
	"log"
	"os"

	jsonconverter "github.com/GabrielAderaldo/natal_sort_back/pkg/jsonConverter"
	"github.com/GabrielAderaldo/natal_sort_back/pkg/mongodb"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

type Response struct {
	Value   int    `json:"value"`
	Message string `json:"message"`
}

func main() {
	goDotEnvErr := godotenv.Load()
	if goDotEnvErr != nil {
		log.Fatalln("ENV Não carregada")
	}
	app := fiber.New()
	app.Use(cors.New())

	mongodb.ConnectMongo(os.Getenv("MONGO_URI"))

	mongoClient := mongodb.GetMongoInstance()

	if mongoClient == nil {
		log.Fatalln("fail to set singleton in database")
	}

	pongResponse := Response{
		Value:   200,
		Message: "pong",
	}

	app.Get("/ping", func(c *fiber.Ctx) error {
		json, err := jsonconverter.ConvertStructToJson(pongResponse)
		if err != nil {
			return c.SendStatus(500)
		}
		return c.SendString(string(json.Value))
	})

	app.Listen(":3000")

}
