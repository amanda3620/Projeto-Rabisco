import CardEmployees from "./CardEmployees"

export default function CardListContato(props) {
    const { contatos } = props
    return (
        <div className="container my-3">
            <div className="row g-5">
                {/* Estrutura de repetição map */}
                {Array.isArray(contatos) && contatos.length > 0 ? (
                    contatos.map(function (contato) {
                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={contato.id}>
                                <CardEmployees
                                    email={contato.email}
                                    first_name={contato.first_name}
                                    last_name={contato.last_name}
                                    avatar={contato.avatar}
                                />
                            </div>
                        );
                    })
                ) : (
                    <p>Nenhum contato encontrado.</p>
                )}
            </div>
        </div>
    );
}

