import { useEffect, useState } from 'react'


function App() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([])

  useEffect(() => {

    if (search === '') return;
    async function productsData() {

      try {
        const response = await fetch(`http://localhost:3333/products?search=${search}`)
        const data = await response.json();


        setProducts(data);


      } catch (error) {

        console.error('Errore durante la chiamata:', error);
      }

    }
    productsData();
  }, [search]);




  return (
    <>
      <h1>ESERCITAZIONE</h1>
      <input
        type="text"
        placeholder='Cerca un prodotto..'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {products.map(product => {
          return <li key={product.id}>{product.name}</li>
        })}

      </ul>
    </>
  )
}

export default App
