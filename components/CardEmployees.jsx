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

export default function CardEmployees(props) {
    return (
        <div className="card">
            <img src={props.avatar} className="card-img-top" alt={`${props.first_name} ${props.last_name}`}/>
                <div className="card-body">
                    <h5 className="card-title">{props.first_name} {props.last_name}</h5>
                </div>
                <div className="card-footer">
                <a href={`mailto:${props.email}`} className="card-text text-success text-center">
                    {props.email}
                </a>
                </div>
        </div>
    )
}


CardEmployees.defaultProps = {
    first_name:'Name',
    last_name:'Last Name',
    email:'email@email.com'
}