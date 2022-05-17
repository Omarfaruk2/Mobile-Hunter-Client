
import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
// import { useInventory } from '../hooks/useInventory'
import useInventory from '../hooks/useInventory'

const ManageAllProducts = ({ product }) => {

    const navigate = useNavigate()

    const [products, setProducs] = useInventory()
    const { Price, description, quantity, supliarName, name, img, _id } = product || {}

    const handleDeleted = (id) => {

        const proceed = window.confirm("Are you sure for delete")
        if (proceed) {
            const url = `http://localhost:5000/inventory/${id}`
            fetch(url, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    const remaining = products.filter(product => product._id !== id)
                    console.log(remaining)
                    setProducs(remaining)

                })
        }

    }

    const handleUpdateItem = (id) => {
        navigate(`/inventory/${id}`)

    }

    return (
        <div className='col-lg-4'>
            <Card className='mx-auto' style={{ width: '18rem' }}>
                <Card.Img variant="top" src={img} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <h4>Price: ${Price}</h4>
                    <h5>Quantity :{quantity}</h5>
                    <h5>SupliarName:{supliarName}</h5>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <Button onClick={() => handleUpdateItem(_id)} variant="outline-warning">Add Quantity</Button>
                    <Button onClick={() => handleDeleted(_id)} variant="outline-danger">Delete  Items</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ManageAllProducts