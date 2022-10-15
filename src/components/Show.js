import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, doc, deleteDoc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Show = () => {
 //1- configuramos los hooks
 const [products, setProducts] = useState( [] )
 
 //2- referenciamos a las db
 const productsCollection = collection(db, "products")

 
 //3- funcion para mostrar todos los docs
 const getProducts = async () => {
    const data = await getDocs(productsCollection)
    //console.log(data.docs)
    setProducts(
        data.docs.map((doc) => ({...doc.data(), id:doc.id}))
    )
    //console.log(products)
 }
 
 //4- funcion para eliminar un Doc
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id)
    await deleteDoc(productDoc)
    getProducts()
    
 }
 //5- funcion de confirmacion para Sweet alert2
 const confirmDelete = (id) => {
    MySwal.fire({
        title: 'Eliminar este producto?',
        text: "Esto es irreversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminarlo!'
        
      }).then((result) => {
        if (result.isConfirmed) {
            //llamada a la funcion para eliminar
            deleteProduct(id)
            MySwal.fire(
            'Eliminado!',
            'El producto ha sido eliminado.',
            'success'
          )
        }
      })
   
 }
 //6- usamnos useEffect
 useEffect( () => {
    getProducts()
    //eslint-disable-next-line
 }, [] )
 //7- Devolvemos vista de nuestro componente

 return (
    <>
    <div className='container'>
      <div className='row'>
         <div className='col'>
           <div className='d-grid gap-2'>
           <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
           </div>

           <table className='table table-dark table-hover'>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Stock</th>
                    <th></th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {products.map( (product) => (
                    <tr key={product.id}>
                        <td>{product.description}</td>
                        <td>{product.stock}</td>
                        <td></td>
                        
                        <td>
                            <Link to={`/edit/${product.id}`} className='btn btn-light'><i className="fa-solid fa-pen-to-square"></i></Link>
                            <button onClick={ () => { confirmDelete(product.id) } } className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                )

                )}
               
            </tbody>

           </table>
         </div>
       </div>
     </div>
    </>
  )
}
 
export default Show