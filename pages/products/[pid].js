import {Fragment} from "react";
import fs from 'fs/promises';
import path from 'path';

const ProductDetail = (props) => {
    const {loadedProduct} = props
    if(!loadedProduct)
    {
        return ( <p>Loading ...</p>)
    }
   return( <Fragment>
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
    </Fragment>)

}
export async function getStaticProps(context) {
    const {params} = context;
    const productID = params.pid;
    const data = await getData();
    const product = data.products.find((product) => product.id = productID )
    if (!product)
    {
        return  {notFound: true}
    }
    if(product)
    {
        return{
            props: {
               loadedProduct: product
            }
        }
    }
}
const getData = async () => {
    const filePath = path.join(process.cwd(), 'data', 'dummy-data.json')
    const jsondata =  await fs.readFile(filePath);
    return JSON.parse(jsondata);
}

export async function getStaticPaths() {
    const data = await getData();
    const ids = data.products.map(product => product.id);
    const params = ids.map(id => ({params: {pid: id}}))
    return {
        paths: params,
        fallback: false
    }
}
export default ProductDetail;
