var cards = 
{
    'ariete' : {
        'id' : '001',
        'alvo' : 'inimigo',
        'alvo_qtd' : 9,
        'custo' : 'tijolos',
        'custo_qtd' : 7,
        'nome' : 'Aríete',
        'tipo' : 'ataque',
        'descricao' : 'Causa 9 de dano ao inimigo'
    },
    'babilonia' : {
        'id' : '002',
        'alvo' : 'castelo',
        'alvo_qtd' : 32,
        'custo' : 'tijolos',
        'custo_qtd' : 39,
        'nome' : 'Babilônia',
        'tipo' : 'defesa',
        'descricao' : 'Adiciona 32HP ao Castelo'
    },
    'bomba' : {
        'id' : '003',
        'alvo' : 'inimigo',
        'alvo_qtd' : 18,
        'custo' : 'armas',
        'custo_qtd' : 14,
        'nome' : 'Bomba',
        'tipo' : 'ataque',
        'descricao' : 'Causa 18 de dano ao inimigo'
    },
    'canhao' : {
        'id' : '004',
        'alvo' : 'inimigo',
        'alvo_qtd' : 20,
        'custo' : 'armas',
        'custo_qtd' : 16,
        'nome' : 'Canhão',
        'tipo' : 'ataque',
        'descricao' : 'Causa 20 de dano ao inimigo'
    },
    'carroca' : {
        'id' : '005',
        'alvo' : {
        'alvo1' : 'castelo', // Castelo Inimigo
        'alvo2' : 'castelo'
        },
        'alvo_qtd' : {
        'alvo_qtd1' : 6,
        'alvo_qtd2' : 6
        },
        'custo' : 'tijolos',
        'custo_qtd' : 10,
        'nome' : 'Carroça',
        'tipo' : 'troca_ataque',
        'descricao' : 'Rouba 6HP do Castelo inimigo'
    },
    'casa' : {
        'id' : '006',
        'alvo' : 'castelo',
        'alvo_qtd' : 5,
        'custo' : 'tijolos',
        'custo_qtd' : 5,
        'nome' : 'Casa',
        'tipo' : 'defesa',
        'descricao' : 'Adiciona 5HP ao Castelo'
    },
    'catapulta' : {
        'id' : '007',
        'alvo' : 'inimigo',
        'alvo_qtd' : 12,
        'custo' : 'armas',
        'custo_qtd' : 10,
        'nome' : 'Catapulta',
        'tipo' : 'ataque',
        'descricao' : 'Causa 12 de dano ao inimigo'
    },
    'cerca' : {
        'id' : '008',
        'alvo' : 'muro',
        'alvo_qtd' : 9,
        'custo' : 'tijolos',
        'custo_qtd' : 5,
        'nome' : 'Cerca',
        'tipo' : 'defesa',
        'descricao' : 'Adiciona 9HP ao Muro'
    },
    'conjura_armas' : {
        'id' : '009',
        'alvo' : 'armas',
        'alvo_qtd' : 8,
        'custo' : 'cristais',
        'custo_qtd' : 4,
        'nome' : 'Conjurar Armas',
        'tipo' : 'magia',
        'descricao' : 'Conjura 8 Armas'
    },
    'conjura_cristais' : {
        'id' : '010',
        'alvo' : 'cristais',
        'alvo_qtd' : 8,
        'custo' : 'cristais',
        'custo_qtd' : 4,
        'nome' : 'Conjurar Cristais',
        'tipo' : 'magia',
        'descricao' : 'Conjura 8 Cristais'
    },
    'conjura_tijolos' : {
        'id' : '011',
        'alvo' : 'tijolos',
        'alvo_qtd' : 8,
        'custo' : 'cristais',
        'custo_qtd' : 4,
        'nome' : 'Conjurar Tijolos',
        'tipo' : 'magia',
        'descricao' : 'Conjura 8 Tijolos'
    },
    'construtor' : {
        'id' : '012',
        'alvo' : 'construtores',
        'alvo_qtd' : 1,
        'custo' : 'tijolos',
        'custo_qtd' : 8,
        'nome' : 'Construtor',
        'tipo' : 'recurso',
        'descricao' : 'Adiciona 1 Construtor'
    },
    'destruir_armas' : {
        'id' : '013',
        'alvo' : 'armas',
        'alvo_qtd' : 8,
        'custo' : 'cristais',
        'custo_qtd' : 4,
        'nome' : 'Destruir Armas',
        'tipo' : 'magia_ataque',
        'descricao' : 'Destrói 8 Armas do inimigo'
    },
    'destruir_cristais' : {
        'id' : '014',
        'alvo' : 'cristais',
        'alvo_qtd' : 8,
        'custo' : 'cristais',
        'custo_qtd' : 4,
        'nome' : 'Destruir Cristais',
        'tipo' : 'magia_ataque',
        'descricao' : 'Destrói 8 Cristais do inimigo'
    },
    'destruir_tijolos' : {
        'id' : '015',
        'alvo' : 'tijolos',
        'alvo_qtd' : 8,
        'custo' : 'cristais',
        'custo_qtd' : 4,
        'nome' : 'Destruir Tijolos',
        'tipo' : 'magia_ataque',
        'descricao' : 'Destrói 8 Tijolos do inimigo'
    },
    'duendes' : {
        'id' : '016',
        'alvo' : 'castelo',
        'alvo_qtd' : 22,
        'custo' : 'cristais',
        'custo_qtd' : 18,
        'nome' : 'Duendes',
        'tipo' : 'defesa',
        'descricao' : 'Adiciona 22HP ao Castelo'
    },
    'emboscada' : {
        'id' : '017',
        'alvo' : 'castelo', // Castelo Inimigo
        'alvo_qtd' : 15,
        'custo' : 'armas',
        'custo_qtd' : 20,
        'nome' : 'Emboscada',
        'tipo' : 'ataque',
        'descricao' : 'Causa 15 de dano direto ao Castelo inimigo'
    },
    'escola' : {
        'id' : '018',
        'alvo' : {
        'alvo1' : 'soldados',
        'alvo2' : 'magos',
        'alvo3' : 'construtores'
        },
        'alvo_qtd' : 1,
        'custo' : 'tijolos',
        'custo_qtd' : 30,
        'nome' : 'Escola',
        'tipo' : 'recursos_multiplos',
        'descricao' : 'Adiciona 1 Soldado, 1 Mago e 1 Construtor'
    },
    'grande_muro' : {
        'id' : '019',
        'alvo' : 'muro',
        'alvo_qtd' : 20,
        'custo' : 'tijolos',
        'custo_qtd' : 14,
        'nome' : 'O Grande Muro',
        'tipo' : 'defesa',
        'descricao' : 'Adiciona 20HP ao Muro'
    },
    'mago' : {
        'id' : '020',
        'alvo' : 'magos',
        'alvo_qtd' : 1,
        'custo' : 'cristais',
        'custo_qtd' : 8,
        'nome' : 'Mago',
        'tipo' : 'recurso',
        'descricao' : 'Adiciona 1 Mago'
    },
    'muro' : {
        'id' : '021',
        'alvo' : 'muro',
        'alvo_qtd' : 6,
        'custo' : 'tijolos',
        'custo_qtd' : 4,
        'nome' : 'Muro',
        'tipo' : 'defesa',
        'descricao' : 'Adiciona 6HP ao Muro'
    },
    'muro_de_tijolos' : {
        'id' : '022',
        'alvo' : 'muro',
        'alvo_qtd' : 5,
        'custo' : 'tijolos',
        'custo_qtd' : 2,
        'nome' : 'Muro de Tijolos',
        'tipo' : 'defesa',
        'descricao' : 'Adiciona 5HP ao Muro'
    },
    'muro_magico' : {
        'id' : '023',
        'alvo' : 'muro',
        'alvo_qtd' : 20,
        'custo' : 'cristais',
        'custo_qtd' : 14,
        'nome' : 'Muro Mágico',
        'tipo' : 'defesa',
        'descricao' : 'Adiciona 20HP ao Muro'
    },
    'pelotao' : {
        'id' : '024',
        'alvo' : 'inimigo',
        'alvo_qtd' : 9,
        'custo' : 'armas',
        'custo_qtd' : 7,
        'nome' : 'Pelotão',
        'tipo' : 'ataque',
        'descricao' : 'Causa 9 de dano ao inimigo'
    },
    'reverter' : {
        'id' : '025',
        'alvo' : 'castelo',
        'alvo_qtd' : 5,
        'custo' : {
        'custo1' : 'tijolos',
        'custo2' : 'muro'
        },
        'custo_qtd' : {
        'custo_qtd1' : 3,
        'custo_qtd2' : 4
        },
        'nome' : 'Reverter',
        'tipo' : 'troca_defesa',
        'descricao' : 'Adiciona 5HP ao Castelo'
    },
    'soldado' : {
        'id' : '026',
        'alvo' : 'soldados',
        'alvo_qtd' : 1,
        'custo' : 'armas',
        'custo_qtd' : 8,
        'nome' : 'Soldado',
        'tipo' : 'recurso',
        'descricao' : 'Adiciona 1 Soldado'
    },
    'somente_armas' : {
        'id' : '027',
        'alvo' : 'armas',
        'alvo_qtd' : 1,
        'custo' : 'armas',
        'custo_qtd' : 1,
        'nome' : 'Somente Armas',
        'tipo' : 'magia_recurso',
        'descricao' : 'Todos os recursos produzirão Armas somente no próximo turno'
    },
    'somente_cristais' : {
        'id' : '028',
        'alvo' : 'cristais',
        'alvo_qtd' : 1,
        'custo' : 'cristais',
        'custo_qtd' : 1,
        'nome' : 'Somente Cristais',
        'tipo' : 'magia_recurso',
        'descricao' : 'Todos os recursos produzirão Cristais somente no próximo turno'
    },
    'somente_tijolos' : {
        'id' : '029',
        'alvo' : 'tijolos',
        'alvo_qtd' : 1,
        'custo' : 'tijolos',
        'custo_qtd' : 1,
        'nome' : 'Somente Tijolos',
        'tipo' : 'magia_recurso',
        'descricao' : 'Todos os recursos produzirão Tijolos somente no próximo turno'
    },
    'taverna' : {
        'id' : '030',
        'alvo' : 'castelo',
        'alvo_qtd' : 15,
        'custo' : 'tijolos',
        'custo_qtd' : 12,
        'nome' : 'Taverna',
        'tipo' : 'defesa',
        'descricao' : 'Adiciona 15HP ao Castelo'
    },
    'tempestade' : {
        'id' : '031',
        'alvo' : 'inimigo',
        'alvo_qtd' : 22,
        'custo' : 'cristais',
        'custo_qtd' : 20,
        'nome' : 'Tempestade',
        'tipo' : 'ataque',
        'descricao' : 'Causa 22 de dano ao inimigo'
    },
    'terremoto' : {
        'id' : '032',
        'alvo' : 'inimigo',
        'alvo_qtd' : 27,
        'custo' : 'cristais',
        'custo_qtd' : 24,
        'nome' : 'Terremoto',
        'tipo' : 'ataque',
        'descricao' : 'Causa 27 de dano ao inimigo'
    },
    'torre' : {
        'id' : '033',
        'alvo' : 'castelo',
        'alvo_qtd' : 10,
        'custo' : 'tijolos',
        'custo_qtd' : 10,
        'nome' : 'Torre',
        'tipo' : 'defesa',
        'descricao' : 'Adiciona 10HP ao Castelo'
    }
}
module.exports.cards = cards;