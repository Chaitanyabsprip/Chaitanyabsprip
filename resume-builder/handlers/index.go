// Package handlers provides HTTP handlers for the resume builder application.
package handlers

import (
	"fmt"
	"html/template"
	"log"
	"net/http"

	"github.com/gofiber/fiber/v2"

	"github.com/Chaitanyabsprip/resume-builder/data"
)

var tmpl *template.Template

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
	fmt.Printf("%v\n", string(c.Body()))
	return c.Status(http.StatusOK).
		SendString("PDF generated successfully")
}
