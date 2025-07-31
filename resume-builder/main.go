package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"text/template"
)

var tmpl *template.Template

func init() {
	var err error
	var files []string
	filepath.Walk(
		"views",
		func(path string, info os.FileInfo, err error) error {
			if err == nil && !info.IsDir() &&
				strings.HasSuffix(path, ".html") {
				files = append(files, path)
			}
			return nil
		},
	)
	tmpl, err = template.ParseFiles(files...)
	if err != nil {
		log.Printf("Template execution error: %v", err)
		os.Exit(1)
	}
}

func main() {
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	port := "8080"
	http.HandleFunc("/", indexHandler)
	fmt.Printf("Server starting on http://localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" || r.Method != http.MethodGet {
		http.NotFound(w, r)
		return
	}
	err := tmpl.ExecuteTemplate(w, "root", nil)
	if err != nil {
		log.Printf("Template execution error: %v", err)
		http.Error(
			w,
			"Internal server error",
			http.StatusInternalServerError,
		)
		return
	}
}
