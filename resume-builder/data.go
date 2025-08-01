package main

type Contact struct {
	Type  string
	Value string
}

type Education struct {
	Entity     string
	Credential string
	Major      string
	Score      string
	Start      string
	End        string
}

type Skill struct {
	Name  string
	Items []string
}

type Technology struct {
	Languages  []string
	Frameworks []string
	Concepts   []string
}

type Project struct {
	Name         string
	Link         string
	Role         string
	Details      []string
	Technologies []Technology
}

type Experience struct {
	Entity       string
	Start        string
	End          string
	Role         string
	Technologies []string
	Details      []string
}

type ResumeData struct {
	Name        string
	Contacts    []Contact
	Summary     string
	Educations  []Education
	Skills      []Skill
	Projects    []Project
	Experiences []Experience
}
