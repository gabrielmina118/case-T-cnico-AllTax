import React, { useState } from "react";
import Header from "./component/header";
import produtos from "../src/data/produtos.json";
import { Filtro } from "./styled";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function App() {
  const [valorDropDownCategoria, setValorDropDownCategoria] =
    useState("comida");
  const [dados, setDados] = useState([]);

  const procuraProdutosCategoria = produtos.categorias.filter((categoria) => {
    return categoria.nome === valorDropDownCategoria;
  });

  function handleValorDropDownCategoria(event) {
    setValorDropDownCategoria(event.target.value);
    if (procuraProdutosCategoria) {
        console.log("TEEEEEM PRODUTO",procuraProdutosCategoria)
        procuraProdutosCategoria.map((categoria)=>{
            setDados(categoria.produtos);
        })
    
    }
  }

  const categorias = produtos.categorias.map((categoria) => {
    return <option value={categoria.nome}>{categoria.nome}</option>;
  });

  const produtosCategoria =
    procuraProdutosCategoria.length > 0 &&
    procuraProdutosCategoria[0].produtos.map((produto) => {
      return <option value={produto.nomeProduto}>{produto.nomeProduto}</option>;
    });

  const produtosMarca =
    procuraProdutosCategoria.length > 0 &&
    procuraProdutosCategoria[0].marca.map((marca) => {
      return <option value={marca.nomeMarca}>{marca.nomeMarca}</option>;
    });

  const data = dados.length > 0 ? dados : [];

  return (
    <div>
      <Header />
      <Filtro>
        <div>
          <label>Categorias: </label>
          <select
            value={valorDropDownCategoria}
            onChange={handleValorDropDownCategoria}
          >
            <option value="" selected>
              Nenhum
            </option>
            ;{categorias}
          </select>
        </div>
        <div>
          <label>Produtos: </label>
          <select>{produtosCategoria}</select>
        </div>
        <div>
          <label>Marca :</label>
          <select>{produtosMarca}</select>
        </div>
      </Filtro>
      <div>
        <LineChart
          width={900}
          height={400}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <YAxis />
          <XAxis dataKey="mes" />
        </LineChart>
      </div>
    </div>
  );
}

export default App;
