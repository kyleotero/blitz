package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type Response struct {
	Candidates []Candidate `json:"candidates"`
	Status     string      `json:"status"`
}

type Candidate struct {
	PlaceID string `json:"place_id"`
}

func main() {
	resp, err := http.Get("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=walmart&inputtype=textquery&key=AIzaSyDV7Tqo-WBrAuFoMD79oYeV3IwPatt9FQM")

	if err != nil {
		fmt.Println(err)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
	}

	// fmt.Println(string(body))

	var data Response
	err = json.Unmarshal(body, &data)
	if err != nil {
		fmt.Println(err)
	}

	var id = data.Candidates[0].PlaceID
	// url := "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + id + "&key=AIzaSyDV7Tqo-WBrAuFoMD79oYeV3IwPatt9FQM"

	resp1, err := http.Get("https://maps.googleapis.com/maps/api/place/details/json?fields=name,type&place_id=" + id + "&key=AIzaSyDV7Tqo-WBrAuFoMD79oYeV3IwPatt9FQM")

	body1, err := io.ReadAll(resp1.Body)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(string(body1))
}
