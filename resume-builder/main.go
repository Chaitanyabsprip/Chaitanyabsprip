package main

import (
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
	}
	app := fiber.New(fiber.Config{Views: engine})
	app.Use(logger.New())
	app.Get("/", handlers.Index)
	app.Static("/static", "./static")
	app.Post("/generate-pdf", handlers.GeneratePdf)

	log.Fatal(app.Listen(":8080"))
}
