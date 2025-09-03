-- CREATE DATABASE pi2;
USE pi2;

-- ========================
-- Tabela: Usuarios
-- ========================
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    cep VARCHAR(20),
    cidade VARCHAR(60),
    bairro VARCHAR(60),
    rua VARCHAR(120),
    numero VARCHAR(10),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========================
-- Categorias
-- ========================
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    descricao TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========================
-- Fornecedores
-- ========================
CREATE TABLE fornecedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    contato VARCHAR(120),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========================
-- Produtos
-- ========================
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    quantidade_estoque INT NOT NULL DEFAULT 0,
    imagem_url TEXT,
    categoria_id INT NOT NULL,
    fornecedor_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE RESTRICT,
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id) ON DELETE SET NULL
);

-- ========================
-- Variações de Produto
-- ========================
CREATE TABLE variacoes_produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL,
    nome_variacao VARCHAR(60) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade_estoque INT NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
);

-- ========================
-- Endereços de Entrega
-- ========================
CREATE TABLE enderecos_entrega (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    descricao VARCHAR(60),
    endereco_completo VARCHAR(260) NOT NULL,
    cidade VARCHAR(60),
    estado VARCHAR(60),
    cep VARCHAR(20),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE
);

-- ========================
-- Pedidos
-- ========================
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    endereco_entrega_id INT,
    data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'Pendente',
    valor_total DECIMAL(10,2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE RESTRICT,
    FOREIGN KEY (endereco_entrega_id) REFERENCES enderecos_entrega(id) ON DELETE SET NULL
);

-- ========================
-- Itens do Pedido
-- ========================
CREATE TABLE itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

-- ========================
-- Pagamentos
-- ========================
CREATE TABLE pagamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    data_pagamento DATETIME DEFAULT CURRENT_TIMESTAMP,
    metodo VARCHAR(20),
    status VARCHAR(20),
    valor_pago DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE
);

-- ========================
-- Histórico de Estoque
-- ========================
CREATE TABLE estoque_historico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL,
    data_movimentacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    tipo VARCHAR(10) NOT NULL,
    quantidade INT NOT NULL,
    motivo VARCHAR(60),
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE RESTRICT
);

-- ========================
-- Carrinhos
-- ========================
CREATE TABLE carrinhos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE
);

-- ========================
-- Itens do Carrinho
-- ========================
CREATE TABLE carrinho_itens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carrinho_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    FOREIGN KEY (carrinho_id) REFERENCES carrinhos(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

-- ========================
-- Avaliações
-- ========================
CREATE TABLE avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL,
    usuario_id INT NOT NULL,
    nota INT NOT NULL CHECK (nota BETWEEN 1 AND 5),
    comentario TEXT,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE RESTRICT
);

-- ========================
-- Cupons
-- ========================
CREATE TABLE cupons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(60) UNIQUE NOT NULL,
    desconto_percentual DECIMAL(5,2),
    valor_fixo DECIMAL(10,2),
    data_validade DATE,
    uso_maximo INT,
    usado INT DEFAULT 0
);

-- ========================
-- Logs
-- ========================
CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    acao VARCHAR(60) NOT NULL,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip VARCHAR(60),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE SET NULL
);

-- ========================
-- Índices
-- ========================
CREATE INDEX idx_pedidos_status ON pedidos(status);
CREATE INDEX idx_pagamentos_data ON pagamentos(data_pagamento);
CREATE INDEX idx_cupons_codigo ON cupons(codigo);

-- ========================
-- Inserts iniciais (teste)
-- ========================
INSERT INTO Usuarios (nome, senha, email, cep, cidade, bairro, rua, numero)
VALUES
('João da Silva', '123456', 'joao@email.com', '12345-678', 'Concórdia', 'Centro', 'Rua das Flores', '101'),
('Maria Souza', 'abcdef', 'maria@email.com', '87654-321', 'Charrua', 'Bairro Novo', 'Av. Brasil', '200');