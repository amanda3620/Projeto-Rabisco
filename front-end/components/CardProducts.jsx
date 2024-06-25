// export default function CardProducts(props) {
//     return (
//         <div classname="card">
//             <div className="card-header">
//             <p classname="card-title">{props.nome}</p>
//             </div>
//             <div className="card-body">
//             <img src="card/imagem.jpg" classname="card-img-top" alt="..." />
//                 <p classname="card-text">{props.descricao}</p>
//                 <p classname="card-text">{props.quantidade}</p>
//                 <a href="#" classname="btn btn-primary">Go somewhere</a>
//             </div>
//             <div ClassName="card-footer">
//             <p classname="card-text">{props.valor.toFixed(2)}</p>
//             </div>
//         </div>
//     )
// }

export default function CardProdutos(props) {
    return (
        <div className="card">
            <div className="card-header">
             <h3 classname="card-title">{props.nome}</h3>
             </div>
            <img src={`card/${props.nome}.png`} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <p className="card-text">{props.descricao}</p>
                    <a href="#" className="btn btn-success">R$ {Number(props.preco).toFixed(2)}</a>
                </div>
                <div className="card-footer">
                    <h5 className="card-text text-success text-center">
                        {props.quantidade} unidade (s) em estoque
                    </h5>
                </div>
        </div>
    )
}


CardProdutos.defaultProps = {
    nome:'Produto',
    descricao:'Descrição do produto',
    preco: 0.00,
    quantidade: 0
}