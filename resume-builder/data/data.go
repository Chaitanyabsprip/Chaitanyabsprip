// Package data defines the structures used to represent a resume.
package data

import (
	"fmt"
	"os"
	"sync"

	"gopkg.in/yaml.v3"
)

type Contact struct {
	Mobile   string `yaml:"mobile,omitempty"`
	Github   string `yaml:"github,omitempty"`
	Linkedin string `yaml:"linkedin,omitempty"`
	Email    string `yaml:"email,omitempty"`
}

type Education struct {
	Entity     string `yaml:"entity"`
	Credential string `yaml:"credential"`
	Major      string `yaml:"major,omitempty"`
	Score      string `yaml:"score"`
	Start      string `yaml:"start,omitempty"`
	End        string `yaml:"end"`
}

type Skill struct {
	Name  string   `yaml:"name"`
	Items []string `yaml:"items"`
}

type Technology struct {
	Languages  []string `yaml:"languages,omitempty"`
	Frameworks []string `yaml:"frameworks,omitempty"`
	Concepts   []string `yaml:"concepts,omitempty"`
}

type Project struct {
	Name         string     `yaml:"name"`
	Link         string     `yaml:"link,omitempty"`
	Role         string     `yaml:"role"`
	Details      []string   `yaml:"details"`
	Technologies Technology `yaml:"technologies"`
}

type Experience struct {
	Entity       string   `yaml:"entity"`
	Start        string   `yaml:"start"`
	End          string   `yaml:"end"`
	Role         string   `yaml:"role"`
	Technologies []string `yaml:"technologies"`
	Details      []string `yaml:"details"`
}

type ResumeData struct {
	Name        string       `yaml:"name"`
	Contact     Contact      `yaml:"contact"`
	Summary     string       `yaml:"summary"`
	Education   []Education  `yaml:"education"`
	Skills      []Skill      `yaml:"skills"`
	Projects    []Project    `yaml:"projects"`
	Experiences []Experience `yaml:"experiences"`
}

var (
	resumeDataOnce sync.Once
	resumeData     *ResumeData
)

func loadResumeData() (*ResumeData, error) {
	yamlFile, err := os.ReadFile("data.yaml")
	if err != nil {
		return nil, fmt.Errorf("error reading YAML file: %v", err)
	}

	var data ResumeData
	err = yaml.Unmarshal(yamlFile, &data)
	if err != nil {
		return nil, fmt.Errorf("error un-marshaling YAML: %v", err)
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
