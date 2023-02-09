import {Fragment} from "react";
import fs from 'fs/promises';
import path from 'path';

const ProductDetail = (props) => {
    const {loadedProduct} = props

   return( <Fragment>
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
    </Fragment>)

}
export async function getStaticProps(context) {
    const {params} = context;
    const productID = params.pid;
    const filePath = path.join(process.cwd(), 'data', 'dummy-data.json')
    const jsondata =  await fs.readFile(filePath);
    const data = JSON.parse(jsondata);
    const product = data.products.find((product) => product.id = productID )
    if(product)
    {
        return{
            props: {
               loadedProduct: product
            }
        }
    }
}

export async function getStaticPaths() {
    return {
        paths :[
            {params: {pid : 'p1'}},
            {params: {pid : 'p2'}},
            {params: {pid : 'p3'}}
        ],
        fallback: false
    }
}
export default ProductDetail;
