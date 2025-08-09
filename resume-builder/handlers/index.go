// Package handlers provides HTTP handlers for the resume builder application.
package handlers

import (
	"log"
	"net/http"

	"github.com/gofiber/fiber/v2"

	"github.com/Chaitanyabsprip/resume-builder/data"
)

func Index(c *fiber.Ctx) error {
	if c.Path() != "/" || c.Method() != http.MethodGet {
		return c.Status(http.StatusNotFound).SendString("Not Found")
	}
	data, err := data.GetResumeData()
	if err != nil {
		log.Printf("Error loading resume data: %v", err)
		return c.Status(http.StatusInternalServerError).
			SendString("Internal server error")
	}
	return c.Render("root", data)
}

func GeneratePdf(c *fiber.Ctx) error {
	if c.Path() != "/generate-pdf" || c.Method() != http.MethodPost {
		return c.Status(http.StatusNotFound).SendString("Not Found")
	}
	formData := make(map[string]bool)
	for key, value := range c.Request().PostArgs().All() {
		formData[string(key)] = string(value) == "on"
	}
	log.Printf("%v\n", formData)
	return c.Status(http.StatusOK).
		SendString("PDF generated successfully")
}
