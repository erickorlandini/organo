import { useRef, useState } from 'react'
import CampoTexto from '../CampoTexto'
import './Formulario.css'
import React from 'react'
import ListaSuspensa from '../ListaSuspensa'
import Botao from '../Botao'
import { IColaborador } from '../../compartilhado/interfaces/IColaborador'
import CampoAnexo from '../CampoAnexo'

interface FormularioProps {
    aoColaboradorCadastrado: (colaborador: IColaborador) => void
    times: string[];
}

const Formulario = (props: FormularioProps) => {
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [imagem, setImagem] = useState<File | null>(null);
    const [time, setTime] = useState('');

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const aoSalvar = (evento: React.FormEvent<HTMLFormElement> ) => {
        evento.preventDefault()

        const imagemURL = imagem ? URL.createObjectURL(imagem) : ''

        props.aoColaboradorCadastrado({
            nome,
            cargo,
            imagem: imagemURL,
            time
        })
        setNome('')
        setCargo('')
        setImagem(null)
        setTime('')

        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    return (
        <section className="formulario">
            <form onSubmit={evento => aoSalvar(evento)}>
                <h2>Preencha os dados para criar o card do colaborador</h2>
                <CampoTexto 
                    obrigatorio={true}
                    label="Nome"
                    placeholder="Digite seu nome" 
                    valor={nome}
                    aoAlterado={valor => setNome(valor)}
                />
                <CampoTexto
                    obrigatorio={true}
                    label="Cargo"
                    placeholder="Digite seu cargo" 
                    valor={cargo}
                    aoAlterado={valor => setCargo(valor)}
                />

                <CampoAnexo aoImagemSelecionada={setImagem} ref={fileInputRef}/>
                
                <ListaSuspensa
                    obrigatorio={true}
                    label="Time" 
                    itens={props.times}
                    valor={time}
                    aoAlterado={valor => setTime(valor)}
                />
                <Botao>
                    Criar Card
                </Botao>
            </form>
        </section>
    )
}

export default Formulario