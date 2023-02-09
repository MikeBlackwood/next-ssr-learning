import fs from 'fs/promises';
import path from 'path';
import Link from "next/link";
function HomePage(props) {
    const {products} = props
  return (
    <ul>
        {products.map((product) => {
          return(  <li key={product.id}><Link href={`/${product.id}`}>{product.title}</Link></li>)
        })}
    </ul>
  );
}
export async function getStaticProps()
{
    const filePath = path.join(process.cwd(), 'data', 'dummy-data.json')
    const jsondata =  await fs.readFile(filePath);
    const data = JSON.parse(jsondata);
    return {
        props: {
            products: data.products
        },
        revalidate: 10
    };
}

export default HomePage;
