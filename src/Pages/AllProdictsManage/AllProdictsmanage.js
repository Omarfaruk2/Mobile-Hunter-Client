import React from 'react'
import { Spinner } from 'react-bootstrap'
import useInventory from '../hooks/useInventory'
import ManageAllProducts from '../ManageAllProducts/ManageAllProducts'

const AllProdictsmanage = () => {
    const [products, error] = useInventory()

    if (products.length === 0 || error) {
        return (
            <div className='loginSpiner g-3'>
                <Spinner className='mx-2' animation="grow" variant="primary" />
                <Spinner className='mx-2' animation="grow" variant="info" />
                <Spinner className='mx-2' animation="grow" variant="success" />
                <Spinner className='mx-2' animation="grow" variant="warning" />
            </div>
        )
    }
    return (
        <div className='mt-4'>
            <div data-aos="fade-up"
                data-aos-duration="3000" className='row m-0 p-0'>
                {
                    products.map(product => <ManageAllProducts
                        product={product}
                        key={product?._id}
                    ></ManageAllProducts>)
                }

            </div>
        </div>
    )
}

export default AllProdictsmanage