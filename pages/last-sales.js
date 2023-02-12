import {useEffect, useState} from "react";
import useSWR from 'swr';
const LastSalesPage = (props) => {
    const [sales, setSales] = useState(props.sales);
    const{data, error, isLoading} =useSWR('https://nextjs-course-15f9b-default-rtdb.firebaseio.com/sales.json', (url) => fetch(url).then(res => res.json()));
    useEffect(()=> {
        console.log(data)
        if(data)
        {
            const transformedSales = []
                        for (const key in data){
                            transformedSales.push({id: key, userName: data[key].username, volume: data[key].volume})
                        }
            setSales(transformedSales);
        }
    }, [data])

        if (error)
        {
            return  <p>Failed to load</p>
        }
    if(!data || !sales)
    {
        return <p>Loading</p>
    }


        return <ul>
            {sales.map((sale) => {
                return <li key={sale.id}>
                    {sale.userName} - ${sale.volume}
                </li>
            })}
        </ul>

}

export async function getStaticProps(){
    const resp = await fetch('https://nextjs-course-15f9b-default-rtdb.firebaseio.com/sales.json')
    const data = resp.json()

            const transformedSales = []
            for (const key in data){
                transformedSales.push({id: key, userName: data[key].username, volume: data[key].volume})
            }
            return{
                props: {
            sales: transformedSales
                }
            }

}
export default LastSalesPage;