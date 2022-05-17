import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import useProductsDetails from '../hooks/useProductsDetails'
import "./Products.css"

const ProdictsDetails = () => {

    const { id } = useParams()
    const [product, setProduct] = useProductsDetails(id)

    const { name, img, Price, description, _id, quantity } = product
    // let { quantity } = product

    const handleDelivered = (id) => {
        const fieldQuantity = product.quantity
        const addQuantity = fieldQuantity - 1
        const updateQuantity = { addQuantity }
        const url = `http://localhost:5000/inventory/${id}`

        fetch(url, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updateQuantity)
        })
            .then((res) => res.json())
            .then(data => {
                const quantity = updateQuantity.addQuantity
                const newProduct = { ...product, quantity }
                setProduct(newProduct)
            })

    }


    const handleQuantitySubmit = (event) => {

        event.preventDefault()
        let fieldQuantity = parseInt(product.quantity)
        let inputQuantity = parseInt(event.target.updatequantity.value)


        console.log(fieldQuantity, inputQuantity)


        const addQuantity = parseInt(inputQuantity) + parseInt(fieldQuantity)

        const updateQuantity = { addQuantity }

        console.log(updateQuantity, "upQuantity")

        const url = `http://localhost:5000/inventory/${id}`
        fetch(url, {
            method: 'PUT',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updateQuantity)
        })

            .then((res) => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    const quantity = updateQuantity.addQuantity
                    const newProduct = { ...product, quantity }

                    console.log(newProduct, "new")
                    setProduct(newProduct)
                    event.target.reset()
                }
            })
    }


    return (
        <>
            <h2>{name}</h2>
            <Card className='mx-auto' style={{ width: '20rem' }}>
                <Card.Img variant="top" src={img} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <h4>Price: ${Price}</h4>
                    <h4>Quantity: {quantity}</h4>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <Button className='w-100' onClick={() => handleDelivered(_id)} variant="outline-secondary">Delivired Items</Button>
                </Card.Body>
            </Card>

            <div className='text-center'>
                <h3 >Update your product quantity</h3>

                <form onSubmit={handleQuantitySubmit}>
                    <div className="mb-3 form-check">
                        <input type="number" name="updatequantity" id="" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>


        </>
    )
}

export default ProdictsDetails




// const fieldQuantity = product.quantity
// const addQuantity = fieldQuantity - 1
// const updateQuantity = { addQuantity }
// const url = `http://localhost:5000/inventory/${id}`
// // console.log(url)
// fetch(url, {
//     method: "PUT",
//     headers: {
//         "content-type": "application/json",
//     },
//     body: JSON.stringify(updateQuantity)
// })
//     .then((res) => res.json())
//     .then(data => {
//         const quantity = updateQuantity.addQuantity
//         const newProduct = {...product, quantity }
//         setProduct(newProduct)

//     })
// console.log(product.quantity, "gg")