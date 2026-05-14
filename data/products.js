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

  "id": "medidor-pressao-digital-bahrein",

  "name": "Aparelho Medidor de Pressão Arterial Digital Automático de Braço Bahrein",

  "shortDescription": "Medidor digital automático de pressão arterial com visor LCD, braçadeira ajustável e medição de batimentos cardíacos.",

  "description": "Aparelho digital automático para medição de pressão arterial e frequência cardíaca, ideal para uso doméstico. Possui visor LCD de fácil leitura, operação simples com um botão e braçadeira ajustável para diferentes tamanhos de braço. O modelo conta com memória de medições e desligamento automático para economia de bateria.\n\nIndicado para monitoramento diário da pressão arterial em adultos, oferecendo praticidade e rapidez na medição. Compacto e leve, pode ser utilizado em casa ou transportado facilmente.",

  "price": 39.90,

  "originalPrice": 79.90,

  "discount": 50,

  "pixPrice": null,

  "category": "tecnologia",

  "type": "medidor-pressao",

  "store": "mercadolivre",

  "affiliateLink": "https://www.mercadolivre.com.br/aparelho-medidor-de-presso-arterial-digital-pulso-branco-domestico-uso-residencial-presso-arterial-braco-bracadeira-manguito-ajustavel-medir-pressao-aferidor-p-adultos-ou-criancas-marca-bahrein/p/MLB64846055",

  "brand": "Bahrein",

  "rating": 4.7,

  "reviews": 1000,

  "images": {

    "main": "https://http2.mlstatic.com/D_NQ_NP_2X_846552-MLU72580576928_112023-F.webp",

    "gallery": [

      "https://http2.mlstatic.com/D_NQ_NP_2X_846552-MLU72580576928_112023-F.webp",

      "https://http2.mlstatic.com/D_NQ_NP_2X_951516-MLU72580576930_112023-F.webp",

      "https://http2.mlstatic.com/D_NQ_NP_2X_858236-MLU72580576932_112023-F.webp"

    ]

  },

  "specs": {

    "Tipo": "Digital automático",

    "Medição": "Pressão arterial e batimentos cardíacos",

    "Visor": "LCD",

    "Braçadeira": "Ajustável",

    "Uso": "Doméstico",

    "Alimentação": "Pilhas",

    "Cor": "Branco"

  },

  "tags": ["pressao", "medidor", "pressao arterial", "digital", "saude", "bahrein", "automatico", "lcd", "braçadeira", "batimentos"],

  "inStock": true,

  "featured": false

}
  ]
};
