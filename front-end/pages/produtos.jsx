import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Titulo from '../components/titulo';
import HeaderB from '../components/header_b';
import { useRouter } from 'next/router';

function Produto() {
    const [produto, setProduto] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query; // Obtém o id do produto da URL

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/produto/${id}`);
                setProduto(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao carregar produto:', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchProduto();
        }
    }, [id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!produto) {
        return <div>Produto não encontrado.</div>;
    }

    return (
        <div>
            <HeaderB />
            <Titulo texto={produto.nome} />
            <div className="container my-4">
                <div className="row text-center my-2">
                    <div className="col-sm-12 col-lg-4">
                        <img src={`/produtos/${produto.nome}.png`} className="img-fluid" alt="Imagem do Produto" />
                    </div>
                    <div className="col-sm-12 col-lg-6 d-flex flex-column align-items-center">
                        <p className="card-text">{produto.descricao}</p>
                        
                        {/* Utiliza o componente Link do Next.js para direcionar para a página de detalhes do produto */}
                        <Link href={`/produtos/${id}`}>
                            <a className="btn btn-primary">R$ {Number(produto.preco).toFixed(2)}</a>
                        </Link>
                        
                        <h5 className="card-text text-success text-center">
                            {produto.quantidade} unidade(s) em estoque
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Produto;
