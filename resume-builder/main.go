package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"text/template"

	"gopkg.in/yaml.v3"
)

var tmpl *template.Template
var resumeDataOnce sync.Once
var resumeData *ResumeData

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

// loadResumeData loads resume data from YAML file
func loadResumeData() (*ResumeData, error) {
	yamlFile, err := os.ReadFile("resume.yaml")
	if err != nil {
		return nil, fmt.Errorf("error reading YAML file: %v", err)
	}

	var data ResumeData
	err = yaml.Unmarshal(yamlFile, &data)
	if err != nil {
		return nil, fmt.Errorf("error unmarshaling YAML: %v", err)
	}

	return &data, nil
}

// GetResumeData returns the resume data, loading it only once
func GetResumeData() (*ResumeData, error) {
	var err error
	resumeDataOnce.Do(func() {
		resumeData, err = loadResumeData()
	})
	return resumeData, err
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

	data, err := GetResumeData()
	if err != nil {
		log.Printf("Error loading resume data: %v", err)
		http.Error(
			w,
			"Internal server error",
			http.StatusInternalServerError,
		)
		return
	}

	err = tmpl.ExecuteTemplate(w, "root", data)
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
