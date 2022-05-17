import React, { useEffect, useState } from 'react'
// import useEmailInventory from '../hooks/useEmailInventory'
import "./Myitems.css"
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'
// import Myitem from '../Myitem/Myitem'
import { Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const MyItems = () => {
    const navigate = useNavigate()
    const [user] = useAuthState(auth)
    const [items, setItems] = useState([])

    useEffect(() => {
        const url = `http://localhost:5000/myitems?email=${user?.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setItems(data))
    }, [user?.email])

    const handleDeleteditems = (id) => {

        const proceed = window.confirm("Are you sure for delete")
        if (proceed) {
            const url = `http://localhost:5000/inventory/${id}`
            fetch(url, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    const remaining = items.filter(product => product._id !== id)
                    console.log(remaining)
                    setItems(remaining)

                })
        }

    }
    const handleDetailsitem = (id) => {
        navigate(`/inventory/${id}`)

    }

    return (
        <div>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Supplier</th>
                        <th>Updata</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map(item =>
                            <tr>
                                <td>{item?.name}</td>
                                <td>{item?.Price}</td>
                                <td>{item?.quantity}</td>
                                <td>{item?.supliarName}</td>
                                <td><button onClick={() => handleDetailsitem(item?._id)}>Update</button></td>
                                <td><button onClick={() => handleDeleteditems(item?._id)}>Delete</button></td>

                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default MyItems