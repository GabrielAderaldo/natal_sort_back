// Package jsonconverter fornece funcionalidades para converter structs genéricas em JSON.
// Package jsonconverter provides functionality to convert generic structs into JSON.
package jsonconverter

import (
	"encoding/json"
	"errors"
	"reflect"
)

// Response representa uma resposta padrão contendo um código de status, mensagem e valor JSON.
// Response represents a standard response containing a status code, message, and JSON value.
//
// Campos (Fields):
//   - Status: Código de status da operação (ex.: 200 para sucesso, 400 ou 500 para erro).
//     Status: The operation's status code (e.g., 200 for success, 400 or 500 for errors).
//   - Message: Mensagem descritiva sobre o resultado da operação.
//     Message: Descriptive message about the operation result.
//   - Value: Dados JSON retornados no sucesso ou nil no caso de erro.
//     Value: JSON data returned on success or nil in case of an error.
type Response struct {
	Status  int             `json:"status"`  // Código de status HTTP. (HTTP status code)
	Message string          `json:"message"` // Mensagem detalhada. (Detailed message)
	Value   json.RawMessage `json:"value"`   // Dados JSON retornados. (Returned JSON data)
}

// ConvertStructToJson converte uma struct genérica em um JSON encapsulado em uma Response.
// ConvertStructToJson converts a generic struct into JSON encapsulated within a Response.
//
// Essa função verifica se o parâmetro fornecido é uma struct válida, serializa para JSON e retorna uma Response contendo os dados.
// This function checks if the provided parameter is a valid struct, serializes it to JSON, and returns a Response containing the data.
//
// No caso de falha (tipo inválido ou erro de serialização), retorna uma Response com informações detalhadas do erro.
// In case of failure (invalid type or serialization error), it returns a Response with detailed error information.
//
// Parâmetros (Parameters):
//   - s: Struct genérica a ser convertida para JSON.
//     s: A generic struct to be converted into JSON.
//
// Retorna (Returns):
//   - Response: Um objeto Response contendo os dados JSON gerados ou uma mensagem de erro no caso de falha.
//     Response: A Response object containing the generated JSON data or an error message in case of failure.
//   - error: Um erro detalhado no caso de falha. Nil no sucesso.
//     error: A detailed error in case of failure. Nil on success.
//
// Exemplo de uso (Usage example):
//
//	type ExampleStruct struct {
//	    Name string `json:"name"`
//	    Age  int    `json:"age"`
//	}
//
//	example := ExampleStruct{Name: "Gabriel", Age: 30}
//	response, err := ConvertStructToJson(example)
//	if err != nil {
//	    fmt.Println("Erro:", err)
//	    fmt.Println("Error:", err)
//	} else {
//	    fmt.Printf("Resposta: %+v\n", response)
//	    fmt.Printf("Response: %+v\n", response)
//	}
func ConvertStructToJson[T any](s T) (Response, error) {
	// Verifica se o tipo do parâmetro é uma struct.
	// Checks if the parameter type is a struct.
	if reflect.TypeOf(s).Kind() != reflect.Struct {
		return Response{
			Status:  400,
			Message: "This type of parameter is not supported",
			Value:   nil,
		}, errors.New("this type of parameter is not supported")
	}

	// Serializa a struct para JSON.
	// Serializes the struct into JSON.
	jsonData, err := json.Marshal(s)
	if err != nil {
		stringErrorBody := "Fail to convert struct to JSON because: "
		stringErrorValue := err.Error()
		errorMessage := stringErrorBody + stringErrorValue

		return Response{
			Status:  500,
			Message: errorMessage,
			Value:   nil,
		}, nil
	}

	// Retorna o sucesso.
	// Returns success.
	return Response{
		Status:  200,
		Message: "JSON is converted successfully",
		Value:   json.RawMessage(jsonData),
	}, nil
}
