package main

import (
	"errors"
	"log"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/template/html/v2"

	"github.com/Chaitanyabsprip/resume-builder/handlers"
)

func main() {
	engine := html.New("views", ".html")
	engine.Funcmap = map[string]any{
		"join": strings.Join,
		"dict": func(values ...any) (map[string]any, error) {
			length := len(values)
			if length%2 != 0 {
				return nil, errors.New("invalid dict call")
			}
			dict := make(map[string]any, length/2)
			for i := 0; i < length; i += 2 {
				key, ok := values[i].(string)
				if !ok {
					return nil, errors.New("dict keys must be strings")
				}
				dict[key] = values[i+1]
			}
			return dict, nil
		},
	}
	app := fiber.New(fiber.Config{Views: engine})
	app.Use(logger.New())
	app.Get("/", handlers.Index)
	app.Static("/static", "./static")
	app.Post("/generate-pdf", handlers.GeneratePdf)

	log.Fatal(app.Listen(":8080"))
}
