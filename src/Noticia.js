import React, { useEffect, useState } from "react";
import "./Noticia.css"; // Coloque os estilos em um CSS separado
import logo from "./logo.png"; // ajuste o caminho conforme a localização da imagem

const Noticia = () => {
    const [noticia, setNoticia] = useState(null);

    useEffect(() => {
        console.log("🔄 Iniciando o fetch...");

        fetch("tecmundo.json")
            .then(res => {
                console.log("📥 Resposta recebida:", res);
                if (!res.ok) {
                    throw new Error("Erro na resposta: " + res.status);
                }
                return res.json();
            })
            .then(data => {
                console.log("📦 Dados recebidos:", data);

                let lastIndex = parseInt(localStorage.getItem("noticiaIndex")) || 0;
                const nextIndex = (lastIndex + 1) % data.length;
                localStorage.setItem("noticiaIndex", nextIndex);
                
                setNoticia(data[nextIndex]);
            })
            .catch(err => {
                console.error("❌ Erro ao carregar JSON:", err);
                setNoticia({
                    titulo: "Erro ao carregar notícia.",
                    descricao: "",
                    imagem: ""
                });
            });
    }, []);

    return (
        <div className="container">
            <img className="imagem" src={noticia?.image} alt="Imagem da notícia" />
            {/* <div className="aderecos-container">
                <div className="adereco-lateral-1"></div>
                <div className="adereco-lateral-2"></div>
            </div> */}
            <img className="logo" src={logo} alt="Logo" />
            <div className="texto-container">
                <div className="titulo">{noticia?.title}</div>
                <div className="descricao">{noticia?.description}</div>
            </div>
        </div>
    );
};

export default Noticia;
