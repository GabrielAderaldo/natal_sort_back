package jsonconverter

import (
	"encoding/json"
	"errors"
	"reflect"
)

type Response struct {
	Status  int             `json:"status"`
	Message string          `json:"message"`
	Value   json.RawMessage `json:"value"`
}

func ConvertStructToJson[T any](s T) (Response, error) {
	if reflect.TypeOf(s).Kind() != reflect.Struct {

		return Response{
			Status:  400,
			Message: "This type of parameter is not the type suported",
			Value:   nil,
		}, errors.New("this type of parameter is not the type suported")
	}

	jsonData, err := json.Marshal(s)

	if err != nil {
		stringErrorBody := "Fail to convert string because: "
		stringErrorValue := err.Error()
		errorMenssage := stringErrorBody + stringErrorValue

		return Response{
			Status:  500,
			Message: errorMenssage,
			Value:   nil,
		}, nil
	}

	return Response{
		Status:  200,
		Message: "Json is converted with success",
		Value:   json.RawMessage(jsonData),
	}, nil
}
