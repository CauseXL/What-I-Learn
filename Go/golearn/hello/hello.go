package main

import (
	"fmt"
	"log"
	"example.com/greetings"
	"runtime"
	"time"
	"math"
)

func main() {

	// * ---------------- 

	log.SetPrefix("greetings: ")
	log.SetFlags(0)

	names := []string{"Gladys", "Samantha", "Darrin"}

	messages, err := greetings.Hellos(names)
	if err != nil {
		log.Fatal(err)
	}
  fmt.Println(messages)

	// * ---------------- 

	switch os := runtime.GOOS; os {
		case "darwin":
			fmt.Println("OS X.")
		case "linux":
			fmt.Println("Linux")
		default:
			fmt.Println("%s.\n", os)
	}

	// case 可是不是常量
	t := time.Now()
	switch {
		case t.Hour() < 12:
			fmt.Println("Good morning!")
		case t.Hour() < 17:
			fmt.Println("Good afternoon.")
		default:
			fmt.Println("Good evening.")
	}

	// * ---------------- 

	v := Vertex{3, 4}
	/** 以指针为接收者的方法被调用时，接收者既能为值又能为指针 */
	v.Scale(2)
	ScaleFunc(&v, 10)

	p := &Vertex{4, 3}
	/** 以指针为接收者的方法被调用时，接收者既能为值又能为指针 */
	p.Scale(3)
	ScaleFunc(p, 8)

	fmt.Println(v, p)

	// * ---------------- 

	v1 := Vertex{3, 4}
	/** 以值为接收者的方法被调用时，接收者既能为值又能为指针 */
	fmt.Println(v1.Abs())
	fmt.Println(AbsFunc(v1))

	p1 := &Vertex{4, 3}
	/** 
	 *	以值为接收者的方法被调用时，接收者既能为值又能为指针
	 *	方法调用 p.Abs() 会被解释为 (*p).Abs()
	 */
	fmt.Println(p1.Abs())
	fmt.Println(AbsFunc(*p1))
}

type Vertex struct {
	X, Y float64
}

func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

/** 带指针参数的函数必须接受一个指针 */
func ScaleFunc(v *Vertex, f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

/** 接受一个值作为参数的函数必须接受一个指定类型的值 */
func AbsFunc(v Vertex) float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y) 
}
