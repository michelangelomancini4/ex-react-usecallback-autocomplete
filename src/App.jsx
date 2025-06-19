import { useEffect, useState, useCallback } from 'react';

//  Funzione debounce 
function debounce(callback, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

function App() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);

  //  Funzione asincrona per ottenere i prodotti
  const fetchProducts = async (query) => {
    try {
      const response = await fetch(`http://localhost:3333/products?search=${query}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Errore durante la chiamata API:', error);
    }
  };

  //  Funzione con debounce 
  const debouncedSearch = useCallback(
    debounce((query) => {
      fetchProducts(query);
    }, 300),
    []
  );

  //  useEffect reattivo alla digitazione
  useEffect(() => {
    if (search === '') {
      setProducts([]);
      return;
    }

    debouncedSearch(search);
  }, [search, debouncedSearch]);

  return (
    <>
      <h1>ESERCITAZIONE</h1>
      <input
        type="text"
        placeholder="Cerca un prodotto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {products.length > 0 && (
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
