package gramma

import (
	"errors"
	"fmt"
	"math/rand"
	"time"
)

func Hello() (string, error) {
	if name == "" {
		return "", errors.New("empty name")
	}
	message := fmt.Sprintf(name)
	// message := fmt.Sprintf(randomFormat())
	return message, nil
}

Hello()
