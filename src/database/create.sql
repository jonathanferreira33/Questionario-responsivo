create schema questionario;

create table questionarios (
    id_questionario serial primary key,
    titulo VARCHAR(50) NOT NULL,
    usuario VARCHAR(30) NOT NULL,
    date timestamp default now()
);

create table questoes (
    id_questao serial primary key,
	id_questionario int REFERENCES questionarios(id_questionario),
    pergunta text
);

create table respostas (
	id_resposta serial primary key,
	resposta TEXT null,
	id_questao int REFERENCES questoes(id_questao),
	latitude int NOT NULL,
	longitude int NOT NULL,
	date timestamp default now()
);


