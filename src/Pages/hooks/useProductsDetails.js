import { useEffect, useState } from 'react'


const useProductsDetails = (id) => {
    const [product, setProduct] = useState({})

    useEffect(() => {
        const url = `https://enigmatic-forest-42494.herokuapp.com/inventory/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id])

    return [product, setProduct]
}

export default useProductsDetails