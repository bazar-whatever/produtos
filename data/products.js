window.CATALOG = {
  "categories": [
    { "id": "todos",       "label": "Todos" },
    { "id": "tecnologia",  "label": "Tecnologia" }
    // Adicione mais categorias conforme necessário:
    // { "id": "suplementos",      "label": "Suplementos" },
    // { "id": "eletrodomesticos", "label": "Eletrodomésticos" },
    // { "id": "moveis",           "label": "Móveis" },
    // { "id": "colecionaveis",    "label": "Colecionáveis" },
  ],
  "stores": [
    { "id": "mercadolivre", "label": "Mercado Livre", "color": "#FFE600", "bg": "#2D3277", "logo": "ML" },
    { "id": "amazon",       "label": "Amazon",        "color": "#FF9900", "bg": "#131921", "logo": "A"  },
    { "id": "aliexpress",   "label": "AliExpress",    "color": "#FF4747", "bg": "#1A0A0A", "logo": "AE" },
    { "id": "shopee",       "label": "Shopee",        "color": "#EE4D2D", "bg": "#1A0E0B", "logo": "S"  }
  ],
  "products": [
    /* ══════════════════════════════════════════════════════════════════
       TEMPLATE DE PRODUTO — Copie o bloco abaixo, descomente e preencha
       ══════════════════════════════════════════════════════════════════
    {
      "id": "identificador-unico",            // kebab-case, único por produto
      "name": "Nome completo do produto",     // nome como aparece na loja
      "shortDescription": "Resumo em 1-2 linhas para exibir no card da listagem.",
      "description": "Descrição detalhada para a página do produto. Pode ter vários parágrafos.",

      "price": 99.90,                         // preço atual (number). null se não disponível
      "originalPrice": 149.90,               // preço original riscado. null se sem desconto
      "discount": 33,                         // % de desconto (inteiro, ex: 33 = 33%). null se sem desconto
      "pixPrice": 96.90,                      // preço no PIX. null se não houver

      "category": "suplementos",              // ID da categoria (ver lista acima)
      "type": "creatina",                     // subtipo livre (usado para filtros futuros)
      "store": "mercadolivre",                // ID da loja (ver lista acima)
      "affiliateLink": "https://...",         // link de afiliado para a loja

      "brand": "Nome da Marca",
      "rating": 4.8,                          // nota de 0 a 5. null se não houver
      "reviews": 1234,                        // número de avaliações. null se não houver

      "images": {
        "main": "https://url-da-imagem-principal.jpg",
        "gallery": [
          "https://url-imagem-1.jpg",
          "https://url-imagem-2.jpg",
          "https://url-imagem-3.jpg"
        ]
      },

      "specs": {
        "Chave 1": "Valor 1",
        "Chave 2": "Valor 2"
      },

      "tags": ["tag1", "tag2", "marca"],      // palavras-chave para a busca interna
      "inStock": true,                        // true = disponível | false = esgotado
      "featured": false                       // true = exibe badge "Destaque" no card
    }
    ══════════════════════════════════════════════════════════════════ */

    {
      "id": "soprador-turbo-130000rpm",
      "name": "Mini Soprador Turbo 130.000 RPM Sem Fio Recarregável USB — 3 Velocidades",
      "shortDescription": "Jato de ar potente até 130.000 RPM. Recarregável via USB, 3 velocidades. Limpa teclado, carro, eletrônicos e acende churrasqueira.",
      "description": "Mini soprador portátil com motor de alta performance que atinge 130.000 RPM, gerando jato de ar poderoso sem ruído excessivo. Possui 3 níveis de velocidade para controle preciso da vazão — do mais suave para eletrônicos delicados ao mais potente para acender churrasqueira ou remover sujeira pesada. Totalmente sem fio: carrega via USB e dispensa tomadas durante o uso. Leve e compacto, cabe na palma da mão e na bolsa. Bivolt (127V/220V). Cor: Preto.\n\nUsos: limpeza de teclado e notebook, interior de carro, frestas de eletrodomésticos, poeira de gabinete, acender carvão e muito mais.",
      "price": 55.47,
      "originalPrice": 129.00,
      "discount": 57,
      "pixPrice": null,
      "category": "tecnologia",
      "type": "soprador-portatil",
      "store": "mercadolivre",
      "affiliateLink": "https://meli.la/2HBVfyE",
      "brand": null,
      "rating": null,
      "reviews": null,
      "images": {
        "main": "https://http2.mlstatic.com/D_NQ_NP_882388-MLA110160746883_042026-O.webp",
        "gallery": [
          "https://http2.mlstatic.com/D_NQ_NP_882388-MLA110160746883_042026-O.webp"
        ]
      },
      "specs": {
        "Velocidade máxima": "130.000 RPM",
        "Velocidades": "3 níveis",
        "Alimentação": "USB recarregável (sem fio)",
        "Voltagem": "Bivolt (127V/220V)",
        "Cor": "Preto",
        "Usos": "Teclado, carro, eletrônicos, churrasqueira"
      },
      "tags": ["soprador", "turbo", "usb", "recarregavel", "limpeza", "teclado", "carro", "churrasqueira", "portatil", "sem fio"],
      "inStock": true,
      "featured": true
    },
    {
      "id": "medidor-pressao-bahrein-digital-braco",
      "name": "Aparelho Medidor De Pressão Arterial Digital Automático De Braço Bahrein",
      "shortDescription": "Medidor digital automático de braço com visor LCD, inflagem automática, indicador de movimento e braçadeira ajustável.",
      "description": "Monitor de pressão arterial digital automático da marca Bahrein, ideal para uso doméstico e acompanhamento diário da pressão arterial. Possui medição automática no braço, visor LCD de fácil leitura e sistema de inflagem automática.\n\nO aparelho conta com indicador de erro de movimento, memória para múltiplos usuários e acompanha braçadeira ajustável e estojo para transporte. Compacto, portátil e simples de usar, é indicado para adultos e crianças.\n\nModelo bastante vendido no Mercado Livre pelo custo-benefício e praticidade para medições rápidas em casa.",
      "price": 39.90,
      "originalPrice": 84.90,
      "discount": 53,
      "pixPrice": null,
      "category": "tecnologia",
      "type": "medidor-pressao",
      "store": "mercadolivre",
      "affiliateLink": "https://meli.la/1W7Epk3",
      "brand": "Bahrein",
      "rating": 4.8,
      "reviews": 202,
     "images": {
        "main": "https://http2.mlstatic.com/D_NQ_NP_2X_964206-MLA105767687161_012026-F.webp",
        "gallery": [
          "https://http2.mlstatic.com/D_NQ_NP_2X_964206-MLA105767687161_012026-F.webp",
          "https://http2.mlstatic.com/D_NQ_NP_2X_778186-MLA105767687163_012026-F.webp",
          "https://http2.mlstatic.com/D_NQ_NP_2X_680020-MLA105767687165_012026-F.webp",
          "https://http2.mlstatic.com/D_NQ_NP_2X_901003-MLA105767687167_012026-F.webp"
        ]
      },
      "specs": {
        "Marca": "Bahrein",
        "Modelo": "BAHREIN-5488",
        "Tipo": "Digital automático de braço",
        "Medições": "Pressão sistólica",
        "Inflagem": "Automática",
        "Usuários": "2",
        "Memória": "2 medições",
        "Braçadeira": "13,6 cm até 19,5 cm",
        "Indicador de movimento": "Sim",
        "Inclui estojo": "Sim",
        "Alimentação": "Pilhas AAA",
        "Bluetooth": "Não",
        "Cor": "Branco"
      },
      "tags": [
        "pressao",
        "medidor",
        "pressao arterial",
        "digital",
        "bahrein",
        "automatico",
        "lcd",
        "saude",
        "braço",
        "tensiometro",
        "aferidor",
        "batimentos"
      ],
      "inStock": true,
      "featured": false
    }
  ]
};
