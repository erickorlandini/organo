import React, { forwardRef, useState } from "react";
import "./CampoAnexo.css";

interface CampoAnexoProps {
    aoImagemSelecionada: (imagem: File | null) => void;
}

const CampoImagem = forwardRef<HTMLInputElement, CampoAnexoProps>(({ aoImagemSelecionada }, ref) => {
    const aoSelecionarImagem = (evento: React.ChangeEvent<HTMLInputElement>) => {
      if (evento.target.files && evento.target.files.length > 0) {
        aoImagemSelecionada(evento.target.files[0]);
      } else {
        aoImagemSelecionada(null);
      }
    };
  
    return (
      <div className="campo-imagem">
        <label htmlFor="upload-imagem">Imagem</label>
        <input 
          ref={ref} // Passando o ref para o input
          type="file" 
          accept="image/*" 
          id="upload-imagem"
          onChange={aoSelecionarImagem}
        />
      </div>
    );
});

export default CampoImagem;