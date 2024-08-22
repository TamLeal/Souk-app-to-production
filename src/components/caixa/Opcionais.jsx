import React from 'react';

const Opcionais = ({
  produtoSelecionado,
  opcionais,
  adicionarAoCarrinho,
  fecharModal,
}) => {
  const [opcionaisSelecionados, setOpcionaisSelecionados] = React.useState([]);

  const handleToggleOpcional = (opcional) => {
    setOpcionaisSelecionados((prev) =>
      prev.includes(opcional)
        ? prev.filter((item) => item !== opcional)
        : [...prev, opcional]
    );
  };

  const handleConfirmar = () => {
    adicionarAoCarrinho(produtoSelecionado, opcionaisSelecionados);
    fecharModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">
          Opcionais para {produtoSelecionado.nome}
        </h2>
        {opcionais.map((opcional) => (
          <div key={opcional.id} className="mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={opcionaisSelecionados.includes(opcional.nome)}
                onChange={() => handleToggleOpcional(opcional.nome)}
                className="mr-2"
              />
              {opcional.nome}
            </label>
          </div>
        ))}
        <div className="mt-4 flex justify-end">
          <button
            onClick={fecharModal}
            className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmar}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Opcionais;
