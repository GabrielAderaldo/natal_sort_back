package main

import (
	jsonconverter "github.com/GabrielAderaldo/natal_sort_back/pkg/jsonConverter"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Response struct {
	Value   int    `json:"value"`
	Message string `json:"message"`
}

func main() {
	app := fiber.New()
	app.Use(cors.New())

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
